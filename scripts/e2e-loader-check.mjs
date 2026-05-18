import fs from 'node:fs/promises';

import puppeteer from 'puppeteer';

const baseUrl = (process.env.E2E_BASE_URL || 'http://127.0.0.1:3001').replace(/\/+$/, '');
const screenshotDir = process.env.E2E_SCREENSHOT_DIR || '.brain/e2e-loader-check';
const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || await findChromeExecutable();

const pages = [
  {
    name: 'blog',
    path: '/blog',
    heading: 'Field notes from AI-native software work.',
  },
  {
    name: 'article',
    path: '/blog/your-ai-isnt-hallucinating-its-lying',
    heading: "Your AI Isn't Hallucinating. It's Lying.",
  },
];

const viewports = [
  { name: 'desktop', width: 1280, height: 720, isMobile: false },
  { name: 'mobile', width: 390, height: 844, isMobile: true },
];

const failures = [];

await fs.mkdir(screenshotDir, { recursive: true });

const browser = await puppeteer.launch({
  headless: 'new',
  executablePath,
  args: ['--disable-gpu', '--no-sandbox'],
});

try {
  const page = await browser.newPage();

  for (const viewport of viewports) {
    await page.setViewport({
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
      isMobile: viewport.isMobile,
    });

    for (const target of pages) {
      await visitAndAssert(page, viewport.name, target);
    }
  }

  await assertBlogArticleNavigation(page);
} finally {
  await browser.close();
}

if (failures.length > 0) {
  console.error(JSON.stringify({ ok: false, baseUrl, failures }, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({ ok: true, baseUrl, checkedPages: pages.length, viewports: viewports.length }, null, 2));
}

async function visitAndAssert(page, viewportName, target) {
  const url = `${baseUrl}${target.path}`;
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30_000 });
  await waitForHydratedPage(page, target.heading);

  const screenshotPath = `${screenshotDir}/${viewportName}-${target.name}.png`;
  await page.screenshot({ path: screenshotPath, fullPage: false });

  const result = await page.evaluate((expectedHeading) => {
    const text = document.body.textContent || '';
    const heading = document.querySelector('h1')?.textContent?.trim() || null;
    const visibleLoading = hasVisibleExactText('Loading page...');
    const visibleContentLoading = hasVisibleExactText('Loading content...');
    const visibleTour = hasVisibleText('Dual Audio Experience') || hasVisibleText('Audio Experience');
    const frameworkOverlay = hasVisibleText('Unhandled Runtime Error')
      || hasVisibleText('Build Error')
      || hasVisibleText('Application error');

    return {
      title: document.title,
      heading,
      hasExpectedHeading: heading === expectedHeading,
      hasMeaningfulBody: text.includes(expectedHeading),
      visibleLoading,
      visibleContentLoading,
      visibleTour,
      frameworkOverlay,
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 2,
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    };

    function hasVisibleText(value) {
      return Array.from(document.querySelectorAll('body *')).some((element) => {
        if (!element.textContent?.includes(value)) return false;
        return isVisible(element);
      });
    }

    function hasVisibleExactText(value) {
      return Array.from(document.querySelectorAll('body *')).some((element) => {
        if (element.textContent?.trim() !== value) return false;
        return isVisible(element);
      });
    }

    function isVisible(element) {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== 'none'
        && style.visibility !== 'hidden'
        && Number(style.opacity) !== 0
        && rect.width > 0
        && rect.height > 0;
    }
  }, target.heading);

  const pageFailures = [];
  if (!result.hasExpectedHeading || !result.hasMeaningfulBody) {
    pageFailures.push(`expected heading "${target.heading}" was not the visible h1`);
  }
  if (result.visibleLoading || result.visibleContentLoading) {
    pageFailures.push('loader text remains visible after hydration');
  }
  if (result.visibleTour) {
    pageFailures.push('audio tour onboarding remains visible');
  }
  if (result.frameworkOverlay) {
    pageFailures.push('framework error overlay is visible');
  }
  if (result.horizontalOverflow) {
    pageFailures.push(`horizontal overflow: scrollWidth ${result.scrollWidth}, viewport ${result.innerWidth}`);
  }

  if (pageFailures.length > 0) {
    failures.push({
      viewport: viewportName,
      page: target.name,
      url,
      screenshotPath,
      result,
      pageFailures,
    });
  }
}

async function assertBlogArticleNavigation(page) {
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });
  await page.goto(`${baseUrl}/blog`, { waitUntil: 'networkidle2', timeout: 30_000 });
  await waitForHydratedPage(page, pages[0].heading);

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30_000 }),
    page.click('a[href="/blog/your-ai-isnt-hallucinating-its-lying"]'),
  ]);
  await waitForHydratedPage(page, pages[1].heading);

  const result = await page.evaluate(() => ({
    url: location.pathname,
    visibleLoading: Array.from(document.querySelectorAll('body *')).some((element) => {
      if (element.textContent?.trim() !== 'Loading page...') return false;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
    }),
    heading: document.querySelector('h1')?.textContent?.trim() || null,
  }));

  if (result.url !== '/blog/your-ai-isnt-hallucinating-its-lying' || result.visibleLoading || result.heading !== pages[1].heading) {
    failures.push({
      viewport: 'desktop',
      page: 'blog-to-article-navigation',
      result,
      pageFailures: ['blog article click did not settle on a readable article page'],
    });
  }
}

async function waitForHydratedPage(page, heading) {
  await page.waitForFunction((expectedHeading) => {
    const h1 = document.querySelector('h1')?.textContent?.trim();
    const hasLoader = Array.from(document.querySelectorAll('body *')).some((element) => {
      if (element.textContent?.trim() !== 'Loading page...') return false;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
    });

    return h1 === expectedHeading && !hasLoader;
  }, { timeout: 10_000 }, heading);
}

async function findChromeExecutable() {
  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
  ];

  for (const candidate of candidates) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // Try the next well-known browser path.
    }
  }

  return undefined;
}
