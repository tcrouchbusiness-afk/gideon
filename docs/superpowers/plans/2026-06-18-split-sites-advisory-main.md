# Split Repo Into Two Sites — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the single `gideon` Vercel project into two independent sites — `apps/main` (cybersecurity SPA → thegideoncorp.com) and `apps/advisory` (static consulting site → advisory.thegideoncorp.com) — and fix the main site's deep-link 404.

**Architecture:** One Git repo, two Vercel projects via per-project Root Directory. `apps/advisory` is pure static HTML with the consulting page as its root; `apps/main` is the existing Vite SPA, moved into a subfolder and cleaned of consulting code. Migration is ordered so neither live site goes down: both keep serving the current deployment until the new advisory project is verified and the domain is moved, then the main project is rebuilt last.

**Tech Stack:** Vite + React + react-router-dom (main), static HTML (advisory), Vercel (`vercel.json` redirects/rewrites, per-project Root Directory).

## Global Constraints

- Repo reorg happens on a branch named `split-sites`; do not push to `main` until Task 6.
- Preserve git history on moves: use `git mv` for tracked files.
- Advisory internal references must use root-absolute paths with the substring `/consulting/assets/` replaced by `/assets/` — no other path edits.
- Consulting/work/wraith content is **not** modified beyond that path replacement.
- Redirects start **temporary (307)** during validation; promote to **permanent (308)** only in the final task after end-to-end verification.
- Advisory domain: `advisory.thegideoncorp.com`. New Vercel project name: `gideon-advisory`. Existing project: `gideon` (id `prj_fyrFnq23TnHTpGLW43lDOUl6V6oJ`, team `team_tz0zfFUf8uZlHNvo5EhfsOtf`).
- Verification commands run from the repo root unless stated otherwise. Use the Bash tool (git-bash).

---

### Task 1: Carve out `apps/advisory` (the static consulting site)

**Files:**
- Create dir: `apps/advisory/`
- Move: `public/consulting/index.html` → `apps/advisory/index.html`
- Move: `public/consulting/assets/` → `apps/advisory/assets/`
- Move: `public/work/` → `apps/advisory/work/`
- Move: `public/wraith/` → `apps/advisory/wraith/`
- Create: `apps/advisory/vercel.json`

**Interfaces:**
- Produces: a self-contained static site rooted at `apps/advisory/` where `index.html` is the consulting page and all internal asset references resolve at `/assets/...`, `/work/...`, `/wraith/...`.

- [ ] **Step 1: Create the branch and the advisory directory**

```bash
git checkout -b split-sites
mkdir -p apps/advisory
```

- [ ] **Step 2: Move the consulting files (preserving history)**

```bash
git mv public/consulting/index.html apps/advisory/index.html
git mv public/consulting/assets apps/advisory/assets
git mv public/work apps/advisory/work
git mv public/wraith apps/advisory/wraith
# public/consulting is now empty; remove if it lingers
rmdir public/consulting 2>/dev/null || true
```

- [ ] **Step 3: Fix the internal asset paths (the only content edit)**

```bash
# Replace every /consulting/assets/ reference with /assets/ across the advisory site
grep -rIl '/consulting/assets/' apps/advisory | while read -r f; do
  sed -i 's#/consulting/assets/#/assets/#g' "$f"
done
```

- [ ] **Step 4: Verify NO stale `/consulting/` references remain**

```bash
grep -rIn '/consulting/' apps/advisory; echo "exit=$?"
```
Expected: no matches, `exit=1` (grep found nothing).

- [ ] **Step 5: Verify the structure and that assets exist**

```bash
test -f apps/advisory/index.html && echo "index ok"
test -f apps/advisory/assets/logo.svg && echo "logo ok"
ls apps/advisory/work
test -f apps/advisory/wraith/index.html && echo "wraith ok"
```
Expected: `index ok`, `logo ok`, the demo folders listed (`demand-map isr kill-chain link-budget mro-analysis wind-tunnel` + `index.html`), `wraith ok`.

- [ ] **Step 6: Confirm the consulting page is the root document**

```bash
grep -oiE '<title>[^<]*' apps/advisory/index.html | head -1
```
Expected: `<title>The Gideon Corp. — Consulting · Own your systems. Move at mission speed.`

