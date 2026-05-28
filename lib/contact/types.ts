export type LeadLang = "fr" | "en";
export type LeadType = "Pilote" | "Contact" | "Démo";

export interface LeadPayload {
  name: string;
  email: string;
  company: string;
  role?: string;
  teamSize?: string;
  stack?: string;
  pain?: string;
  message?: string;
  lang: LeadLang;
  type?: LeadType;
  source?: string;
  formUrl?: string;
  date?: string;
  /** Honeypot — must stay empty */
  website?: string;
}
