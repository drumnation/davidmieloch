"use client";

import { type FormEvent, useState } from "react";
import type {
  ContentOpsActionResult,
  ContentOpsApiResult,
  ContentOpsInventoryItem,
} from "../../../content-ops/types";
import styles from "./ContentOpsConsole.module.css";

type ContentOpsConsoleActionsProps = {
  candidates: ContentOpsInventoryItem[];
  writeEnabled: boolean;
};

type ActionState = {
  slug: string;
  title: string;
  scheduledAt: string;
  intervalDays: string;
  pendingAction: string | null;
  result: ContentOpsActionResult | null;
  error: string | null;
};

function toDatetimeLocal(date: Date) {
  return date.toISOString().slice(0, 16);
}

function toIsoDatetime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error("Choose a valid schedule date.");
  }

  return date.toISOString();
}

async function postAction(
  endpoint: string,
  body: Record<string, unknown>,
): Promise<ContentOpsActionResult> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const payload =
    (await response.json()) as ContentOpsApiResult<ContentOpsActionResult>;

  if (!response.ok || !payload.ok) {
    throw new Error(payload.ok ? `HTTP ${response.status}` : payload.error);
  }

  return payload.data;
}

export function ContentOpsConsoleActions({
  candidates,
  writeEnabled,
}: ContentOpsConsoleActionsProps) {
  const firstCandidate = candidates[0];
  const [state, setState] = useState<ActionState>({
    slug: firstCandidate?.slug ?? "",
    title: firstCandidate?.title ?? "",
    scheduledAt: toDatetimeLocal(new Date(Date.now() + 24 * 60 * 60 * 1000)),
    intervalDays: "7",
    pendingAction: null,
    result: null,
    error: null,
  });

  const selectedCandidate = candidates.find(
    (candidate) => candidate.slug === state.slug,
  );

  function updateCandidate(slug: string) {
    const candidate = candidates.find((item) => item.slug === slug);
    setState((current) => ({
      ...current,
      slug,
      title: candidate?.title ?? current.title,
      result: null,
      error: null,
    }));
  }

  async function runAction(
    action: string,
    request: () => Promise<ContentOpsActionResult>,
  ) {
    setState((current) => ({
      ...current,
      pendingAction: action,
      result: null,
      error: null,
    }));

    try {
      const result = await request();
      setState((current) => ({
        ...current,
        pendingAction: null,
        result,
      }));
    } catch (error) {
      setState((current) => ({
        ...current,
        pendingAction: null,
        error: error instanceof Error ? error.message : String(error),
      }));
    }
  }

  function scheduleItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void runAction("schedule", () =>
      postAction("/api/admin/content/schedule/upsert", {
        slug: state.slug,
        title: state.title,
        scheduledAt: toIsoDatetime(state.scheduledAt),
      }),
    );
  }

  function cancelSchedule() {
    void runAction("cancel", () =>
      postAction("/api/admin/content/schedule/cancel", {
        slug: state.slug,
      }),
    );
  }

  function scheduleApprovedUnscheduled() {
    void runAction("schedule-approved-unscheduled", () =>
      postAction("/api/admin/content/agent/schedule-approved-unscheduled", {
        startAt: toIsoDatetime(state.scheduledAt),
        intervalDays: Number(state.intervalDays),
        write: true,
      }),
    );
  }

  const disabled = !writeEnabled || state.pendingAction !== null;

  return (
    <section
      className={styles.panel}
      aria-labelledby="content-ops-actions"
      data-test="content-ops-actions"
    >
      <div className={styles.actionHeader}>
        <div>
          <p className={styles.eyebrow}>Loose CRUD</p>
          <h2 id="content-ops-actions">Schedule Management</h2>
        </div>
        <span className={writeEnabled ? styles.writeOn : styles.writeOff}>
          {writeEnabled ? "write mode on" : "write mode off"}
        </span>
      </div>

      <p className={styles.actionIntro}>
        This panel edits the internal release calendar only. It does not publish
        the site, deploy production, create social posts, or spend generation
        credits.
      </p>

      <form className={styles.actionForm} onSubmit={scheduleItem}>
        {candidates.length > 0 ? (
          <label>
            Candidate
            <select
              value={state.slug}
              onChange={(event) => updateCandidate(event.target.value)}
              data-test="content-ops-candidate"
            >
              {candidates.map((candidate) => (
                <option key={candidate.slug} value={candidate.slug}>
                  {candidate.title}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <label>
          Slug
          <input
            value={state.slug}
            onChange={(event) =>
              setState((current) => ({
                ...current,
                slug: event.target.value,
                result: null,
                error: null,
              }))
            }
            placeholder="article-slug"
            data-test="content-ops-slug"
          />
        </label>

        <label>
          Title
          <input
            value={state.title}
            onChange={(event) =>
              setState((current) => ({
                ...current,
                title: event.target.value,
                result: null,
                error: null,
              }))
            }
            placeholder="Article title"
            data-test="content-ops-title"
          />
        </label>

        <label>
          Release slot
          <input
            type="datetime-local"
            value={state.scheduledAt}
            onChange={(event) =>
              setState((current) => ({
                ...current,
                scheduledAt: event.target.value,
                result: null,
                error: null,
              }))
            }
            data-test="content-ops-scheduled-at"
          />
        </label>

        <label>
          Auto interval days
          <input
            min="1"
            type="number"
            value={state.intervalDays}
            onChange={(event) =>
              setState((current) => ({
                ...current,
                intervalDays: event.target.value,
                result: null,
                error: null,
              }))
            }
            data-test="content-ops-interval-days"
          />
        </label>

        <div className={styles.actionButtons}>
          <button disabled={disabled || !state.slug} type="submit">
            Schedule item
          </button>
          <button
            disabled={disabled || !state.slug}
            type="button"
            onClick={cancelSchedule}
          >
            Cancel schedule
          </button>
          <button
            disabled={disabled}
            type="button"
            onClick={scheduleApprovedUnscheduled}
          >
            Auto-schedule approved
          </button>
        </div>
      </form>

      {!writeEnabled ? (
        <p className={styles.actionNote}>
          Enable <code>CONTENT_OPS_WRITE_ENABLED=1</code> with{" "}
          <code>CONTENT_OPS_ENABLED=1</code> to allow these controls to write.
          Disabled write endpoints return 404 by design.
        </p>
      ) : null}

      {selectedCandidate ? (
        <p className={styles.actionNote}>
          Selected item is {selectedCandidate.approvalState} with readiness{" "}
          {selectedCandidate.readinessState}. Next action:{" "}
          {selectedCandidate.nextAction}
        </p>
      ) : null}

      {state.pendingAction ? (
        <p className={styles.actionNote}>Running {state.pendingAction}...</p>
      ) : null}

      {state.error ? (
        <p className={styles.actionError} role="alert">
          {state.error}
        </p>
      ) : null}

      {state.result ? (
        <pre className={styles.actionResult} data-test="content-ops-result">
          {JSON.stringify(state.result, null, 2)}
        </pre>
      ) : null}
    </section>
  );
}
