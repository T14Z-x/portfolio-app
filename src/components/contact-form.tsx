"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  initialContactFormValues,
  type ContactFormErrors,
  type ContactFormState,
  type ContactFormValues,
  validateContactForm,
} from "@/lib/contact";

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialContactFormValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [state, setState] = useState<ContactFormState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isDisabled = state === "submitting";

  const handleChange = (field: keyof ContactFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = { ...values, [field]: event.target.value };
      setValues(next);
      if (state !== "idle") {
        setState("idle");
      }
      if (submitMessage) {
        setSubmitMessage("");
      }
      if (errors[field]) {
        const nextErrors = { ...errors };
        delete nextErrors[field];
        setErrors(nextErrors);
      }
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === "submitting") return;

    const validationErrors = validateContactForm(values);
    const hasErrors = Object.values(validationErrors).some(Boolean);
    if (hasErrors) {
      setErrors(validationErrors);
      setState("error");
      setSubmitMessage("Please fix the highlighted fields.");
      return;
    }

    setErrors({});
    setState("submitting");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = (await response.json().catch(() => null)) as
        | {
            error?: string;
            fieldErrors?: ContactFormErrors;
          }
        | null;

      if (!response.ok) {
        if (result?.fieldErrors) {
          setErrors(result.fieldErrors);
        }
        setState("error");
        setSubmitMessage(result?.error ?? "Could not send your message right now.");
        return;
      }

      setState("success");
      setSubmitMessage("Message sent successfully.");
      setValues(initialContactFormValues);
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
      resetTimer.current = setTimeout(() => {
        setState("idle");
        setSubmitMessage("");
      }, 2500);
    } catch (error) {
      console.error(error);
      setState("error");
      setSubmitMessage("Could not send your message right now. Please try again or email me directly.");
    }
  };

  useEffect(() => {
    return () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    };
  }, []);

  const ariaMessage = useMemo(() => {
    if (state === "success") {
      return submitMessage || "Message sent successfully.";
    }
    if (state === "error") {
      return submitMessage || "Could not send your message right now.";
    }
    return "";
  }, [state, submitMessage]);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid h-full gap-4 rounded-3xl border border-[--color-border]/70 bg-[--surface-elevated]/60 p-8 shadow-[var(--shadow-soft)]/50"
    >
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium text-[--color-foreground]">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="How should I address you?"
          value={values.name}
          onChange={handleChange("name")}
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
          disabled={isDisabled}
          className="rounded-xl border border-[--color-border] bg-[--surface-primary] px-4 py-3 text-sm text-[--color-foreground] outline-none transition focus:border-[--color-accent] focus:ring-2 focus:ring-[--color-accent]/30 disabled:cursor-not-allowed disabled:opacity-70"
        />
        {errors.name ? (
          <p id="name-error" className="text-xs text-red-500">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium text-[--color-foreground]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@email.com"
          value={values.email}
          onChange={handleChange("email")}
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
          disabled={isDisabled}
          className="rounded-xl border border-[--color-border] bg-[--surface-primary] px-4 py-3 text-sm text-[--color-foreground] outline-none transition focus:border-[--color-accent] focus:ring-2 focus:ring-[--color-accent]/30 disabled:cursor-not-allowed disabled:opacity-70"
        />
        {errors.email ? (
          <p id="email-error" className="text-xs text-red-500">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium text-[--color-foreground]">
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="What are you planning?"
          value={values.message}
          onChange={handleChange("message")}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
          disabled={isDisabled}
          className="rounded-xl border border-[--color-border] bg-[--surface-primary] px-4 py-3 text-sm text-[--color-foreground] outline-none transition focus:border-[--color-accent] focus:ring-2 focus:ring-[--color-accent]/30 disabled:cursor-not-allowed disabled:opacity-70"
        />
        {errors.message ? (
          <p id="message-error" className="text-xs text-red-500">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label htmlFor="meeting" className="text-sm font-medium text-[--color-foreground]">
          Meeting availability
        </label>
        <input
          id="meeting"
          name="meeting"
          type="text"
          placeholder="e.g., Weekdays 9am–12pm GMT+6"
          value={values.meeting}
          onChange={handleChange("meeting")}
          aria-invalid={errors.meeting ? "true" : "false"}
          aria-describedby={errors.meeting ? "meeting-error" : undefined}
          disabled={isDisabled}
          className="rounded-xl border border-[--color-border] bg-[--surface-primary] px-4 py-3 text-sm text-[--color-foreground] outline-none transition focus:border-[--color-accent] focus:ring-2 focus:ring-[--color-accent]/30 disabled:cursor-not-allowed disabled:opacity-70"
        />
        {errors.meeting ? (
          <p id="meeting-error" className="text-xs text-red-500">
            {errors.meeting}
          </p>
        ) : null}
      </div>

      <div className="sr-only" aria-hidden>
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          value={values.company}
          onChange={handleChange("company")}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={isDisabled}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-[--color-accent] px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-80"
      >
        {state === "submitting" ? "Sending..." : state === "success" ? "Sent" : "Send message"}
      </button>

      <div aria-live="polite" className="text-xs font-medium text-[--color-accent]">
        {ariaMessage}
      </div>
    </form>
  );
}
