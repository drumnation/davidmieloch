"use client";

import { useState, type CSSProperties, type FormEvent } from "react";

type ImageRequest = {
  id: string;
  prompt: string;
  status: string;
  requestedAt: string;
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
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setPrompt("");
      setMessage("Queued. The image worker can process this request now.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Queue failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div style={styles.wrapper}>
      {requests.length > 0 ? (
        <div style={styles.requestStatusPanel} aria-live="polite">
          <p style={styles.requestStatusTitle}>
            {requests.length} image request{requests.length === 1 ? "" : "s"}
          </p>
          <ol style={styles.requestStatusList}>
            {requests.map((request) => (
              <li key={request.id} style={styles.requestStatusItem}>
                <span>{request.prompt}</span>
                <code style={styles.statusChip}>{request.status}</code>
                <time dateTime={request.requestedAt}>
                  {formatRequestDate(request.requestedAt)}
                </time>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
      <form onSubmit={onSubmit} style={styles.requestImageForm}>
        <textarea
          name="prompt"
          placeholder={`Describe a better image for "${heading}".`}
          required
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          style={styles.requestTextarea}
        />
        <button disabled={isSubmitting} style={styles.maybeButton}>
          {isSubmitting ? "Queueing..." : "Queue new image request"}
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

function formatRequestDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
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
