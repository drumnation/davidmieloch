import { mkdir, appendFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname } from "node:path";

type LeadIntakeData = {
  name: string;
  email: string;
  company?: string;
  topic: string;
  message: string;
  newsletterOptIn?: boolean;
  details?: Record<string, string | undefined>;
};

type LeadSinkResult = {
  sink: string;
  ok: boolean;
  required: boolean;
  status?: number;
  error?: string;
  data?: Record<string, unknown>;
};

const source = process.env.LEAD_SOURCE ?? "davidmieloch.com";

export async function submitLeadIntake(data: LeadIntakeData) {
  const results: LeadSinkResult[] = [];

  for (const sink of [
    storeLeadInFile,
    storeLead,
    notifyLead,
    syncTwenty,
    syncMailerLite,
  ]) {
    const result = await sink(data);
    results.push(result);

    if (!result.ok && !isExpectedSkip(result)) {
      console.warn("Lead sink failed", { lead: safeLead(data), result });
    }
  }

  const requiredResults = results.filter((result) => result.required);
  const success =
    requiredResults.length > 0
      ? requiredResults.some((result) => result.ok)
      : results.some((result) => result.ok);

  console.info("Lead intake completed", {
    lead: safeLead(data),
    results,
    success,
  });

  return { success, results };
}

async function storeLeadInFile(data: LeadIntakeData): Promise<LeadSinkResult> {
  const filePath = process.env.LEAD_INTAKE_FILE_PATH;

  if (!filePath) {
    return skipped("lead-file", false, "Missing LEAD_INTAKE_FILE_PATH");
  }

  const submittedAt = new Date().toISOString();
  const record = {
    submittedAt,
    source,
    name: data.name,
    email: data.email,
    company: data.company || null,
    topic: data.topic,
    message: data.message,
    newsletterOptIn: Boolean(data.newsletterOptIn),
    details: data.details ?? {},
  };
  const checksum = createHash("sha256")
    .update(JSON.stringify(record))
    .digest("hex");

  await mkdir(dirname(filePath), { recursive: true });
  await appendFile(filePath, `${JSON.stringify({ ...record, checksum })}\n`);

  return {
    sink: "lead-file",
    ok: true,
    required: true,
    data: {
      filePath,
      checksum,
    },
  };
}

async function storeLead(data: LeadIntakeData): Promise<LeadSinkResult> {
  const supabaseUrl =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return skipped("supabase", false, "Missing Supabase service credentials");
  }

  const response = await fetch(
    `${trimSlash(supabaseUrl)}/rest/v1/contact_leads`,
    {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        source,
        name: data.name,
        email: data.email,
        company: data.company || null,
        message: data.message,
        newsletter_opt_in: Boolean(data.newsletterOptIn),
        metadata: {
          submittedAt: new Date().toISOString(),
          topic: data.topic,
          details: data.details ?? {},
        },
      }),
    },
  );

  return fromResponse("supabase", true, response);
}

async function notifyLead(data: LeadIntakeData): Promise<LeadSinkResult> {
  const webhookUrl = process.env.LEAD_ALERT_WEBHOOK_URL;

  if (!webhookUrl) {
    return skipped("alert-webhook", false, "Missing LEAD_ALERT_WEBHOOK_URL");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      channel: "leads",
      title: "New David Mieloch contact",
      severity: "success",
      source,
      summary: `${data.name}${data.company ? ` at ${data.company}` : ""} asked about ${data.topic}.`,
      markdown: formatMarkdownLead(data),
    }),
  });

  return fromResponse("alert-webhook", true, response);
}

