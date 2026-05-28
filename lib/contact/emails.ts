import type { LeadPayload } from "./types";

const COLORS = {
  bg: "#0e1217",
  card: "#ffffff",
  accent: "#4FB3C7",
  accentSoft: "#E6F4F7",
  dark: "#1a1f2a",
  body: "#374151",
  mute: "#6b7280",
  line: "#e5e7eb",
};

function escape(s: string | undefined): string {
  if (!s) return "";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string | undefined): string {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:14px 20px;background:#f9fafb;border-bottom:1px solid ${COLORS.line};font-size:12px;letter-spacing:0.04em;text-transform:uppercase;color:${COLORS.mute};width:38%;">${escape(label)}</td>
      <td style="padding:14px 20px;background:#ffffff;border-bottom:1px solid ${COLORS.line};font-size:14px;color:${COLORS.dark};">${escape(value)}</td>
    </tr>`;
}

function bigBlock(label: string, value: string | undefined): string {
  if (!value) return "";
  return `
    <div style="margin-top:24px;padding:18px 22px;background:#f9fafb;border-left:3px solid ${COLORS.accent};border-radius:4px;">
      <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${COLORS.mute};margin-bottom:8px;">${escape(label)}</div>
      <p style="margin:0;color:${COLORS.dark};line-height:1.65;white-space:pre-wrap;font-size:14px;">${escape(value)}</p>
    </div>`;
}

const T = {
  fr: {
    ownerSubject: (name: string, company: string) => `🔔 Nouveau lead Meridian Flow — ${name} (${company})`,
    ownerTitle: "Nouvelle candidature pilote",
    ownerContact: "Contact",
    ownerTeam: "Équipe",
    ownerContext: "Contexte",
    ownerMeta: "Métadonnées",
    fieldName: "Nom",
    fieldEmail: "Email",
    fieldCompany: "Entreprise",
    fieldRole: "Rôle",
    fieldTeamSize: "Taille d'équipe",
    fieldStack: "Stack actuelle",
    fieldPain: "Point de douleur QA",
    fieldMessage: "Message",
    fieldSource: "Source",
    fieldDate: "Reçu le",
    fieldLang: "Langue du visiteur",

    clientSubject: "Reçu — Meridian Flow vous répond sous 48h",
    clientGreet: (firstName: string) => `Bonjour ${firstName},`,
    clientP1:
      "Merci d'avoir pris contact avec Meridian Flow. Votre candidature pilote est arrivée.",
    clientP2:
      "Un fondateur va relire votre dossier dans les prochaines heures et vous écrira personnellement sous 48 heures ouvrées avec un plan concret pour intégrer Meridian Flow à votre stack Jira + Playwright.",
    clientNext: "Et après ?",
    clientStep1: "Appel de 30 minutes pour comprendre votre workflow QA actuel",
    clientStep2: "Déploiement du runner dans votre environnement de staging",
    clientStep3: "Pretriage en production sur vos dix premiers tickets",
    clientSummary: "Récapitulatif de votre candidature",
    clientFooter1: "Meridian Flow — Pretriage propulsé par l'IA",
    clientFooter2: "Paris · Berlin",
    clientFooter3: "meridianflow@pennarstudio.fr",
    clientCta: "Découvrir le produit",
  },
  en: {
    ownerSubject: (name: string, company: string) => `🔔 New Meridian Flow lead — ${name} (${company})`,
    ownerTitle: "New pilot application",
    ownerContact: "Contact",
    ownerTeam: "Team",
    ownerContext: "Context",
    ownerMeta: "Metadata",
    fieldName: "Name",
    fieldEmail: "Email",
    fieldCompany: "Company",
    fieldRole: "Role",
    fieldTeamSize: "Team size",
    fieldStack: "Current stack",
    fieldPain: "Biggest QA pain",
    fieldMessage: "Message",
    fieldSource: "Source",
    fieldDate: "Received",
    fieldLang: "Visitor language",

    clientSubject: "Received — Meridian Flow will reply within 48h",
    clientGreet: (firstName: string) => `Hi ${firstName},`,
    clientP1:
      "Thanks for reaching out to Meridian Flow. Your pilot application is in.",
    clientP2:
      "A founder will personally review your application in the next few hours and write back within two business days with a concrete plan to plug Meridian Flow into your Jira + Playwright workflow.",
    clientNext: "What's next?",
    clientStep1: "A 30-minute call to understand your current QA workflow",
    clientStep2: "Runner deployment in your staging environment",
    clientStep3: "Production pretriage on your first ten tickets",
    clientSummary: "Application summary",
    clientFooter1: "Meridian Flow — AI-powered pretriage",
    clientFooter2: "Paris · Berlin",
    clientFooter3: "meridianflow@pennarstudio.fr",
    clientCta: "Explore the product",
  },
};

function shellHtml(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(title)}</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;background:${COLORS.bg};color:${COLORS.dark};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.bg};">
<tr><td align="center" style="padding:40px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:${COLORS.card};border-radius:14px;overflow:hidden;box-shadow:0 6px 30px rgba(0,0,0,0.25);">
${body}
</table>
</td></tr>
</table>
</body>
</html>`;
}

