import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const DEFAULT_STYLE = [
  '1950s space western industrial noir',
  'dark chocolate software factory',
  'frontier astronomy',
  'brass machinery',
  'amber practical light',
  'restrained cyan signal lights',
  'cinematic but readable editorial illustration',
].join(', ');

const NEGATIVE_PROMPT = [
  'no words',
  'no logos',
  'no interface text',
  'no human faces in close-up',
  'no crowded collage',
  'no generic stock photo',
  'no blurry key subject',
  'no malformed hands',
].join(', ');

const CURATED_METAPHORS = {
  'the-ai-cost-rug-pull-isnt-a-bubble-its-a-filter': [
    'a black-hole sieve mounted inside a brass factory gate, only the strongest machine parts passing through',
    'a frontier refinery line where unstable prototype robots are filtered out by gravity wells',
    'a glowing cost pressure gauge welded to a chocolate-metal conveyor, needle near the red zone',
    'a small factory model outperforming a huge ornate machine under a desert observatory roof',
    'a final inspection gate labeled only by symbols, separating toys from production machinery',
  ],
  'the-ai-bill-you-cant-predict': [
    'an analog compute-meter spinning under a glass dome in a moonlit factory office',
    'a brass invoice machine printing endless blank paper into a canyon wind',
    'a star-map budget board made of gears, dials, and orbit lines without readable text',
    'a foreman desk with five levers connected to hidden pipes, each lever changing the meter',
    'a frontier weather station forecasting compute storms over a dark factory town',
  ],
  'the-most-valuable-ai-skill-isnt-prompting': [
    'a watchtower observer spotting repeated patterns across factory rails before the crew notices',
    'a prompt scroll being replaced by steel rails and reusable machine jigs',
    'a signal scout marking useful anomalies on a brass map table inside a control room',
    'a workshop wall where clever one-off tricks become labeled tools, rendered without readable text',
    'a quiet operator noticing the machine rhythm while robots keep working in the background',
  ],
  'the-credibility-problem-with-ai-corporate-communications': [
    'an empty podium wired to a beautiful automatic speech machine, audience silhouettes skeptical',
    'a polished broadcast mask hanging beside a human signature stamp in a factory office',
    'a trust ledger as a brass scale, one side holding automation, the other holding accountability',
    'a message capsule leaving a machine room but losing its shadow before reaching people',
    'a frontier town bulletin board with unsigned machine-made announcements, no readable words',
  ],
  'the-crew-seed': [
    'three specialized workstations in a compact factory control room, each with a distinct glowing role signal',
    'a seed crystal becoming a crew map inside a glass dome on a brass lab bench',
    'temporary role badges hanging on hooks beside reusable factory tools',
    'a radio tower coordinating multiple small work bays across a chocolate-colored industrial frontier',
    'a wide factory floor run by a small visible command crew and many unseen automated lines',
  ],
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, payload) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`);
}

function parseMarkdown(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const frontmatter = raw.match(/^---\n([\s\S]*?)\n---\n\n?/);
  const body = frontmatter ? raw.slice(frontmatter[0].length).trim() : raw.trim();
  const title = raw.match(/^title:\s*(.+)$/m)?.[1]?.replace(/^["']|["']$/g, '') ?? '';
  const description = raw.match(/^description:\s*(.+)$/m)?.[1]?.replace(/^["']|["']$/g, '') ?? '';
  return { body, title, description };
}

function extractSections(body) {
  const matches = [...body.matchAll(/^##\s+(.+)$/gm)];
  if (matches.length === 0) return [];

  return matches.map((match, index) => {
    const start = match.index ?? 0;
    const next = matches[index + 1]?.index ?? body.length;
    const rawSection = body.slice(start, next).replace(/^##\s+.+\n/, '').trim();
    const excerpt = rawSection
      .replace(/[#*_>`]/g, '')
      .replace(/\s+/g, ' ')
      .slice(0, 260);
    return {
      heading: match[1].trim(),
      excerpt,
    };
  });
}

function pickPlacements(sections, count) {
  if (sections.length <= count) return sections;
  const selected = [];
  const step = (sections.length - 1) / (count - 1);
  for (let index = 0; index < count; index += 1) {
    selected.push(sections[Math.round(index * step)]);
  }
  return selected;
}

function checksum(value) {
  return crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
}

function variantPrompt({ title, section, metaphor, style, variantIndex }) {
  const composition = variantIndex === 0
    ? 'medium-wide editorial frame with one clear focal metaphor and breathing room'
    : 'alternate angle, stronger foreground silhouette, same visual language and subject';

  return [
    `${style}.`,
    `Article: "${title}".`,
    `Section: "${section.heading}".`,
    `Illustrate: ${metaphor}.`,
    `Composition: ${composition}.`,
    'Use cinematic lighting, crisp focal subject, magazine-quality article interior art.',
    `Avoid: ${NEGATIVE_PROMPT}.`,
  ].join(' ');
}