async function syncTwenty(data: LeadIntakeData): Promise<LeadSinkResult> {
  const baseUrl =
    process.env.TWENTY_API_BASE_URL ?? process.env.TWENTY_BASE_URL;
  const apiKey = process.env.TWENTY_API_KEY;

  if (!baseUrl || !apiKey) {
    return skipped(
      "twenty",
      false,
      "Missing TWENTY_API_BASE_URL or TWENTY_API_KEY",
    );
  }

  try {
    const fieldSets = await fetchTwentyFieldSets(baseUrl, apiKey);
    const company = data.company
      ? await createTwentyCompany(baseUrl, apiKey, data, fieldSets.companies)
      : undefined;

    const personResponse = await createTwentyRecord<{ id: string }>(
      baseUrl,
      apiKey,
      "people",
      "createPerson",
      buildTwentyPersonPayload(data, company?.id, fieldSets.people),
    );

    if (!personResponse.ok || !personResponse.record?.id) {
      return {
        sink: "twenty",
        ok: false,
        required: false,
        status: personResponse.status,
        error: personResponse.error ?? "Twenty did not create a person",
      };
    }

    const opportunityResponse = await createTwentyOpportunity(
      baseUrl,
      apiKey,
      data,
      company?.id,
      personResponse.record.id,
      fieldSets.opportunities,
    );

    if (!opportunityResponse.ok) {
      console.warn("Twenty opportunity sync skipped or failed", {
        lead: safeLead(data),
        result: opportunityResponse,
      });
    }

    return {
      sink: "twenty",
      ok: true,
      required: false,
      status: personResponse.status,
      data: {
        personId: personResponse.record.id,
        companyId: company?.id,
        opportunityId: opportunityResponse.record?.id,
        opportunitySynced: opportunityResponse.ok,
      },
    };
  } catch (error) {
    return {
      sink: "twenty",
      ok: false,
      required: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function syncMailerLite(data: LeadIntakeData): Promise<LeadSinkResult> {
  if (!data.newsletterOptIn) {
    return skipped("mailerlite", false, "Lead did not opt in");
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!apiKey) {
    return skipped("mailerlite", false, "Missing MAILERLITE_API_KEY");
  }

  const response = await fetch(
    "https://connect.mailerlite.com/api/subscribers",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        fields: {
          name: data.name,
          company: data.company ?? "",
          source,
          topic: data.topic,
        },
        groups: groupId ? [groupId] : undefined,
      }),
    },
  );

  return fromResponse("mailerlite", false, response);
}

function skipped(
  sink: string,
  required: boolean,
  error: string,
): LeadSinkResult {
  return {
    sink,
    ok: false,
    required,
    error,
  };
}

function fromResponse(
  sink: string,
  required: boolean,
  response: Response,
): LeadSinkResult {
  return {
    sink,
    ok: response.ok,
    required,
    status: response.status,
    error: response.ok ? undefined : response.statusText,
  };
}

function safeLead(data: LeadIntakeData) {
  return {
    source,
    name: data.name,
    email: data.email,
    company: data.company,
    topic: data.topic,
    newsletterOptIn: data.newsletterOptIn,
  };
}

function isExpectedSkip(result: LeadSinkResult) {
  return !result.required && result.error?.startsWith("Missing ");
}

