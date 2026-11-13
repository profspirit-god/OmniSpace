# docs/GIT_WORKFLOW.md (GIT AND DEPLOY)
Rank: below AI_INSTRUCTIONS.md. Owner uses Windows PowerShell and VS Code. Replace <branch>, <name> and the commit message in every block.

## INDEX
- SECTION: Branch model - what each branch is for
- SECTION: Naming - branches and commit messages
- SECTION: Rules - what never to do
- SECTION: Block A - start a feature
- SECTION: Block B - end of every work section (save and push)
- SECTION: Block C - apply an AI-delivered zip
- SECTION: Block D - finish a feature (merge to development)
- SECTION: Block E - release (development to main, goes live)
- SECTION: Block F - hotfix
- SECTION: Block G - recovery and undo
- SECTION: Deploy - how main becomes the live site
- SECTION: Common problems - errors and fixes

## SECTION: Branch model
- main: the live app. Deploys automatically on every push. Only receives merges from development (or a hotfix).
- development: integration branch. Features merge here first.
- feature/<name>, fix/<name>, docs/<name>: short-lived branches created from development.
- Tiny safe changes (a typo, one doc line) may be committed directly to development if the build passes.

## SECTION: Naming
Branches: lowercase, kebab-case, for example feature/shopping-lists, fix/nav-drawer, docs/foundation.
Commits: type(scope): summary, imperative, under 72 characters, no emoji.
Types: feat, fix, docs, style, refactor, chore.
Examples: feat(shopping): add reusable list templates; fix(data): rename reserved-word variables; docs: add architecture doc.

## SECTION: Rules
- Never commit .env or any secret.
- Never force-push (git push --force), especially to main.
- Never use git reset --hard or delete branches unless the owner explicitly approves.
- Run `npm.cmd run build` before committing code changes; a failing build never goes to main.
- One purpose per commit and per branch.
- After a merge to main, switch back to development.

## SECTION: Block A - start a feature
```powershell
cd C:\Users\Admin\Documents\Projects\OmniSpace
git checkout development
git pull
git checkout -b feature/<name>
git branch --show-current
```
Expected: the last line prints feature/<name>.

## SECTION: Block B - end of every work section (save and push)
```powershell
cd C:\Users\Admin\Documents\Projects\OmniSpace
git branch --show-current
git status
npm.cmd run build
git add .
git status
git commit -m "type(scope): summary"
git push -u origin HEAD
```
Expected: build ends with "built in ..s"; the second `git status` shows files under "Changes to be committed"; push prints the branch name. Stop and report if the build shows errors.

## SECTION: Block C - apply an AI-delivered zip
Rule for AIs: a delivery zip stores files at repo-relative paths with no wrapper folder, so it extracts straight into the repo root.
```powershell
cd C:\Users\Admin\Documents\Projects\OmniSpace
git branch --show-current
Expand-Archive -Force -Path "$HOME\Downloads\<zipname>.zip" -DestinationPath .
git status
```
Expected: git status lists the changed files. Caveats: extraction overwrites files but does not delete files the AI removed; close the dev server first (running `npm run dev` can lock files); after extracting, continue with Block B.

## SECTION: Block D - finish a feature (merge to development)
```powershell
cd C:\Users\Admin\Documents\Projects\OmniSpace
git checkout feature/<name>
git status
git checkout development
git pull
git merge feature/<name>
npm.cmd run build
git push
```
Expected: merge prints a file summary; build passes; push succeeds. If the merge reports a conflict, go to Block G.

## SECTION: Block E - release (goes live)
```powershell
cd C:\Users\Admin\Documents\Projects\OmniSpace
git checkout development
git pull
npm.cmd run build
git checkout main
git pull
git merge development
git push
git checkout development
```
Then watch the Actions tab for a green check and open https://profspirit-god.github.io/OmniSpace/. Optional release tag (PROPOSED): `git tag v0.1.1` then `git push origin v0.1.1`.

## SECTION: Block F - hotfix
Use only when the live site is broken.
```powershell
cd C:\Users\Admin\Documents\Projects\OmniSpace
git checkout main
git pull
git checkout -b fix/<name>
```
Make the fix, run Block B, then merge into main (Block E steps but merge fix/<name> instead of development), then merge main into development so the fix is not lost:
```powershell
git checkout development
git merge main
git push
```

## SECTION: Block G - recovery and undo
- Check where you are: `git status` and `git branch --show-current`.
- Merge conflict, want to back out: `git merge --abort`.
- Undo the last commit but keep the changes (not pushed yet): `git reset --soft HEAD~1`.
- Discard changes in one file (cannot be undone): `git restore <file>` - ask the owner first.
- Committed to the wrong branch (not pushed): note the commit with `git log --oneline -3`, then ask for help before moving it.
- Anything else: stop, do not guess, paste the output to the AI or owner.

## SECTION: Deploy
Push to main triggers .github/workflows/deploy.yml (build, then publish to GitHub Pages). Pages source must be GitHub Actions (Settings, Pages). Pushes to development or feature branches never change the live site. Manual run: Actions tab, Deploy main to GitHub Pages, Run workflow, branch main.

## SECTION: Common problems
- "running scripts is disabled": use `npm.cmd`, or run `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`.
- "nothing to commit": already saved; continue.
- "rejected, fetch first" on push: run `git pull`, rebuild, push again.
- Build fails in Actions but passes locally: compare Node versions; copy the first red error from the failed step.
- Site 404 after deploy: wait a minute, check Pages source, re-run the workflow.
- Actions warnings about Node 20 or the Ubuntu runner: harmless notices; track in STATE.md.