function brandHeader(title: string, eyebrow: string): string {
  return `
<tr><td style="padding:36px 36px 28px;background:linear-gradient(180deg,#0e1217 0%,#171e29 100%);">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="vertical-align:middle;">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td style="padding-right:10px;vertical-align:middle;">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="${COLORS.accent}" stroke-width="1.4"/>
              <path d="M12 3 Q5 12 12 21" stroke="${COLORS.accent}" stroke-width="1.4" fill="none"/>
              <path d="M12 3 Q19 12 12 21" stroke="${COLORS.accent}" stroke-width="1.4" fill="none"/>
              <path d="M3 12 H21" stroke="${COLORS.accent}" stroke-width="1.4"/>
            </svg>
          </td>
          <td style="font-size:15px;color:#ffffff;letter-spacing:-0.01em;font-weight:500;vertical-align:middle;">Meridian Flow</td>
        </tr></table>
        <div style="font-family:'SFMono-Regular',Menlo,Monaco,Consolas,monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${COLORS.accent};margin-top:24px;">${escape(eyebrow)}</div>
        <h1 style="margin:8px 0 0;font-size:24px;line-height:1.18;letter-spacing:-0.025em;color:#ffffff;font-weight:500;">${escape(title)}</h1>
      </td>
    </tr>
  </table>
</td></tr>`;
}

function brandFooter(t: typeof T.fr): string {
  return `
<tr><td style="padding:28px 36px 32px;background:#f9fafb;border-top:1px solid ${COLORS.line};">
  <p style="margin:0 0 6px;color:${COLORS.dark};font-size:13px;font-weight:500;">${escape(t.clientFooter1)}</p>
  <p style="margin:0 0 4px;color:${COLORS.mute};font-size:12px;">${escape(t.clientFooter2)} · <a href="mailto:meridianflow@pennarstudio.fr" style="color:${COLORS.accent};text-decoration:none;">${escape(t.clientFooter3)}</a></p>
</td></tr>`;
}

export function ownerNotificationEmail(lead: LeadPayload): { subject: string; html: string; text: string } {
  const t = T[lead.lang];
  const subject = t.ownerSubject(lead.name, lead.company);
  const dateStr = lead.date
    ? new Date(lead.date).toLocaleString(lead.lang === "fr" ? "fr-FR" : "en-US")
    : new Date().toLocaleString(lead.lang === "fr" ? "fr-FR" : "en-US");

  const body = `
${brandHeader(t.ownerTitle, "MERIDIAN FLOW · LEAD")}
<tr><td style="padding:32px 36px 16px;">
  <h2 style="margin:0 0 6px;font-size:13px;letter-spacing:0.06em;text-transform:uppercase;color:${COLORS.mute};">${escape(t.ownerContact)}</h2>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid ${COLORS.line};border-radius:8px;overflow:hidden;margin-top:8px;">
    ${row(t.fieldName, lead.name)}
    ${row(t.fieldEmail, lead.email)}
    ${row(t.fieldCompany, lead.company)}
    ${row(t.fieldRole, lead.role)}
  </table>
  <h2 style="margin:28px 0 6px;font-size:13px;letter-spacing:0.06em;text-transform:uppercase;color:${COLORS.mute};">${escape(t.ownerTeam)}</h2>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid ${COLORS.line};border-radius:8px;overflow:hidden;margin-top:8px;">
    ${row(t.fieldTeamSize, lead.teamSize)}
    ${row(t.fieldStack, lead.stack)}
  </table>
  ${bigBlock(t.fieldPain, lead.pain)}
  ${bigBlock(t.fieldMessage, lead.message)}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid ${COLORS.line};border-radius:8px;overflow:hidden;margin-top:28px;">
    <tr><td colspan="2" style="padding:10px 20px;background:#f9fafb;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${COLORS.mute};border-bottom:1px solid ${COLORS.line};">${escape(t.ownerMeta)}</td></tr>
    ${row(t.fieldSource, lead.source || "Site web — Meridian Flow")}
    ${row(t.fieldLang, lead.lang.toUpperCase())}
    ${row(t.fieldDate, dateStr)}
  </table>
</td></tr>
${brandFooter(t)}`;

  const text = [
    `${t.ownerTitle.toUpperCase()}`,
    "",
    `${t.fieldName}: ${lead.name}`,
    `${t.fieldEmail}: ${lead.email}`,
    `${t.fieldCompany}: ${lead.company}`,
    lead.role ? `${t.fieldRole}: ${lead.role}` : "",
    lead.teamSize ? `${t.fieldTeamSize}: ${lead.teamSize}` : "",
    lead.stack ? `${t.fieldStack}: ${lead.stack}` : "",
    lead.pain ? `\n${t.fieldPain}:\n${lead.pain}` : "",
    lead.message ? `\n${t.fieldMessage}:\n${lead.message}` : "",
    "",
    `${t.fieldSource}: ${lead.source || "Site web — Meridian Flow"}`,
    `${t.fieldDate}: ${dateStr}`,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html: shellHtml(subject, body), text };
}