function formatMarkdownLead(data: LeadIntakeData) {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : undefined,
    `Topic: ${data.topic}`,
    `Newsletter opt-in: ${data.newsletterOptIn ? "yes" : "no"}`,
    "",
    data.message,
    "",
    ...Object.entries(data.details ?? {})
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}: ${value}`),
  ]
    .filter(Boolean)
    .join("\n");
}

function trimSlash(value: string) {
  return value.replace(/\/$/, "");
}

type BusinessLine = "SINGULARITY_LABS" | "DAVID_MIELOCH" | "WE_LEARN_MUSIC";

type EngagementType =
  | "FACTORY_DESIGN"
  | "MANAGED_AGENT_HOSTING"
  | "WEBSITE_APP_BUILD"
  | "AUTOMATION_CONSULTING"
  | "MUSIC_AI_TOOLING"
  | "RETAINER_SUPPORT";

type TwentyCreateResponse<T> = {
  data: Record<string, T>;
};

type TwentyFieldSet = Set<string> | null;

type TwentyFieldSets = {
  people: TwentyFieldSet;
  companies: TwentyFieldSet;
  opportunities: TwentyFieldSet;
};

type TwentyCreateResult<T> = {
  ok: boolean;
  status?: number;
  error?: string;
  record?: T;
};

function unwrapTwentyCreate<T>(
  response: TwentyCreateResponse<T>,
  key: string,
): T {
  const value = response.data[key];

  if (!value) {
    throw new Error(`Twenty response did not include ${key}`);
  }

  return value;
}

async function createTwentyCompany(
  baseUrl: string,
  apiKey: string,
  data: LeadIntakeData,
  fields: TwentyFieldSet,
) {
  const result = await createTwentyRecord<{ id: string }>(
    baseUrl,
    apiKey,
    "companies",
    "createCompany",
    buildTwentyCompanyPayload(data, fields),
  );

  if (!result.ok || !result.record?.id) {
    console.warn("Twenty company sync skipped or failed", {
      company: data.company,
      result,
    });
    return undefined;
  }

  return result.record;
}

async function createTwentyOpportunity(
  baseUrl: string,
  apiKey: string,
  data: LeadIntakeData,
  companyId: string | undefined,
  personId: string,
  fields: TwentyFieldSet,
): Promise<TwentyCreateResult<{ id: string }>> {
  if (process.env.TWENTY_CREATE_OPPORTUNITIES === "false") {
    return {
      ok: false,
      error: "TWENTY_CREATE_OPPORTUNITIES=false",
    };
  }

  return createTwentyRecord<{ id: string }>(
    baseUrl,
    apiKey,
    "opportunities",
    "createOpportunity",
    buildTwentyOpportunityPayload(data, companyId, personId, fields),
  );
}

async function createTwentyRecord<T>(
  baseUrl: string,
  apiKey: string,
  objectNamePlural: string,
  responseKey: string,
  payload: Record<string, unknown>,
): Promise<TwentyCreateResult<T>> {
  const response = await fetch(
    `${trimSlash(baseUrl)}/rest/${objectNamePlural}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error: await readResponseError(response),
    };
  }

  const body = (await response.json()) as TwentyCreateResponse<T>;

  return {
    ok: true,
    status: response.status,
    record: unwrapTwentyCreate(body, responseKey),
  };
}

async function fetchTwentyFieldSets(
  baseUrl: string,
  apiKey: string,
): Promise<TwentyFieldSets> {
  if (process.env.TWENTY_SKIP_METADATA_PROBE === "true") {
    return { people: null, companies: null, opportunities: null };
  }

  const objects = await fetchTwentyMetadataObjects(baseUrl, apiKey);

  return {
    people: findTwentyFields(objects, "people"),
    companies: findTwentyFields(objects, "companies"),
    opportunities: findTwentyFields(objects, "opportunities"),
  };
}

async function fetchTwentyMetadataObjects(
  baseUrl: string,
  apiKey: string,
): Promise<unknown[]> {
  const endpoints = [
    "/rest/metadata/objects",
    "/metadata/objects",
    "/rest/metadata/objects?filter[namePlural][in][]=people&filter[namePlural][in][]=companies&filter[namePlural][in][]=opportunities",
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${trimSlash(baseUrl)}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) continue;

      const body = await response.json();
      const objects = extractTwentyObjects(body);

      if (objects.length > 0) {
        return objects;
      }
    } catch {
      continue;
    }
  }

  return [];
}

function extractTwentyObjects(body: unknown): unknown[] {
  if (!body || typeof body !== "object") return [];

  const record = body as Record<string, unknown>;
  const data = record.data;

  if (Array.isArray(data)) return data;
  if (Array.isArray(record.objects)) return record.objects;

  if (data && typeof data === "object") {
    const dataRecord = data as Record<string, unknown>;

    if (Array.isArray(dataRecord.objects)) return dataRecord.objects;

    const metadataObjects = dataRecord.metadataObjects;
    if (Array.isArray(metadataObjects)) return metadataObjects;
  }

  return [];
}

function findTwentyFields(objects: unknown[], objectNamePlural: string) {
  const metadata = objects.find((object) => {
    if (!object || typeof object !== "object") return false;

    const record = object as Record<string, unknown>;

    return (
      record.namePlural === objectNamePlural ||
      record.nameSingular === objectNamePlural.replace(/s$/, "") ||
      record.objectNamePlural === objectNamePlural
    );
  });

  if (!metadata || typeof metadata !== "object") return null;

  const fields = (metadata as Record<string, unknown>).fields;
  if (!Array.isArray(fields)) return null;

  const fieldNames = fields
    .map((field) => {
      if (!field || typeof field !== "object") return undefined;

      const record = field as Record<string, unknown>;
      const name = record.name ?? record.nameSingular ?? record.apiName;

      return typeof name === "string" ? name : undefined;
    })
    .filter((fieldName): fieldName is string => Boolean(fieldName));

  return fieldNames.length > 0 ? new Set(fieldNames) : null;
}