function buildArticlePlan({ slug, articlePath, countPerArticle, variantsPerPlacement, style }) {
  const article = parseMarkdown(articlePath);
  const sections = pickPlacements(extractSections(article.body), countPerArticle);
  const metaphors = CURATED_METAPHORS[slug] ?? [];
  const placements = sections.map((section, placementIndex) => {
    const metaphor = metaphors[placementIndex] ?? `a visual metaphor for "${section.heading}" inside the factory`;
    const id = `inline-${String(placementIndex + 1).padStart(2, '0')}`;
    const variants = Array.from({ length: variantsPerPlacement }, (_, variantIndex) => {
      const variantId = `${id}-v${variantIndex + 1}`;
      const prompt = variantPrompt({
        title: article.title,
        section,
        metaphor,
        style,
        variantIndex,
      });
      return {
        id: variantId,
        status: 'needs-generation',
        prompt,
        promptChecksum: checksum({ slug, variantId, prompt }),
      };
    });
    return {
      id,
      status: 'needs-generation',
      target: {
        afterHeading: section.heading,
        aspectRatio: '16:9',
        role: 'article-interior',
      },
      altText: `${article.title}: ${section.heading}`,
      captionSeed: metaphor,
      sectionExcerpt: section.excerpt,
      variants,
    };
  });

  return {
    slug,
    title: article.title,
    description: article.description,
    style,
    negativePrompt: NEGATIVE_PROMPT,
    targetApprovedImages: placements.length,
    candidateVariants: placements.reduce((total, placement) => total + placement.variants.length, 0),
    placements,
  };
}

function imageBriefMarkdown(articlePlan) {
  const lines = [
    `# Interior Image Brief: ${articlePlan.title}`,
    '',
    `Slug: \`${articlePlan.slug}\``,
    '',
    `Style: ${articlePlan.style}`,
    '',
    `Target: approve ${articlePlan.targetApprovedImages} article-body images from ${articlePlan.candidateVariants} generated candidates.`,
    '',
    'Negative prompt:',
    '',
    `> ${articlePlan.negativePrompt}`,
    '',
  ];

  for (const placement of articlePlan.placements) {
    lines.push(`## ${placement.id} - after "${placement.target.afterHeading}"`);
    lines.push('');
    lines.push(`Caption seed: ${placement.captionSeed}`);
    lines.push('');
    lines.push(`Alt text: ${placement.altText}`);
    lines.push('');
    for (const variant of placement.variants) {
      lines.push(`### ${variant.id}`);
      lines.push('');
      lines.push(variant.prompt);
      lines.push('');
    }
  }

  return `${lines.join('\n')}\n`;
}

export function buildInteriorImagePlan({
  launchPlan,
  articlesRoot,
  outputPath,
  countPerArticle = 5,
  variantsPerPlacement = 2,
  style = DEFAULT_STYLE,
  write = false,
  generatedAt = new Date().toISOString(),
}) {
  const articles = (launchPlan.articles ?? []).map((entry) => {
    const slug = entry.slug;
    const articlePath = path.join(articlesRoot, slug, 'index.md');
    const plan = buildArticlePlan({
      slug,
      articlePath,
      countPerArticle,
      variantsPerPlacement,
      style,
    });
    return {
      ...plan,
      releaseTarget: entry.releaseTarget,
      heroImage: entry.heroImage,
      imageBriefPath: `content/articles/${slug}/image-brief.md`,
      articleImagePlanPath: `content/articles/${slug}/images/interior-plan.json`,
    };
  });

  const plan = {
    schemaVersion: 'interior-image-plan-v1',
    generatedAt,
    strategy: {
      goal: 'Generate article-body art, not hero art, for the next Factory Primitives release batch.',
      reviewSurface: '/draft-lab',
      approvedImageTarget: articles.reduce((total, article) => total + article.targetApprovedImages, 0),
      candidateVariantTarget: articles.reduce((total, article) => total + article.candidateVariants, 0),
      approvalRule: 'David approves one variant per placement before assets are copied into the public article.',
      spendRule: 'Generation commands must require explicit --spend-approved.',
    },
    articles,
    observation: {
      claim: 'Factory Primitives interior art has a deterministic review queue before paid generation.',
      status: 'PASS',
      fallbackChain: [
        'content/distribution/factory-primitives-interior-image-plan.json',
        'content/articles/<slug>/image-brief.md',
        'ROM heartbeat',
      ],
    },
  };

  if (write) {
    if (!outputPath) throw new Error('buildInteriorImagePlan write=true requires outputPath.');
    writeJson(outputPath, plan);
    for (const article of articles) {
      const articleRoot = path.join(articlesRoot, article.slug);
      fs.mkdirSync(path.join(articleRoot, 'images'), { recursive: true });
      fs.writeFileSync(path.join(articleRoot, 'image-brief.md'), imageBriefMarkdown(article));
      writeJson(path.join(articleRoot, 'images', 'interior-plan.json'), article);
    }
  }

  return plan;
}
