"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type FormState = "idle" | "submitting" | "success" | "error";

type FormValues = {
  name: string;
  email: string;
  message: string;
  meeting: string;
  company: string; // honeypot
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  message: "",
  meeting: "",
  company: "",
};

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [state, setState] = useState<FormState>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isDisabled = state === "submitting";

  const validate = (nextValues: FormValues): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!nextValues.name.trim()) {
      nextErrors.name = "Please share your name.";
    }
    if (!nextValues.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextValues.email.trim())) {
      nextErrors.email = "Use a valid email.";
    }
    if (!nextValues.message.trim()) {
      nextErrors.message = "Tell me a little about the project.";
    }
    if (!nextValues.meeting.trim()) {
      nextErrors.meeting = "When are you available?";
    }
    if (nextValues.company) {
      nextErrors.company = ""; // honeypot triggered
    }

    return nextErrors;
  };

  const handleChange = (field: keyof FormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = { ...values, [field]: event.target.value };
      setValues(next);
      if (errors[field]) {
        const nextErrors = { ...errors };
        delete nextErrors[field];
        setErrors(nextErrors);
      }
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === "submitting") return;

    const validationErrors = validate(values);
    const hasErrors = Object.values(validationErrors).some(Boolean);
    if (hasErrors) {
      setErrors(validationErrors);
      setState("error");
      return;
    }

    setErrors({});
    setState("submitting");

    try {
      // Simulate async request. Swap with API call or third-party integration.
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setState("success");
      setValues(initialValues);
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
      resetTimer.current = setTimeout(() => setState("idle"), 2500);
    } catch (error) {
      console.error(error);
      setState("error");
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
      return "Message sent successfully.";
    }
    if (state === "error" && Object.keys(errors).length > 0) {
      return "Please fix the highlighted fields.";
    }
    return "";
  }, [errors, state]);

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