- [ ] **Step 7: Create `apps/advisory/vercel.json`**

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "redirects": [
    { "source": "/consulting", "destination": "/", "permanent": false },
    { "source": "/consulting/:path*", "destination": "/:path*", "permanent": false }
  ]
}
```

- [ ] **Step 8: Optional local smoke test (static server)**

```bash
( cd apps/advisory && python -m http.server 8099 >/dev/null 2>&1 & echo $! > /tmp/adv.pid )
sleep 1
curl -s -o /dev/null -w 'root=%{http_code}\n' http://localhost:8099/
curl -s -o /dev/null -w 'work=%{http_code}\n' http://localhost:8099/work/
curl -s -o /dev/null -w 'wraith=%{http_code}\n' http://localhost:8099/wraith/
curl -s -o /dev/null -w 'logo=%{http_code}\n' http://localhost:8099/assets/logo.svg
kill "$(cat /tmp/adv.pid)" 2>/dev/null || true
```
Expected: all `200` (note: python's server needs trailing slashes; Vercel `cleanUrls` handles the no-slash form in production).

- [ ] **Step 9: Commit**

```bash
git add apps/advisory
git commit -m "refactor: extract consulting site into apps/advisory (consulting page at root)"
```

---

### Task 2: Move the main SPA into `apps/main` and de-consulting it

**Files:**
- Move into `apps/main/`: `src/`, `public/` (now without consulting/work/wraith), `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `package.json`, `package-lock.json`
- Delete: `src/pages/Consulting.tsx` (becomes `apps/main/src/pages/Consulting.tsx`, then removed)
- Modify: `apps/main/src/App.tsx` (remove the `/consulting` route + import)
- Create: `apps/main/vercel.json`
- Delete: root `vercel.json`

**Interfaces:**
- Consumes: `apps/advisory` already exists (Task 1), so `public/` no longer contains consulting/work/wraith.
- Produces: a buildable Vite app at `apps/main/` with `npm run build` → `apps/main/dist/`, no `/consulting` route, and a `vercel.json` carrying the SPA rewrite + old-URL redirects to advisory.

- [ ] **Step 1: Create `apps/main` and move the app files**

```bash
mkdir -p apps/main
git mv src apps/main/src
git mv public apps/main/public
git mv index.html apps/main/index.html
git mv vite.config.ts apps/main/vite.config.ts
git mv tsconfig.json apps/main/tsconfig.json
git mv tsconfig.app.json apps/main/tsconfig.app.json
git mv tsconfig.node.json apps/main/tsconfig.node.json
git mv package.json apps/main/package.json
git mv package-lock.json apps/main/package-lock.json
```

- [ ] **Step 2: Remove the dead consulting page and its route**

```bash
git rm apps/main/src/pages/Consulting.tsx
```

Then edit `apps/main/src/App.tsx`: delete the import line
```tsx
import Consulting from './pages/Consulting'
```
and delete the route line
```tsx
          <Route path="/consulting" element={<Consulting />} />
```

- [ ] **Step 3: Verify no dangling references to the removed page**

```bash
grep -rIn "Consulting" apps/main/src/App.tsx; echo "exit=$?"
```
Expected: no matches, `exit=1`.

- [ ] **Step 4: Create `apps/main/vercel.json`**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "trailingSlash": false,
  "redirects": [
    { "source": "/consulting/:path*", "destination": "https://advisory.thegideoncorp.com/", "permanent": false },
    { "source": "/work/:path*", "destination": "https://advisory.thegideoncorp.com/work/:path*", "permanent": false },
    { "source": "/wraith/:path*", "destination": "https://advisory.thegideoncorp.com/wraith/:path*", "permanent": false }
  ],
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

- [ ] **Step 5: Remove the now-obsolete root `vercel.json`**

```bash
git rm vercel.json
git add apps/main/vercel.json
```

- [ ] **Step 6: Verify the app builds from its new location**

```bash
( cd apps/main && npm ci && npm run build )
```
Expected: build exits 0 and creates `apps/main/dist/index.html`.

- [ ] **Step 7: Confirm the built main site has no consulting assets**

