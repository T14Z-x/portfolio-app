import { NextResponse } from "next/server";

import {
  coerceContactFormValues,
  validateContactForm,
} from "@/lib/contact";

const resendEndpoint = "https://api.resend.com/emails";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatTextBody(values: ReturnType<typeof coerceContactFormValues>) {
  return [
    "New portfolio inquiry",
    "",
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Meeting availability: ${values.meeting}`,
    "",
    "Project details:",
    values.message,
  ].join("\n");
}

function formatHtmlBody(values: ReturnType<typeof coerceContactFormValues>) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2 style="margin-bottom: 16px;">New portfolio inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(values.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(values.email)}</p>
      <p><strong>Meeting availability:</strong> ${escapeHtml(values.meeting)}</p>
      <p><strong>Project details:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(values.message)}</p>
    </div>
  `;
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const values = coerceContactFormValues(payload);

  if (values.company) {
    return NextResponse.json({ ok: true });
  }

  const fieldErrors = validateContactForm(values);
  const hasErrors = Object.values(fieldErrors).some(Boolean);

  if (hasErrors) {
    return NextResponse.json(
      {
        error: "Please fix the highlighted fields.",
        fieldErrors,
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return NextResponse.json(
      {
        error:
          "The contact form is not configured yet. Add the email environment variables on the server.",
      },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(resendEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "portfolio-app-contact-form",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `New portfolio inquiry from ${values.name}`,
        html: formatHtmlBody(values),
        text: formatTextBody(values),
        headers: {
          "Reply-To": values.email,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend API error", errorText);

      return NextResponse.json(
        {
          error: "Message delivery failed. Please try again shortly.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact route error", error);

    return NextResponse.json(
      {
        error: "Message delivery failed. Please try again shortly.",
      },
      { status: 502 },
    );
  }
}
