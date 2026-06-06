"use client";

import { FormEvent, useState } from "react";

import styles from "./NewsletterSignup.module.css";

type NewsletterSignupProps = {
  title?: string;
  description?: string;
  placement: string;
  tone?: "dark" | "light";
  ctaLabel?: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export function NewsletterSignup({
  title = "Get the next field note.",
  description = "Occasional writing about software factories, agent systems, and the work that survives the tool churn.",
  placement,
  tone = "dark",
  ctaLabel = "Join the list",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gotcha, setGotcha] = useState("");
  const [state, setState] = useState<SubmitState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (gotcha) {
      setState("success");
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim() || "Newsletter subscriber");
    formData.append("email", email.trim());
    formData.append("topic", "Newsletter Signup");
    formData.append(
      "message",
      `Newsletter signup from ${placement}. Consent: explicit form submit.`,
    );
    formData.append("newsletterOptIn", "true");
    formData.append("_gotcha", "");

    setState("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok || result.error) {
        throw new Error(result.error ?? "Signup failed");
      }

      setState("success");
      setEmail("");
      setName("");
    } catch {
      setState("error");
    }
  }

  return (
    <section
      className={`${styles.signup} ${tone === "light" ? styles.light : styles.dark}`}
      aria-label="Email signup"
    >
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Field notes</p>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          aria-hidden="true"
          autoComplete="off"
          className={styles.honeypot}
          tabIndex={-1}
          value={gotcha}
          onChange={(event) => setGotcha(event.target.value)}
        />
        <label className={styles.label}>
          <span>Name</span>
          <input
            autoComplete="name"
            className={styles.input}
            name="name"
            placeholder="Optional"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label className={styles.label}>
          <span>Email</span>
          <input
            autoComplete="email"
            className={styles.input}
            name="email"
            placeholder="you@example.com"
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <button
          className={styles.button}
          disabled={state === "submitting"}
          type="submit"
        >
          {state === "submitting" ? "Sending..." : ctaLabel}
        </button>
        <p className={styles.status} role="status">
          {state === "success"
            ? "You're on the list."
            : state === "error"
              ? "That did not go through. Try again in a minute."
              : "No spam. Just the useful parts."}
        </p>
      </form>
    </section>
  );
}
