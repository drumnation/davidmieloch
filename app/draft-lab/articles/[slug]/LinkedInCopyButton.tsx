"use client";

import { useState, type CSSProperties } from "react";

type Props = {
  articleText: string;
};

export function LinkedInCopyButton({ articleText }: Props) {
  const [status, setStatus] = useState("");

  async function copyArticle() {
    try {
      await navigator.clipboard.writeText(articleText);
      setStatus("Copied LinkedIn article draft.");
    } catch {
      setStatus("Copy failed. Select the transfer text manually.");
    }
  }

  return (
    <section style={styles.wrapper} aria-label="LinkedIn article transfer">
      <div style={styles.copyHeader}>
        <div>
          <p style={styles.eyebrow}>LinkedIn article transfer</p>
          <h2 style={styles.title}>Copy this draft for LinkedIn</h2>
        </div>
        <button type="button" onClick={copyArticle} style={styles.copyButton}>
          Copy LinkedIn article draft
        </button>
      </div>
      <p style={styles.help}>
        Copies clean article text with image placeholders and captions. Paste it
        into a LinkedIn article, then place the matching images where marked.
      </p>
      {status ? <p style={styles.status}>{status}</p> : null}
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    display: "grid",
    gap: "12px",
    margin: "0 0 28px",
    padding: "18px",
    border: "2px solid #4451a4",
    borderRadius: "12px",
    background: "#eef3ff",
  },
  copyHeader: {
    display: "flex",
    flexWrap: "wrap",
    gap: "14px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  eyebrow: {
    margin: "0 0 6px",
    color: "#25346f",
    fontSize: "0.78rem",
    fontWeight: 900,
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  title: {
    margin: 0,
    color: "#171717",
    fontSize: "clamp(1.35rem, 4vw, 2.2rem)",
    lineHeight: 1,
    letterSpacing: 0,
  },
  copyButton: {
    minHeight: "48px",
    padding: "0 18px",
    border: "0",
    borderRadius: "8px",
    background: "#4451a4",
    color: "#fffaf1",
    fontWeight: 900,
    cursor: "pointer",
  },
  help: {
    maxWidth: "680px",
    margin: 0,
    color: "#25346f",
    fontSize: "0.95rem",
    lineHeight: 1.45,
  },
  status: {
    margin: 0,
    color: "#245f3d",
    fontSize: "0.9rem",
    fontWeight: 900,
  },
};
