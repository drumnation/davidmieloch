"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type ImageRequest = {
  id: string;
  prompt: string;
  status: string;
  requestedAt: string;
  workerStartedAt?: string;
  processedAt?: string;
  failedAt?: string;
  error?: string;
};

type WorkerObservation = {
  status: "idle" | "needs-worker" | "processing";
  queued: number;
  processing: number;
  completed: number;
  failed: number;
  oldestQueuedAt: string | null;
  claim: string;
};

type Props = {
  slug: string;
  placementId: string;
  heading: string;
  returnTo: string;
  initialRequests: ImageRequest[];
};

export function ImageRequestForm({
  slug,
  placementId,
  heading,
  returnTo,
  initialRequests,
}: Props) {
  const [prompt, setPrompt] = useState("");
  const [requests, setRequests] = useState(initialRequests);
  const [workerObservation, setWorkerObservation] =
    useState<WorkerObservation | null>(() => observeRequests(initialRequests));
  const [message, setMessage] = useState("");
  const [workerMessages, setWorkerMessages] = useState<string[]>([]);
  const [activeRequestId, setActiveRequestId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const completedRequestIds = useRef(
    new Set(initialRequests.filter(isFinishedRequest).map((request) => request.id)),
  );
  const hasActiveRequests = requests.some((request) =>
    ["queued", "processing"].includes(request.status),
  );

  useEffect(() => {
    if (!hasActiveRequests) return undefined;

    const poll = async () => {
      try {
        const response = await fetch(
          `/api/draft-lab/image-requests?slug=${encodeURIComponent(
            slug,
          )}&placementId=${encodeURIComponent(placementId)}`,
          {
            headers: { Accept: "application/json" },
            cache: "no-store",
          },
        );
        const payload = (await response.json()) as {
          ok?: boolean;
          requests?: ImageRequest[];
          observation?: WorkerObservation;
        };
        if (!response.ok || !payload.ok || !payload.requests) return;

        setRequests(payload.requests);
        setWorkerObservation(payload.observation ?? observeRequests(payload.requests));
        const newlyFinished = payload.requests.some((request) => {
          if (!isFinishedRequest(request)) return false;
          if (completedRequestIds.current.has(request.id)) return false;
          completedRequestIds.current.add(request.id);
          return request.status === "completed";
        });

        if (newlyFinished) {
          setMessage("Image generated. Refreshing the article preview...");
          router.refresh();
        }
      } catch {
        setMessage("Could not refresh worker status yet.");
      }
    };

    void poll();
    const intervalId = window.setInterval(() => {
      void poll();
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [hasActiveRequests, placementId, router, slug]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) return;

    setIsSubmitting(true);
    setMessage("Queueing image request...");

    try {
      const formData = new FormData();
      formData.set("action", "request-image");
      formData.set("slug", slug);
      formData.set("placementId", placementId);
      formData.set("prompt", trimmedPrompt);
      formData.set("returnTo", returnTo);

      const response = await fetch("/api/draft-lab", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "x-draft-lab-client": "1",
        },
        body: formData,
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
        request?: ImageRequest;
      };

      if (!response.ok || !payload.ok || !payload.request) {
        throw new Error(payload.error || `Request failed: ${response.status}`);
      }

      setRequests((current) => [payload.request as ImageRequest, ...current]);
      setWorkerObservation(observeRequests([payload.request as ImageRequest, ...requests]));
      setPrompt("");
      setMessage("Queued. Starting image worker...");
      startWorkerStream((payload.request as ImageRequest).id);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Queue failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function startWorkerStream(requestId: string) {
    setActiveRequestId(requestId);
    setWorkerMessages(["Opening image worker stream..."]);

    const events = new EventSource(
      `/api/draft-lab/image-requests/events?slug=${encodeURIComponent(
        slug,
      )}&requestId=${encodeURIComponent(requestId)}`,
    );
    const appendMessage = (nextMessage: string) => {
      setWorkerMessages((current) => [...current.slice(-5), nextMessage]);
    };

    events.addEventListener("stage", (event) => {
      const payload = parseEventPayload(event);
      appendMessage(payload.message ?? "Worker stage updated.");
      setMessage(payload.message ?? "Worker stage updated.");
    });

    events.addEventListener("completed", (event) => {
      const payload = parseEventPayload(event);
      appendMessage(payload.message ?? "Image generated.");
      setMessage("Image generated. Refreshing the article preview...");
      setActiveRequestId(null);
      events.close();
      router.refresh();
    });

    events.addEventListener("worker-error", (event) => {
      const payload = parseEventPayload(event);
      appendMessage(payload.message ?? "Image worker failed.");
      setMessage(payload.message ?? "Image worker failed.");
      setActiveRequestId(null);
      events.close();
    });

    events.onerror = () => {
      appendMessage("Image worker stream disconnected.");
      setMessage("Image worker stream disconnected.");
      setActiveRequestId(null);
      events.close();
    };
  }

  return (
    <div style={styles.wrapper}>
      <style>
        {`
          @keyframes draft-lab-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      {requests.length > 0 ? (
        <div style={styles.requestStatusPanel} aria-live="polite">
          {workerObservation?.status === "needs-worker" ? (
            <div style={styles.workerWarning} role="status">
              <strong>No active image worker observed.</strong>
              <span>
                These requests are queued on disk, but nothing is generating right
                now. Run the image worker or add the background runner before
                expecting new images to appear.
              </span>
            </div>
          ) : null}
          {activeRequestId ? (
            <div style={styles.workerProcessing} role="status">
              <strong>Generating image variation.</strong>
              <span style={styles.spinnerRow}>
                <span style={styles.spinner} aria-hidden="true" />
                Worker request: <code>{activeRequestId}</code>
              </span>
              {workerMessages.length > 0 ? (
                <ol style={styles.workerMessageList}>
                  {workerMessages.map((workerMessage, index) => (
                    <li key={`${workerMessage}-${index}`}>{workerMessage}</li>
                  ))}
                </ol>
              ) : null}
            </div>
          ) : null}
          {workerObservation?.status === "processing" ? (
            <div style={styles.workerProcessing} role="status">
              <strong>Image worker is processing.</strong>
              <span>
                {workerObservation.processing} request
                {workerObservation.processing === 1 ? "" : "s"} currently marked
                processing.
              </span>
            </div>
          ) : null}
          <p style={styles.requestStatusTitle}>
            {requests.length} image request{requests.length === 1 ? "" : "s"}
            {hasActiveRequests ? " · watching worker status" : ""}
          </p>
          <ol style={styles.requestStatusList}>
            {requests.map((request) => (
              <li key={request.id} style={styles.requestStatusItem}>
                <span>{request.prompt}</span>
                <code
                  style={{
                    ...styles.statusChip,
                    ...statusStyle(request.status),
                  }}
                >
                  {request.status}
                </code>
                <time dateTime={request.requestedAt}>
                  {formatRequestDate(request.requestedAt)}
                </time>
                {request.status === "queued" ? (
                  <small style={styles.warningDetail}>
                    Stored only. This will not generate until the worker runs.
                  </small>
                ) : null}
                {request.status === "processing" && request.workerStartedAt ? (
                  <small style={styles.processingDetail}>
                    Worker started {formatRequestDate(request.workerStartedAt)}.
                  </small>
                ) : null}
                {request.error ? (
                  <small style={styles.errorDetail}>{request.error}</small>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      ) : null}
      <form onSubmit={onSubmit} style={styles.requestImageForm}>
        <textarea
          name="prompt"
          placeholder={`Describe the variation you want for "${heading}".`}
          required
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          style={styles.requestTextarea}
        />
        <button disabled={isSubmitting} style={styles.maybeButton}>
          {isSubmitting ? "Queueing..." : "Generate variation now"}
        </button>
        {message ? (
          <p
            style={{
              ...styles.feedback,
              ...(message.includes("failed") || message.includes("Request failed")
                ? styles.feedbackError
                : {}),
            }}
          >
            {message}
          </p>
        ) : null}
      </form>
    </div>
  );
}

function parseEventPayload(event: Event): { message?: string } {
  const messageEvent = event as MessageEvent<string>;
  try {
    return JSON.parse(messageEvent.data) as { message?: string };
  } catch {
    return {};
  }
}

function formatRequestDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function isFinishedRequest(request: ImageRequest) {
  return ["completed", "failed", "cancelled"].includes(request.status);
}

function observeRequests(requests: ImageRequest[]): WorkerObservation {
  const queued = requests.filter((request) => request.status === "queued");
  const processing = requests.filter((request) => request.status === "processing");
  const completed = requests.filter((request) => request.status === "completed");
  const failed = requests.filter((request) => request.status === "failed");
  const oldestQueuedAt =
    queued.length > 0
      ? queued
          .map((request) => request.requestedAt)
          .sort((left, right) => left.localeCompare(right))[0]
      : null;

  return {
    status:
      queued.length > 0 && processing.length === 0
        ? "needs-worker"
        : processing.length > 0
          ? "processing"
          : "idle",
    queued: queued.length,
    processing: processing.length,
    completed: completed.length,
    failed: failed.length,
    oldestQueuedAt,
    claim:
      queued.length > 0 && processing.length === 0
        ? "Image requests are stored, but no active worker is observed."
        : "Image request worker state is observable from request records.",
  };
}

function statusStyle(status: string): CSSProperties {
  if (status === "processing") return styles.statusProcessing;
  if (status === "completed") return styles.statusCompleted;
  if (status === "failed") return styles.statusFailed;
  return {};
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    display: "grid",
    gap: "12px",
  },
  requestStatusPanel: {
    display: "grid",
    gap: "8px",
    padding: "12px",
    border: "1px solid #cfd7ec",
    borderRadius: "10px",
    background: "#eef3ff",
  },
  requestStatusTitle: {
    margin: 0,
    color: "#25346f",
    fontSize: "0.88rem",
    fontWeight: 900,
  },
  workerWarning: {
    display: "grid",
    gap: "4px",
    padding: "12px",
    border: "2px solid #a33122",
    borderRadius: "8px",
    background: "#fff0ec",
    color: "#7c241a",
    fontSize: "0.9rem",
    lineHeight: 1.35,
  },
  workerProcessing: {
    display: "grid",
    gap: "4px",
    padding: "12px",
    border: "2px solid #b27500",
    borderRadius: "8px",
    background: "#fff5d8",
    color: "#704600",
    fontSize: "0.9rem",
    lineHeight: 1.35,
  },
  spinnerRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    alignItems: "center",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "3px solid rgba(112, 70, 0, 0.25)",
    borderTopColor: "#704600",
    borderRadius: "999px",
    animation: "draft-lab-spin 1s linear infinite",
  },
  workerMessageList: {
    display: "grid",
    gap: "4px",
    margin: "4px 0 0",
    paddingLeft: "20px",
  },
  requestStatusList: {
    display: "grid",
    gap: "8px",
    margin: 0,
    paddingLeft: "20px",
  },
  requestStatusItem: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto auto",
    gap: "8px",
    alignItems: "baseline",
    color: "#252b3a",
    fontSize: "0.86rem",
    lineHeight: 1.35,
  },
  statusChip: {
    padding: "2px 6px",
    borderRadius: "999px",
    background: "#fffdf8",
    color: "#25346f",
  },
  statusProcessing: {
    background: "#fff1c7",
    color: "#7a4c00",
  },
  statusCompleted: {
    background: "#dff3e6",
    color: "#245f3d",
  },
  statusFailed: {
    background: "#ffe1de",
    color: "#8e2727",
  },
  warningDetail: {
    gridColumn: "1 / -1",
    color: "#7c241a",
    fontSize: "0.8rem",
    fontWeight: 800,
    lineHeight: 1.35,
  },
  processingDetail: {
    gridColumn: "1 / -1",
    color: "#7a4c00",
    fontSize: "0.8rem",
    lineHeight: 1.35,
  },
  errorDetail: {
    gridColumn: "1 / -1",
    color: "#8e2727",
    fontSize: "0.8rem",
    lineHeight: 1.35,
  },
  requestImageForm: {
    display: "grid",
    gap: "8px",
  },
  requestTextarea: {
    width: "100%",
    minHeight: "74px",
    padding: "10px",
    border: "1px solid #d6d0c7",
    borderRadius: "8px",
    color: "#171717",
    font: "inherit",
    lineHeight: 1.45,
    resize: "vertical",
  },
  maybeButton: {
    minHeight: "36px",
    padding: "0 12px",
    border: 0,
    borderRadius: "8px",
    background: "#4451a4",
    color: "#fffaf1",
    fontWeight: 900,
    cursor: "pointer",
  },
  feedback: {
    margin: 0,
    color: "#245f3d",
    fontSize: "0.88rem",
    fontWeight: 800,
  },
  feedbackError: {
    color: "#8e2727",
  },
};
