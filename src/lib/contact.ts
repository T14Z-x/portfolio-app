export type ContactFormState = "idle" | "submitting" | "success" | "error";

export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
  meeting: string;
  company: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export const initialContactFormValues: ContactFormValues = {
  name: "",
  email: "",
  message: "",
  meeting: "",
  company: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const maxLength = {
  name: 120,
  email: 160,
  meeting: 160,
  message: 5000,
} as const;

const toTrimmedString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

export function coerceContactFormValues(input: unknown): ContactFormValues {
  const source =
    typeof input === "object" && input !== null
      ? (input as Record<string, unknown>)
      : {};

  return {
    name: toTrimmedString(source.name),
    email: toTrimmedString(source.email),
    message: toTrimmedString(source.message),
    meeting: toTrimmedString(source.meeting),
    company: toTrimmedString(source.company),
  };
}

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name) {
    errors.name = "Please share your name.";
  } else if (values.name.length > maxLength.name) {
    errors.name = "Keep your name under 120 characters.";
  }

  if (!values.email) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Use a valid email.";
  } else if (values.email.length > maxLength.email) {
    errors.email = "Keep your email under 160 characters.";
  }

  if (!values.message) {
    errors.message = "Tell me a little about the project.";
  } else if (values.message.length > maxLength.message) {
    errors.message = "Keep your message under 5000 characters.";
  }

  if (!values.meeting) {
    errors.meeting = "When are you available?";
  } else if (values.meeting.length > maxLength.meeting) {
    errors.meeting = "Keep your availability under 160 characters.";
  }

  if (values.company) {
    errors.company = "";
  }

  return errors;
}
