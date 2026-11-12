# OmniSpace
A personal, modular productivity app. Mobile first. Free tools only.

## SECTION: Run locally
Requires Node 20+.
```
npm install
npm run dev
```

## SECTION: Deploy
Push to `main`. In GitHub: Settings > Pages > Source: GitHub Actions. The workflow in `.github/workflows` builds and publishes.

## SECTION: Structure
`src/core` registry and types, `src/modules` one folder per feature (sub-features inside), `src/components` shared UI, `src/styles/theme.css` design tokens, `docs` history and proposals.

## SECTION: For AIs
Read `AI_INSTRUCTIONS.md` first. It is the source of truth.
