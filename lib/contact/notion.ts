import type { LeadPayload } from "./types";

interface NotionProperty {
  id: string;
  name: string;
  type: string;
  [key: string]: unknown;
}

interface NotionDatabaseSchema {
  properties: Record<string, NotionProperty>;
}

/**
 * Field candidates: maps internal lead key → list of acceptable Notion property names
 * (FR + EN variants, with and without accents). Same shape as pennarstudio so a single
 * runner can target either DB without code changes.
 */
const FIELD_CANDIDATES: Record<
  string,
  { names: string[]; preferredType: string; fallbackType?: string }
> = {
  name: {
    names: ["Nom", "Name", "Title", "Titre", "Full name", "Nom complet"],
    preferredType: "title",
  },
  email: {
    names: ["Email", "E-mail", "Mail", "Courriel"],
    preferredType: "email",
    fallbackType: "rich_text",
  },
  company: {
    names: ["Entreprise", "Company", "Organisation", "Organization", "Société", "Societe"],
    preferredType: "rich_text",
  },
  role: {
    names: ["Rôle", "Role", "Poste", "Title", "Job title"],
    preferredType: "rich_text",
  },
  teamSize: {
    names: ["Taille équipe", "Taille equipe", "Team size", "Taille de l'équipe", "Effectif"],
    preferredType: "select",
    fallbackType: "rich_text",
  },
  stack: {
    names: ["Stack", "Tech stack", "Pile technique", "Techno"],
    preferredType: "rich_text",
  },
  pain: {
    names: [
      "Point de douleur QA",
      "Point de douleur",
      "QA pain",
      "Pain",
      "Pain point",
      "Biggest pain",
    ],
    preferredType: "rich_text",
  },
  message: {
    names: ["Message", "Notes", "Commentaire", "Description", "Comment", "Détails", "Details"],
    preferredType: "rich_text",
  },
  lang: {
    names: ["Langue", "Lang", "Language", "Locale"],
    preferredType: "select",
    fallbackType: "rich_text",
  },
  type: {
    names: ["Type", "Demand", "Demande", "Category"],
    preferredType: "select",
    fallbackType: "rich_text",
  },
  statut: {
    names: ["Statut", "Status", "Stage", "État", "Etat"],
    preferredType: "select",
    fallbackType: "rich_text",
  },
  source: {
    names: ["Source", "Origine", "Channel", "Canal", "Origin"],
    preferredType: "rich_text",
  },
  date: {
    names: [
      "Date",
      "Created",
      "Created at",
      "Créé le",
      "Cree le",
      "Date de création",
      "Date de creation",
      "Date d'envoi",
    ],
    preferredType: "date",
  },
  formUrl: {
    names: ["URL du formulaire", "Form URL", "Page source", "URL source", "Lien formulaire"],
    preferredType: "url",
    fallbackType: "rich_text",
  },
};

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function findPropertyMatch(
  fieldKey: string,
  schema: NotionDatabaseSchema,
): { propertyName: string; propertyType: string } | null {
  const config = FIELD_CANDIDATES[fieldKey];
  if (!config) return null;

  // First pass: preferred type
  for (const candidateName of config.names) {
    for (const [propName, propData] of Object.entries(schema.properties)) {
      if (normalize(propName) === normalize(candidateName) && propData.type === config.preferredType) {
        return { propertyName: propName, propertyType: propData.type };
      }
    }
  }
  // Second pass: fallback type
  if (config.fallbackType) {
    for (const candidateName of config.names) {
      for (const [propName, propData] of Object.entries(schema.properties)) {
        if (
          normalize(propName) === normalize(candidateName) &&
          propData.type === config.fallbackType
        ) {
          return { propertyName: propName, propertyType: propData.type };
        }
      }
    }
  }
  // Third pass: any type match
  for (const candidateName of config.names) {
    for (const [propName, propData] of Object.entries(schema.properties)) {
      if (normalize(propName) === normalize(candidateName)) {
        return { propertyName: propName, propertyType: propData.type };
      }
    }
  }
  return null;
}

function buildNotionValue(value: string | undefined, propertyType: string): unknown {
  if (!value) {
    switch (propertyType) {
      case "title":
        return { title: [] };
      case "rich_text":
        return { rich_text: [] };
      case "url":
        return { url: null };
      default:
        return null;
    }
  }
  switch (propertyType) {
    case "title":
      return { title: [{ text: { content: value } }] };
    case "email":
      return { email: value };
    case "phone_number":
      return { phone_number: value };
    case "select":
      return { select: { name: value } };
    case "multi_select":
      return { multi_select: [{ name: value }] };
    case "rich_text":
      return { rich_text: [{ text: { content: value } }] };
    case "date":
      return { date: { start: value } };
    case "url":
      return { url: value };
    default:
      return { rich_text: [{ text: { content: value } }] };
  }
}

async function fetchNotionDatabaseSchema(
  token: string,
  databaseId: string,
): Promise<NotionDatabaseSchema> {
  const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": "2022-06-28",
    },
  });
  if (!response.ok) {
    throw new Error(`Notion schema fetch error (${response.status}): ${await response.text()}`);
  }
  return (await response.json()) as NotionDatabaseSchema;
}

function buildNotionProperties(
  lead: LeadPayload,
  schema: NotionDatabaseSchema,
): Record<string, unknown> {
  const properties: Record<string, unknown> = {};

  const fieldsToMap: Record<string, string | undefined> = {
    name: lead.name,
    email: lead.email,
    company: lead.company,
    role: lead.role,
    teamSize: lead.teamSize,
    stack: lead.stack,
    pain: lead.pain,
    message: lead.message,
    lang: lead.lang.toUpperCase(),
    type: lead.type || "Pilote",
    statut: "Nouveau",
    source: lead.source || "Site web — Meridian Flow",
    date: lead.date || new Date().toISOString(),
    formUrl: lead.formUrl,
  };

  for (const [fieldKey, fieldValue] of Object.entries(fieldsToMap)) {
    const match = findPropertyMatch(fieldKey, schema);
    if (match) {
      const value = buildNotionValue(fieldValue, match.propertyType);
      if (value !== null) properties[match.propertyName] = value;
    }
  }
  return properties;
}

export async function createNotionLead(
  token: string,
  databaseId: string,
  lead: LeadPayload,
): Promise<void> {
  const schema = await fetchNotionDatabaseSchema(token, databaseId);
  const properties = buildNotionProperties(lead, schema);

  const response = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({ parent: { database_id: databaseId }, properties }),
  });

  if (!response.ok) {
    throw new Error(`Notion API error (${response.status}): ${await response.text()}`);
  }
}