```bash
test -d apps/main/dist/consulting && echo "LEAK" || echo "clean"
grep -oiE '<title>[^<]*' apps/main/dist/index.html | head -1
```
Expected: `clean`, and the main-site title `<title>Gideon Dynamics — Intelligence · Defense · Cyber Operations`.

- [ ] **Step 8: Commit**

```bash
git add -A apps/main
git commit -m "refactor: move cybersecurity SPA into apps/main; drop consulting route"
```

---

### Task 3: Repo-root cleanup check + push the branch

**Files:**
- Verify: repo root no longer has app files at top level (they're under `apps/`)

**Interfaces:**
- Consumes: Tasks 1–2 complete.
- Produces: branch `split-sites` pushed to origin, ready for the coordinated merge in Task 6.

- [ ] **Step 1: Verify the new top-level shape**

```bash
ls apps
test ! -e src && echo "src moved"
test ! -e index.html && echo "index moved"
test ! -e vercel.json && echo "root vercel.json removed"
```
Expected: `apps/` lists `advisory  main`; `src moved`, `index moved`, `root vercel.json removed`.

- [ ] **Step 2: Confirm `.gitignore` still ignores build output / node_modules under apps**

```bash
cat .gitignore
git status --porcelain | grep -E 'apps/(main|advisory)/(dist|node_modules)' && echo "TRACKED-BUILD-ARTIFACT" || echo "ignored ok"
```
Expected: `ignored ok`. If `dist`/`node_modules` show as tracked, add `apps/*/dist` and `apps/*/node_modules` (or rely on existing root-level `dist`/`node_modules` rules — update `.gitignore` patterns to be path-flexible, e.g. `dist` and `node_modules` without leading slash) and commit.

- [ ] **Step 3: Push the branch (no merge to main yet)**

```bash
git push -u origin split-sites
```
Expected: branch created on origin. Do NOT merge yet — merging triggers the main project build before Vercel is reconfigured (handled deliberately in Task 6).

---

### Task 4: Create the `gideon-advisory` Vercel project and verify on its preview URL

**Files:** none (Vercel dashboard).

**Interfaces:**
- Consumes: branch `split-sites` on origin with `apps/advisory`.
- Produces: a deployed advisory site on a `*.vercel.app` URL, verified, with no domain attached yet.

- [ ] **Step 1: (User) Create the project**

In Vercel → Add New → Project → import the same GitHub repo (`tcrouchbusiness-afk/gideon`):
- Project Name: `gideon-advisory`
- Root Directory: `apps/advisory`
- Framework Preset: Other
- Build Command: none (leave empty) · Output Directory: leave empty (serves the root dir statically)
- Production Branch: `main` (it will first build a preview from `split-sites`)

Trigger a deployment of the `split-sites` branch (open a deployment from that branch, or temporarily set it as production branch — either way capture the resulting `*.vercel.app` URL).

- [ ] **Step 2: Verify the advisory deployment (replace URL with the real one)**

```bash
ADV="https://<gideon-advisory-deployment>.vercel.app"
for p in / /work /wraith /work/kill-chain /work/wind-tunnel; do
  printf '%-22s %s\n' "$p" "$(curl -sL --max-time 12 -o /dev/null -w '%{http_code}' "$ADV$p")"
done
curl -sL --max-time 12 "$ADV/" | grep -oiE '<title>[^<]*' | head -1
curl -s --max-time 12 -o /dev/null -w 'logo=%{http_code}\n' "$ADV/assets/logo.svg"
```
Expected: every path `200`; title is the consulting page; `logo=200`.
(If the deployment URL is auth-protected and returns 401, use the Vercel MCP `web_fetch_vercel_url` tool or disable Deployment Protection for this check.)

- [ ] **Step 3: Verify the bare root is the consulting page (no redirect to /consulting)**

```bash
curl -s --max-time 12 -D - -o /dev/null "$ADV/" | grep -iE '^(HTTP|location)' | tr -d '\r'
```
Expected: `HTTP/1.1 200` (no `Location` redirect).

---

### Task 5: Move the `advisory.thegideoncorp.com` domain to `gideon-advisory`

**Files:** none (Vercel dashboard).

**Interfaces:**
- Consumes: verified `gideon-advisory` deployment (Task 4).
- Produces: `advisory.thegideoncorp.com` served by `gideon-advisory`.

- [ ] **Step 1: (User) Remove the domain from `gideon`**

Vercel → `gideon` → Settings → Domains → remove `advisory.thegideoncorp.com`.

- [ ] **Step 2: (User) Add the domain to `gideon-advisory`**

Vercel → `gideon-advisory` → Settings → Domains → add `advisory.thegideoncorp.com`. DNS already points to Vercel (Porkbun CNAME `advisory` → `cname.vercel-dns.com`), so it should validate quickly. Ensure `main` is the production branch and a production deployment exists.

- [ ] **Step 3: Verify the live domain now serves consulting from the new project**

```bash
for p in / /work /wraith /work/mro-analysis; do
  printf '%-18s %s\n' "$p" "$(curl -sL --max-time 12 -o /dev/null -w '%{http_code}' "https://advisory.thegideoncorp.com$p?cb=$RANDOM")"
done
curl -sL --max-time 12 "https://advisory.thegideoncorp.com/?cb=$RANDOM" | grep -oiE '<title>[^<]*' | head -1
curl -s --max-time 12 -D - -o /dev/null "https://advisory.thegideoncorp.com/?cb=$RANDOM" | grep -iE '^(HTTP|location)' | tr -d '\r'
```
Expected: all `200`, consulting title, bare root `HTTP 200` with no redirect.

---

### Task 6: Repoint the `gideon` project to `apps/main`, merge, and fix the deep-link 404

**Files:**
- Possibly modify: `apps/main/vercel.json` (only if the 404 investigation requires it)

**Interfaces:**
- Consumes: advisory already live on its own project (Task 5), so `gideon` no longer owns the advisory domain.
- Produces: `thegideoncorp.com` served from `apps/main` with working deep links and old-URL redirects.

- [ ] **Step 1: (User) Set the main project's Root Directory**

Vercel → `gideon` → Settings → Build & Development → Root Directory = `apps/main`. (Do this before the merge so the next production build uses the right folder.)

- [ ] **Step 2: Merge the branch to production**

```bash
git checkout main
git merge --no-ff split-sites -m "refactor: split into apps/main + apps/advisory"
git push origin main
```
This triggers a `gideon` production build from `apps/main`. The previous deployment stays live until this build succeeds.

- [ ] **Step 3: Verify the main site home + old-URL redirects**

```bash
S(){ curl -s --max-time 12 -o /dev/null -w '%{http_code}' "$1?cb=$RANDOM"; }
printf 'home          %s\n' "$(S https://www.thegideoncorp.com/)"
curl -s --max-time 12 -D - -o /dev/null "https://www.thegideoncorp.com/consulting?cb=$RANDOM" | grep -iE '^(HTTP|location)' | tr -d '\r'
curl -s --max-time 12 -D - -o /dev/null "https://www.thegideoncorp.com/work?cb=$RANDOM" | grep -iE '^(HTTP|location)' | tr -d '\r'
```
Expected: `home 200`; `/consulting` → 307 `Location: https://advisory.thegideoncorp.com/`; `/work` → 307 to advisory `/work`.

- [ ] **Step 4: Test the deep-link 404 (the fix target)**

```bash
for u in /capabilities /programs /mission /contact; do
  printf '%-14s %s\n' "$u" "$(curl -s --max-time 12 -o /dev/null -w '%{http_code}' "https://www.thegideoncorp.com$u?cb=$RANDOM")"
done
```
Expected (success): all `200`. If any are `404`, work the fallback ladder below, testing each fix on a Vercel **preview deployment** (push to a branch / open a preview) before it reaches production.

- [ ] **Step 5: 404 fallback ladder (only if Step 4 shows 404)**

Apply ONE change at a time to `apps/main/vercel.json`, deploy to a preview, re-run the Step 4 checks against the preview URL, and keep the first that yields all `200`:

  a. **Explicit framework** — add `"framework": "vite"` to `apps/main/vercel.json` (force correct SPA detection vs the old `framework: null`).

  b. **Drop cleanUrls** — remove `"cleanUrls": true` (suspected interaction with the `/index.html` rewrite target). Re-test; if static dir URLs need it, prefer (c) instead.

  c. **Filesystem SPA fallback** — replace the rewrite with a copied entrypoint:
  add a build step that copies `dist/index.html` to `dist/404.html`
  (in `apps/main/package.json` scripts: `"build": "tsc -b && vite build && cp dist/index.html dist/404.html"`),
  which Vercel serves for unmatched routes. Keep the catch-all rewrite as well.

  Commit the winning change:
```bash
git add apps/main/vercel.json apps/main/package.json
git commit -m "fix: SPA deep-link fallback so main-site routes load on direct hit"
git push origin main
```

- [ ] **Step 6: Re-verify deep links on production after the fix lands**

```bash
for u in /capabilities /programs /mission /contact; do
  printf '%-14s %s\n' "$u" "$(curl -sL --max-time 12 "https://www.thegideoncorp.com$u?cb=$RANDOM" | grep -oiE '<title>[^<]*' | head -1)"
done
```
Expected: each returns the main-site title (SPA served), not a 404.

---

### Task 7: Promote redirects to permanent + final end-to-end verification

**Files:**
- Modify: `apps/main/vercel.json`, `apps/advisory/vercel.json` (`permanent: false` → `true`)

**Interfaces:**
- Consumes: everything verified green in Tasks 5–6.
- Produces: final production state with permanent (308) redirects.

- [ ] **Step 1: Flip redirects to permanent in both configs**

In `apps/main/vercel.json` and `apps/advisory/vercel.json`, change every `"permanent": false` to `"permanent": true`.

- [ ] **Step 2: Commit and push**

```bash
git add apps/main/vercel.json apps/advisory/vercel.json
git commit -m "chore: promote site-split redirects to permanent (308)"
git push origin main
```

- [ ] **Step 3: Full end-to-end verification sweep**

```bash
T(){ curl -sL --max-time 12 "$1?cb=$RANDOM" | grep -oiE '<title>[^<]*' | head -1 | sed 's/<title>//I'; }
C(){ curl -s --max-time 12 -D - -o /dev/null "$1?cb=$RANDOM" | grep -iE '^(HTTP|location)' | tr -d '\r'; }
echo "== ADVISORY =="
printf 'root    -> %s\n' "$(T https://advisory.thegideoncorp.com/)"
printf 'work    -> %s\n' "$(T https://advisory.thegideoncorp.com/work)"
printf 'wraith  -> %s\n' "$(T https://advisory.thegideoncorp.com/wraith)"
echo "== OLD URLS REDIRECT (expect 308 to advisory) =="
C https://www.thegideoncorp.com/consulting
C https://www.thegideoncorp.com/work
echo "== MAIN SITE =="
printf 'home    -> %s\n' "$(T https://www.thegideoncorp.com/)"
printf 'caps    -> %s\n' "$(T https://www.thegideoncorp.com/capabilities)"
printf 'mission -> %s\n' "$(T https://www.thegideoncorp.com/mission)"
```
Expected: advisory paths → consulting/work/wraith titles; old URLs → `308` `Location` to advisory; main home + caps + mission → main-site titles (no 404).

- [ ] **Step 4: Confirm the two sites are independent**

```bash
# main site must not serve consulting assets
curl -s --max-time 12 -o /dev/null -w 'main/assets/logo=%{http_code}\n' "https://www.thegideoncorp.com/consulting/assets/logo.svg?cb=$RANDOM"
# advisory must not depend on the main project
curl -s --max-time 12 -o /dev/null -w 'advisory/capabilities=%{http_code}\n' "https://advisory.thegideoncorp.com/capabilities?cb=$RANDOM"
```
Expected: `main/...logo` redirects/404 (no longer a real asset on main — 308 to advisory is fine); `advisory/capabilities` is `404` (advisory has no such page — confirms separation).

---

## Notes for the executor
- Tasks 1–3 are pure repo work and safe to do fully before any Vercel change.
- Tasks 4–6 interleave user dashboard actions with verification — pause for the user to perform each "(User)" step, then run the verification.
- The only no-downtime-critical ordering: advisory domain moves (Task 5) **before** the main project is rebuilt as `apps/main` (Task 6). Do not reorder.
- Keep `gideon`'s previous production deployment as the rollback point until Task 6 verifies green.
