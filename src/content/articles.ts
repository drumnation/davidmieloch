import { existsSync, readdirSync, readFileSync } from "fs";
import { join } from "path";

export type Article = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  publishedYear: number;
  era: ContentEra;
  updatedAt?: string;
  status: "published" | "draft" | "archived";
  canonicalUrl: string;
  sourcePlatform?: string;
  sourceUrl?: string;
  series?: string;
  tags: string[];
  channels: string[];
  commercialSummary?: string;
  commercialConcept?: string;
  singularityLabsCta?: string;
  coverImage?: string;
  body: string;
};

export type ContentEra = {
  year: number;
  label: string;
  shortLabel: string;
  description: string;
};

type FrontmatterValue = string | string[];
type Frontmatter = Record<string, FrontmatterValue>;

const SITE_URL = "https://davidmieloch.com";
const ARTICLES_DIRECTORY =
  process.env.CONTENT_ARTICLES_ROOT ??
  join(process.cwd(), "content", "articles");
const ERA_BY_YEAR: Record<number, Omit<ContentEra, "year">> = {
  2026: {
    label: "Factory era",
    shortLabel: "Factory",
    description:
      "Agents, governance, dark factories, and the shift from AI assistance to AI-operated systems.",
  },
  2025: {
    label: "Transition era",
    shortLabel: "Transition",
    description:
      "A year of AI transformation, workflow experiments, and the last bridge from prompt craft to factory thinking.",
  },
  2024: {
    label: "AI team era",
    shortLabel: "AI teams",
    description:
      "Early field notes on working with AI as a team member inside practical software work.",
  },
  2023: {
    label: "Engineering notes",
    shortLabel: "Engineering",
    description:
      "Older engineering writing from before the factory thesis took over the brand.",
  },
};

function parseArray(value: string): string[] {
  const trimmed = value.trim();

  if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) {
    return [];
  }

  const body = trimmed.slice(1, -1).trim();

  if (!body) {
    return [];
  }

  return body
    .split(",")
    .map((item) => parseScalar(item.trim()))
    .filter((item) => item.length > 0);
}

function parseScalar(value: string): string {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function parseFrontmatterValue(value: string): FrontmatterValue {
  const trimmed = value.trim();

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return parseArray(trimmed);
  }

  return parseScalar(trimmed);
}

function parseMarkdownFile(markdown: string): {
  frontmatter: Frontmatter;
  body: string;
} {
  if (!markdown.startsWith("---\n")) {
    throw new Error("Article markdown must start with YAML frontmatter.");
  }

  const endIndex = markdown.indexOf("\n---", 4);

  if (endIndex === -1) {
    throw new Error(
      "Article markdown frontmatter is missing its closing delimiter.",
    );
  }

  const rawFrontmatter = markdown.slice(4, endIndex);
  const body = markdown
    .slice(endIndex + 4)
    .replace(/^\s*\n/, "")
    .trim();

  const frontmatter = rawFrontmatter
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"))
    .reduce<Frontmatter>((metadata, line) => {
      const separatorIndex = line.indexOf(":");

      if (separatorIndex === -1) {
        return metadata;
      }

      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1);

      metadata[key] = parseFrontmatterValue(value);
      return metadata;
    }, {});

  return { frontmatter, body };
}

function requiredString(
  frontmatter: Frontmatter,
  key: string,
  slug: string,
): string {
  const value = frontmatter[key];

  if (typeof value !== "string" || value.length === 0) {
    throw new Error(
      `Article "${slug}" is missing required frontmatter field "${key}".`,
    );
  }

  return value;
}

function optionalString(
  frontmatter: Frontmatter,
  key: string,
): string | undefined {
  const value = frontmatter[key];

  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export function getContentEra(publishedAt: string): ContentEra {
  const year = new Date(publishedAt).getUTCFullYear();
  const era = ERA_BY_YEAR[year] ?? {
    label: "Earlier archive",
    shortLabel: "Archive",
    description:
      "Earlier writing kept for context, chronology, and the visible evolution of the work.",
  };

  return {
    year,
    ...era,
  };
}

function parseStatus(
  frontmatter: Frontmatter,
  slug: string,
): Article["status"] {
  const status = requiredString(frontmatter, "status", slug);

  if (status === "published" || status === "draft" || status === "archived") {
    return status;
  }

  throw new Error(`Article "${slug}" has unsupported status "${status}".`);
}

function readArticle(rootDirectory: string, slug: string): Article {
  const markdown = readFileSync(join(rootDirectory, slug, "index.md"), "utf8");
  const { frontmatter, body } = parseMarkdownFile(markdown);
  const tags = frontmatter.tags;
  const channels = frontmatter.channels;

  const publishedAt = requiredString(frontmatter, "publishedAt", slug);
  const era = getContentEra(publishedAt);

  return {
    slug,
    title: requiredString(frontmatter, "title", slug),
    description: requiredString(frontmatter, "description", slug),
    publishedAt,
    publishedYear: era.year,
    era,
    updatedAt: optionalString(frontmatter, "updatedAt"),
    status: parseStatus(frontmatter, slug),
    canonicalUrl: requiredString(frontmatter, "canonicalUrl", slug),
    sourcePlatform: optionalString(frontmatter, "sourcePlatform"),
    sourceUrl: optionalString(frontmatter, "sourceUrl"),
    series: optionalString(frontmatter, "series"),
    tags: Array.isArray(tags) ? tags : [],
    channels: Array.isArray(channels) ? channels : [],
    commercialSummary: optionalString(frontmatter, "commercialSummary"),
    commercialConcept: optionalString(frontmatter, "commercialConcept"),
    singularityLabsCta: optionalString(frontmatter, "singularityLabsCta"),
    coverImage: optionalString(frontmatter, "coverImage"),
    body,
  };
}

export function getAllArticles(): Article[] {
  return loadArticlesFromDirectory(ARTICLES_DIRECTORY);
}

function loadArticlesFromDirectory(rootDirectory: string): Article[] {
  if (!existsSync(rootDirectory)) {
    return [];
  }

  return readdirSync(rootDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => existsSync(join(rootDirectory, entry.name, "index.md")))
    .map((entry) => readArticle(rootDirectory, entry.name))
    .sort((left, right) => {
      return Date.parse(right.publishedAt) - Date.parse(left.publishedAt);
    });
}

export function getPublishedArticles(): Article[] {
  return getAllArticles().filter((article) => article.status === "published");
}

export function getPublishedArticle(slug: string): Article | undefined {
  return getPublishedArticles().find((article) => article.slug === slug);
}

export function getSingularityLabsFieldNotes(): Article[] {
  return getPublishedArticles().filter((article) =>
    article.channels.includes("singularity-labs"),
  );
}

export function getSiteUrl(): string {
  return SITE_URL;
}
