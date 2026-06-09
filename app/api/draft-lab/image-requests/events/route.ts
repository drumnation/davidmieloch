import { spawn } from "node:child_process";

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  if (process.env.DRAFT_LAB_ENABLED !== "1") {
    return NextResponse.json({ ok: false, error: "disabled" }, { status: 404 });
  }

  const url = new URL(request.url);
  const slug = url.searchParams.get("slug") ?? "";
  const requestId = url.searchParams.get("requestId") ?? "";

  if (!slug || !requestId) {
    return NextResponse.json(
      { ok: false, error: "missing slug or requestId" },
      { status: 400 },
    );
  }

  const stream = new ReadableStream({
    start(controller) {
      const send = (event: string, data: Record<string, unknown>) => {
        controller.enqueue(
          new TextEncoder().encode(
            `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`,
          ),
        );
      };

      send("stage", {
        status: "queued",
        message: "Request stored. Preparing image worker.",
        requestId,
      });

      if (!process.env.MINIMAX_API_KEY) {
        send("worker-error", {
          status: "failed",
          message:
            "Server is missing MINIMAX_API_KEY. The request is queued, but cannot generate here.",
          requestId,
        });
        controller.close();
        return;
      }

      send("stage", {
        status: "processing",
        message: "Image worker claimed this request.",
        requestId,
      });

      const child = spawn(
        "pnpm",
        [
          "content:pipeline",
          "image:process-requests",
          slug,
          `--request-id=${requestId}`,
          "--provider=minimax",
          "--model=image-01",
          "--size=16:9",
          "--limit=1",
          "--spend-approved",
        ],
        {
          cwd: process.cwd(),
          env: process.env,
          stdio: ["ignore", "pipe", "pipe"],
        },
      );
      let stdout = "";
      let stderr = "";

      child.stdout.setEncoding("utf8");
      child.stderr.setEncoding("utf8");

      child.stdout.on("data", (chunk: string) => {
        stdout += chunk;
        send("stage", {
          status: "generating",
          message: "Provider is generating the image.",
          requestId,
        });
      });

      child.stderr.on("data", (chunk: string) => {
        stderr += chunk;
      });

      child.on("error", (error) => {
        send("worker-error", {
          status: "failed",
          message: error.message,
          requestId,
        });
        controller.close();
      });

      child.on("close", (code) => {
        if (code === 0) {
          send("completed", {
            status: "completed",
            message: "Image generated and linked to this slot.",
            requestId,
            result: extractWorkerSummary(stdout),
          });
        } else {
          send("worker-error", {
            status: "failed",
            message: stderr.trim() || `Image worker exited with code ${code}.`,
            requestId,
          });
        }
        controller.close();
      });

      request.signal.addEventListener("abort", () => {
        child.kill();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/event-stream",
      "X-Accel-Buffering": "no",
    },
  });
}

function extractWorkerSummary(stdout: string) {
  const jsonStart = stdout.indexOf("{");
  if (jsonStart < 0) return null;

  try {
    const payload = JSON.parse(stdout.slice(jsonStart)) as {
      generated?: number;
      failures?: number;
      results?: Array<{ publicPath?: string; id?: string }>;
    };

    return {
      generated: payload.generated ?? 0,
      failures: payload.failures ?? 0,
      assetId: payload.results?.[0]?.id ?? null,
      publicPath: payload.results?.[0]?.publicPath ?? null,
    };
  } catch {
    return null;
  }
}
