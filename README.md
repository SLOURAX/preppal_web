# Preppal Web

Learner-facing Next.js application for Preppal. It uses the App Router, TypeScript, Tailwind CSS, TanStack Query for server state, Zustand for cross-feature client state, and `next-themes` for light/dark/system themes.

## Run locally

```bash
cp .env.example .env.local
bun install
bun dev
```

The app runs at `http://localhost:3000` and expects the API at `http://localhost:4000` by default.

## Source layout

```text
src/
├── app/          # Routes, layouts, global theme tokens
├── components/   # Shared UI and layout primitives
├── config/       # Validated/runtime application configuration
├── constants/    # Stable application constants
├── features/     # Vertical product features and their API/hooks/UI
├── lib/          # Framework-agnostic clients and utilities
├── providers/    # React application providers
├── store/        # Shared Zustand state
└── types/        # Shared TypeScript contracts
```

## Quality checks

```bash
bun run lint
bun run typecheck
bun run build
```
