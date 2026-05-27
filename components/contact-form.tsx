"use client";

import * as React from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useT } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormState = "idle" | "submitting" | "success";

export function ContactForm() {
  const t = useT();
  const [state, setState] = React.useState<FormState>("idle");
  const formRef = React.useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    // Mocked submit. Replace with Resend/Formspree integration when keys are wired.
    window.setTimeout(() => setState("success"), 700);
  }

  function reset() {
    setState("idle");
    formRef.current?.reset();
  }

  if (state === "success") {
    return (
      <div
        role="status"
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

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="rounded-xl border border-line bg-bg-elev p-6 sm:p-8"
    >
      <div className="mb-6">
        <h3 className="text-[18px] font-medium tracking-[-0.01em] text-fg">{t.contact.formTitle}</h3>
        <p className="mt-1 text-[13.5px] text-fg-mute">{t.contact.formSub}</p>
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
      <div className="mt-7 flex items-center justify-between gap-4">
        <p className="text-[12px] text-fg-dim">
          {"hello@meridianflow.dev"}
        </p>
        <Button type="submit" size="lg" disabled={state === "submitting"}>
          {state === "submitting" ? (
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
