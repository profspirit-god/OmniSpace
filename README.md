# OmniSpace
A personal, modular productivity app. Mobile first. Free tools only.
Live: https://profspirit-god.github.io/OmniSpace/

## INDEX
- SECTION: Run locally
- SECTION: Deploy
- SECTION: Project map
- SECTION: For AIs

## SECTION: Run locally
Requires Node 20+ and Git. In Windows PowerShell, in the project folder:
1. `npm.cmd install` (about 1 to 4 minutes; deprecation and audit warnings are normal)
2. `npm.cmd run build` (should end with "built in ..s")
3. `npm.cmd run dev` and open the printed link (usually http://localhost:5173); stop with Ctrl+C
If PowerShell blocks `npm`, keep using `npm.cmd`.

## SECTION: Deploy
Push to main. GitHub Settings, Pages, Source: GitHub Actions. The workflow in .github/workflows builds and publishes. Full git steps: docs/GIT_WORKFLOW.md.

## SECTION: Project map
src/core (registry, types), src/modules (one folder per feature, sub-features inside), src/components (shared UI), src/styles/theme.css (design tokens), docs (everything else; start at docs/README.md).

## SECTION: For AIs
Read AI_INSTRUCTIONS.md first. It is the source of truth. Then docs/STATE.md.
