FROM node:22.11.0-bookworm-slim

ENV NEXT_TELEMETRY_DISABLED=1 \
    PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

RUN apt-get update \
    && apt-get install --yes --no-install-recommends chromium curl dumb-init \
    && rm -rf /var/lib/apt/lists/* \
    && npm install --global pnpm@9.15.9 \
    && groupadd --system --gid 10001 app \
    && useradd --system --uid 10001 --gid app --home-dir /app app \
    && install --directory --owner=app --group=app /app

WORKDIR /app

COPY --chown=app:app package.json pnpm-lock.yaml ./

USER app

RUN pnpm install --frozen-lockfile

COPY --chown=app:app . ./
RUN pnpm run build \
    && pnpm prune --prod --ignore-scripts

ENV NODE_ENV=production

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["pnpm", "start"]