export function clientConfirmationEmail(lead: LeadPayload): { subject: string; html: string; text: string } {
  const t = T[lead.lang];
  const subject = t.clientSubject;
  const firstName = lead.name.split(/\s+/)[0] ?? lead.name;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://meridianflow.dev";

  const body = `
${brandHeader(lead.lang === "fr" ? "Reçu — on revient vite." : "Got it — talk soon.", "MERIDIAN FLOW · CONFIRMATION")}
<tr><td style="padding:32px 36px 8px;">
  <p style="margin:0 0 14px;font-size:16px;color:${COLORS.dark};line-height:1.6;">${escape(t.clientGreet(firstName))}</p>
  <p style="margin:0 0 14px;font-size:15px;color:${COLORS.body};line-height:1.7;">${escape(t.clientP1)}</p>
  <p style="margin:0 0 24px;font-size:15px;color:${COLORS.body};line-height:1.7;">${escape(t.clientP2)}</p>

  <div style="margin:20px 0 24px;padding:20px 22px;background:${COLORS.accentSoft};border-radius:10px;">
    <div style="font-family:'SFMono-Regular',Menlo,Monaco,Consolas,monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:${COLORS.accent};margin-bottom:10px;">${escape(t.clientNext)}</div>
    <ol style="margin:0;padding-left:18px;color:${COLORS.dark};font-size:14px;line-height:1.75;">
      <li>${escape(t.clientStep1)}</li>
      <li>${escape(t.clientStep2)}</li>
      <li>${escape(t.clientStep3)}</li>
    </ol>
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid ${COLORS.line};border-radius:8px;overflow:hidden;margin:20px 0 24px;">
    <tr><td colspan="2" style="padding:10px 20px;background:#f9fafb;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${COLORS.mute};border-bottom:1px solid ${COLORS.line};">${escape(t.clientSummary)}</td></tr>
    ${row(t.fieldCompany, lead.company)}
    ${row(t.fieldRole, lead.role)}
    ${row(t.fieldTeamSize, lead.teamSize)}
    ${row(t.fieldStack, lead.stack)}
  </table>

  <div style="text-align:center;margin:32px 0 12px;">
    <a href="${escape(siteUrl)}" style="display:inline-block;padding:13px 26px;background:${COLORS.dark};color:#ffffff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:500;letter-spacing:-0.005em;">${escape(t.clientCta)} →</a>
  </div>
</td></tr>
${brandFooter(t)}`;

  const text = [
    t.clientGreet(firstName),
    "",
    t.clientP1,
    "",
    t.clientP2,
    "",
    `${t.clientNext}`,
    `1) ${t.clientStep1}`,
    `2) ${t.clientStep2}`,
    `3) ${t.clientStep3}`,
    "",
    `— ${t.clientFooter1}`,
    `${t.clientFooter2} · ${t.clientFooter3}`,
  ].join("\n");

  return { subject, html: shellHtml(subject, body), text };
}
