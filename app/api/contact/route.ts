import { NextResponse } from "next/server";
import { createNotionLead } from "@/lib/contact/notion";
import { clientConfirmationEmail, ownerNotificationEmail } from "@/lib/contact/emails";
import type { LeadLang, LeadPayload, LeadType } from "@/lib/contact/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REQUIRED_ENV = [
  "BREVO_API_KEY",
  "BREVO_SENDER",
  "BREVO_SENDER_NAME",
  "NOTION_TOKEN",
  "NOTION_DB_ID",
  "OWNER_EMAIL",
] as const;

function validateEnv() {
  const missing: string[] = [];
  const env: Record<string, string> = {};
  for (const key of REQUIRED_ENV) {
    const value = process.env[key];
    if (!value) missing.push(key);
    else env[key] = value;
  }
  if (missing.length) {
    throw new Error(`Missing environment variables: ${missing.join(", ")}`);
  }
  return env as Record<(typeof REQUIRED_ENV)[number], string>;
}

function isLang(v: unknown): v is LeadLang {
  return v === "fr" || v === "en";
}

function validatePayload(raw: unknown): LeadPayload {
  if (!raw || typeof raw !== "object") {
    throw new ValidationError("Payload must be a JSON object");
  }
  const p = raw as Record<string, unknown>;
  const errors: string[] = [];

  if (typeof p.name !== "string" || p.name.trim().length < 2) {
    errors.push("`name` is required (min 2 chars)");
  }
  if (typeof p.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) {
    errors.push("`email` is required and must be valid");
  }
  if (typeof p.company !== "string" || p.company.trim().length < 2) {
    errors.push("`company` is required (min 2 chars)");
  }
  const lang = isLang(p.lang) ? p.lang : "en";
  const allowedTypes: LeadType[] = ["Pilote", "Contact", "Démo"];
  const type = (allowedTypes as string[]).includes(p.type as string) ? (p.type as LeadType) : "Pilote";

  if (errors.length) throw new ValidationError(errors.join(", "));

  return {
    name: (p.name as string).trim(),
    email: (p.email as string).trim().toLowerCase(),
    company: (p.company as string).trim(),
    role: typeof p.role === "string" ? p.role.trim() || undefined : undefined,
    teamSize: typeof p.teamSize === "string" ? p.teamSize.trim() || undefined : undefined,
    stack: typeof p.stack === "string" ? p.stack.trim() || undefined : undefined,
    pain: typeof p.pain === "string" ? p.pain.trim() || undefined : undefined,
    message: typeof p.message === "string" ? p.message.trim() || undefined : undefined,
    lang,
    type,
    source: typeof p.source === "string" ? p.source.trim() : "Site web · Meridian Flow",
    formUrl: typeof p.formUrl === "string" ? p.formUrl.trim() || undefined : undefined,
    date: new Date().toISOString(),
    website: typeof p.website === "string" ? p.website : undefined,
  };
}

class ValidationError extends Error {}

async function sendBrevoEmail(
  apiKey: string,
  payload: {
    sender: { name: string; email: string };
    to: { email: string; name?: string }[];
    subject: string;
    htmlContent: string;
    textContent?: string;
  },
) {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Brevo error (${response.status}): ${await response.text()}`);
  }
}

export async function POST(req: Request) {
  try {
    const env = validateEnv();
    const raw = await req.json().catch(() => null);
    const lead = validatePayload(raw);

    // Honeypot — silently accept and drop.
    if (lead.website) {
      return NextResponse.json({ success: true });
    }

    const owner = ownerNotificationEmail(lead);
    const client = clientConfirmationEmail(lead);

    const results = await Promise.allSettled([
      sendBrevoEmail(env.BREVO_API_KEY, {
        sender: { name: env.BREVO_SENDER_NAME, email: env.BREVO_SENDER },
        to: [{ email: env.OWNER_EMAIL }],
        subject: owner.subject,
        htmlContent: owner.html,
        textContent: owner.text,
      }),
      sendBrevoEmail(env.BREVO_API_KEY, {
        sender: { name: env.BREVO_SENDER_NAME, email: env.BREVO_SENDER },
        to: [{ email: lead.email, name: lead.name }],
        subject: client.subject,
        htmlContent: client.html,
        textContent: client.text,
      }),
      createNotionLead(env.NOTION_TOKEN, env.NOTION_DB_ID, lead),
    ]);

    const failures = results.filter((r): r is PromiseRejectedResult => r.status === "rejected");
    if (failures.length === results.length) {
      throw new Error(`All side effects failed. First reason: ${failures[0]!.reason}`);
    }
    if (failures.length > 0) {
      console.warn(`[/api/contact] ${failures.length}/${results.length} side effects failed`, failures.map((f) => String(f.reason)));
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    const message = err instanceof Error ? err.message : String(err);
    console.error("[/api/contact]", message);
    const status =
      message.includes("Brevo") || message.includes("Notion") ? 502 : 500;
    return NextResponse.json(
      { error: status === 502 ? "Upstream service error" : "Internal error" },
      { status },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
