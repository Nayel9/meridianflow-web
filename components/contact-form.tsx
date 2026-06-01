"use client";

import * as React from "react";
import { ArrowRight, CheckCircle2, Loader2, AlertTriangle } from "lucide-react";
import { useLang, useT } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { LeadType } from "@/lib/contact/types";

type FormState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function ContactForm({ leadType = "Pilote" }: { leadType?: LeadType }) {
  const t = useT();
  const { lang } = useLang();
  const [state, setState] = React.useState<FormState>({ kind: "idle" });
  const formRef = React.useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      role: String(formData.get("role") ?? "") || undefined,
      teamSize: String(formData.get("teamSize") ?? "") || undefined,
      stack: String(formData.get("stack") ?? "") || undefined,
      pain: String(formData.get("pain") ?? "") || undefined,
      message: String(formData.get("message") ?? "") || undefined,
      website: String(formData.get("website") ?? ""), // honeypot
      lang,
      type: leadType,
      formUrl: typeof window !== "undefined" ? window.location.href : undefined,
    };

    setState({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        let msg = lang === "fr" ? "Envoi impossible, veuillez réessayer." : "Couldn't send. Please try again.";
        try {
          const body = (await res.json()) as { error?: string };
          if (body?.error) msg = body.error;
        } catch {
          /* ignore */
        }
        setState({ kind: "error", message: msg });
        return;
      }
      setState({ kind: "success" });
    } catch {
      setState({
        kind: "error",
        message:
          lang === "fr"
            ? "Connexion impossible. Vérifiez votre réseau et réessayez."
            : "Connection failed. Check your network and try again.",
      });
    }
  }

  function reset() {
    setState({ kind: "idle" });
    formRef.current?.reset();
  }

  if (state.kind === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-start gap-4 rounded-xl border border-pass-line bg-pass-soft p-6 text-fg sm:p-8"
      >
        <div className="flex items-center gap-3">
          <CheckCircle2 className="size-5 text-pass" />
          <h3 className="text-lg font-medium tracking-[-0.01em]">{t.contact.successTitle}</h3>
        </div>
        <p className="max-w-[560px] text-[14px] leading-[1.55] text-fg-soft">{t.contact.successSub}</p>
        <Button variant="ghost" size="md" onClick={reset}>
          {t.contact.sendAnother}
        </Button>
      </div>
    );
  }

  const f = t.contact.fields;
  const p = t.contact.placeholders;
  const submitting = state.kind === "submitting";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-line bg-bg-elev p-6 sm:p-8"
    >
      <div className="mb-6">
        <h3 className="text-[18px] font-medium tracking-[-0.01em] text-fg">{t.contact.formTitle}</h3>
        <p className="mt-1 text-[13.5px] text-fg-mute">{t.contact.formSub}</p>
      </div>

      {/* honeypot — visually hidden but in DOM, real users won't fill it */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-[5000px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={f.name}>
          <Input id="name" name="name" required autoComplete="name" placeholder={p.name} />
        </Field>
        <Field id="email" label={f.email}>
          <Input id="email" type="email" name="email" required autoComplete="email" placeholder={p.email} />
        </Field>
        <Field id="company" label={f.company}>
          <Input id="company" name="company" required autoComplete="organization" placeholder={p.company} />
        </Field>
        <Field id="role" label={f.role}>
          <Input id="role" name="role" autoComplete="organization-title" placeholder={p.role} />
        </Field>
        <Field id="teamSize" label={f.teamSize}>
          <Input id="teamSize" name="teamSize" placeholder={p.teamSize} />
        </Field>
        <Field id="stack" label={f.stack}>
          <Input id="stack" name="stack" placeholder={p.stack} />
        </Field>
        <Field id="pain" label={f.pain} className="sm:col-span-2">
          <Input id="pain" name="pain" placeholder={p.pain} />
        </Field>
        <Field id="message" label={f.message} className="sm:col-span-2">
          <Textarea id="message" name="message" placeholder={p.message} rows={4} />
        </Field>
      </div>

      {state.kind === "error" ? (
        <div
          role="alert"
          aria-live="assertive"
          className="mt-5 flex items-start gap-2.5 rounded-md border border-fail-line bg-fail-soft px-4 py-3 text-[13.5px] text-fail"
        >
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <span>{state.message}</span>
        </div>
      ) : null}

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-[12px] tracking-[0.04em] text-fg-dim">meridianflow@pennarstudio.fr</p>
        <Button type="submit" size="lg" disabled={submitting} aria-busy={submitting}>
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" /> {t.contact.submitting}
            </>
          ) : (
            <>
              {t.contact.submit} <ArrowRight className="arrow size-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  children,
  className,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid gap-1.5 ${className ?? ""}`}>
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}