function buildTwentyCompanyPayload(
  data: LeadIntakeData,
  fields: TwentyFieldSet,
) {
  const payload = pickTwentyFields(
    {
      name: data.company,
      domainName: inferDomainFromEmail(data.email),
      accountType: "PROSPECT",
      businessLine: inferBusinessLine(data),
    },
    fields,
    ["name"],
  );

  return payload;
}

function buildTwentyPersonPayload(
  data: LeadIntakeData,
  companyId: string | undefined,
  fields: TwentyFieldSet,
) {
  return pickTwentyFields(
    {
      name: splitName(data.name),
      emails: {
        primaryEmail: data.email,
      },
      companyId,
      jobTitle: data.topic,
      linkedinLink: "",
      leadSource: "DAVID_MIELOCH",
      contactPriority: "NORMAL",
      newsletterOptIn: Boolean(data.newsletterOptIn),
    },
    fields,
    ["name", "emails", "companyId", "jobTitle"],
  );
}

function buildTwentyOpportunityPayload(
  data: LeadIntakeData,
  companyId: string | undefined,
  personId: string,
  fields: TwentyFieldSet,
) {
  return pickTwentyFields(
    {
      name: data.company
        ? `${data.company} - ${data.topic}`
        : `${data.name} - ${data.topic}`,
      companyId,
      pointOfContactId: personId,
      leadSource: "DAVID_MIELOCH",
      businessLine: inferBusinessLine(data),
      engagementType: inferEngagementType(data),
      urgency: "NORMAL",
      nextStep: "Reply within one business day and qualify the request.",
      qualificationNotes: formatMarkdownLead(data),
    },
    fields,
    ["name", "companyId", "pointOfContactId"],
  );
}

function pickTwentyFields(
  payload: Record<string, unknown>,
  fields: TwentyFieldSet,
  fallbackAllowedFields: string[],
) {
  const allowedFields = fields ?? new Set(fallbackAllowedFields);

  return Object.fromEntries(
    Object.entries(payload).filter(([key, value]) => {
      if (value === undefined || value === "") return false;

      return allowedFields.has(key);
    }),
  );
}

function inferDomainFromEmail(email: string) {
  const domain = email.split("@")[1];

  return domain ? { primaryLinkUrl: domain, primaryLinkLabel: domain } : null;
}

async function readResponseError(response: Response) {
  const body = await response.text();

  return body || response.statusText;
}

function splitName(name: string) {
  const parts = name.trim().split(/\s+/);
  const firstName = parts.shift() ?? name;
  const lastName = parts.join(" ");

  return {
    firstName,
    lastName,
  };
}

function inferBusinessLine(data: LeadIntakeData): BusinessLine {
  const text = `${data.topic} ${data.message}`.toLowerCase();

  if (text.includes("music") || text.includes("arranger")) {
    return "WE_LEARN_MUSIC";
  }

  if (
    text.includes("factory") ||
    text.includes("agent") ||
    text.includes("automation")
  ) {
    return "SINGULARITY_LABS";
  }

  return "DAVID_MIELOCH";
}

function inferEngagementType(data: LeadIntakeData): EngagementType {
  const text = `${data.topic} ${data.message}`.toLowerCase();

  if (text.includes("hosting") || text.includes("managed agent")) {
    return "MANAGED_AGENT_HOSTING";
  }

  if (text.includes("factory")) {
    return "FACTORY_DESIGN";
  }

  if (text.includes("music") || text.includes("arranger")) {
    return "MUSIC_AI_TOOLING";
  }

  if (text.includes("website") || text.includes("app")) {
    return "WEBSITE_APP_BUILD";
  }

  if (text.includes("retainer") || text.includes("support")) {
    return "RETAINER_SUPPORT";
  }

  return "AUTOMATION_CONSULTING";
}
