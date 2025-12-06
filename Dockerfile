FROM oven/bun:1.3-alpine AS base

WORKDIR /app

FROM base AS deps

COPY package.json bun.lockb* ./

RUN bun install --production --frozen-lockfile

FROM base AS builder

ARG DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy?schema=public"
ENV DATABASE_URL=$DATABASE_URL

COPY package.json bun.lockb* ./

RUN bun install --frozen-lockfile

COPY . .

RUN bunx prisma generate

FROM oven/bun:1.3-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 bunuser

COPY --from=deps --chown=bunuser:nodejs /app/node_modules ./node_modules

COPY --from=builder --chown=bunuser:nodejs /app/src/generated ./src/generated

COPY --chown=bunuser:nodejs prisma ./prisma
COPY --chown=bunuser:nodejs prisma.config.ts ./
COPY --chown=bunuser:nodejs src ./src
COPY --chown=bunuser:nodejs package.json ./

USER bunuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD bun run -e 'fetch("http://localhost:3000/health").then(r => r.ok ? process.exit(0) : process.exit(1)).catch(() => process.exit(1))'

CMD ["bun", "run", "src/main.ts"]
