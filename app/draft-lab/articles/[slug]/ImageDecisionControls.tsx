"use client";

import { useState, type CSSProperties } from "react";
import { Check, X } from "lucide-react";

type Props = {
  slug: string;
  assetId: string;
  variantId: string;
  returnTo: string;
  onDecision?: (assetId: string, decision: "approve" | "reject", status: string) => void;
};

export function ImageDecisionControls({
  slug,
  assetId,
  variantId,
  returnTo,
  onDecision,
}: Props) {
  const [isPending, setIsPending] = useState(false);
  const [currentDecision, setCurrentDecision] = useState<"approve" | "reject" | "pending" | "idle">("idle");

  async function decide(decision: "approve" | "reject") {
    setIsPending(true);
    setCurrentDecision(decision);

    try {
      const formData = new FormData();
      formData.set("action", "image-decision");
      formData.set("slug", slug);
      formData.set("assetId", assetId);
      formData.set("decision", decision);
      formData.set("returnTo", returnTo);

      const response = await fetch("/api/draft-lab", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "x-draft-lab-client": "1",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Image decision failed: ${response.status}`);
      }

      onDecision?.(assetId, decision, "ok");
    } finally {
      setIsPending(false);
      setCurrentDecision("idle");
    }
  }

  return (
    <div style={styles.wrapper} aria-label={`Choose or reject ${variantId}`}>
      <button
        type="button"
        disabled={isPending}
        onClick={() => void decide("approve")}
        style={styles.selectButton}
        title="Select this image"
        aria-label={`Select ${variantId}`}
      >
        <Check size={18} strokeWidth={3} aria-hidden="true" />
      </button>
      <button
        type="button"
        disabled={isPending}
        onClick={() => void decide("reject")}
        style={styles.rejectButton}
        title="Reject this image"
        aria-label={`Reject ${variantId}`}
      >
        <X size={18} strokeWidth={3} aria-hidden="true" />
      </button>
      {currentDecision === "approve" ? (
        <span style={styles.feedback} aria-live="polite">
          Selected
        </span>
      ) : null}
      {currentDecision === "reject" ? (
        <span style={styles.feedbackError} aria-live="polite">
          Rejected
        </span>
        ) : null}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "34px",
  },
  selectButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "34px",
    height: "34px",
    border: "0",
    borderRadius: "999px",
    background: "#245f3d",
    color: "#fffaf1",
    cursor: "pointer",
  },
  rejectButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "34px",
    height: "34px",
    border: "0",
    borderRadius: "999px",
    background: "#8a2e28",
    color: "#fffaf1",
    cursor: "pointer",
  },
  feedback: {
    color: "#245f3d",
    fontWeight: 800,
    fontSize: "0.78rem",
  },
  feedbackError: {
    color: "#8e2727",
    fontWeight: 800,
    fontSize: "0.78rem",
  },
};
