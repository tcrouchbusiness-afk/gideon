# Design: Split the repo into two independent sites

**Date:** 2026-06-18
**Status:** Approved (design), pending implementation plan

## Context / current state

The repo currently holds one Vercel project (`gideon`, id `prj_fyrFnq23TnHTpGLW43lDOUl6V6oJ`)
that serves two unrelated things tangled together:

1. **The cybersecurity / intelligence-operations site** — a React + Vite SPA
   (`react-router-dom`, `BrowserRouter`) in `src/`. Pages: Home (globe/hero),
   Programs, Capabilities, Mission, Contact. Served at `thegideoncorp.com` and
   `www.thegideoncorp.com`. Build: `tsc -b && vite build` → `dist/`.

2. **The consulting site** — a set of hand-authored static HTML pages currently
   living inside the SPA's `public/` folder:
   - `public/consulting/index.html` — the consulting landing page (served at `/consulting`)
   - `public/work/` — a launcher plus the demos: `isr`, `kill-chain`, `link-budget`,
     `demand-map`, `mro-analysis`, `wind-tunnel`
   - `public/wraith/` — the GD-1 WRAITH demo
   - `public/consulting/assets/` — logo.svg, pic.jpg, wraith_hero.png, wraith_teaser.mp4

   Currently reachable at `advisory.thegideoncorp.com` via a temporary host-based
   redirect hack in the single project's `vercel.json` (advisory root 307→`/consulting`;
   old `www` paths 307→advisory).

### Known pre-existing bug (in scope to fix)
On the main site, **`rewrites` in `vercel.json` do not fire**. The catch-all SPA
fallback `{"source":"/(.*)","destination":"/index.html"}` is ignored, so any path
that is not a real static file returns 404 — including `/capabilities`, `/programs`,
`/mission`, `/contact`. This is invisible during normal click-through (client-side
routing) but breaks on direct load / refresh / shared deep links. `redirects` and
static files work; only `rewrites` are dropped. Reproduces on the original config,
so it predates this work.

## Goals

- Make the two sites **two genuinely separate entities**: separate Vercel projects,
  cleanly separated in the repo.
- Repo organized so the two sites are obvious at a glance.
- `advisory.thegideoncorp.com` root **is** the consulting page (no `/consulting` in the URL).
- Old `www` URLs (`/consulting`, `/work`, `/wraith`) keep forwarding to advisory.
- Fix the main-site deep-link 404 so SPA pages load on direct hit/refresh.
- Neither live site goes down during the migration.

## Non-goals (out of scope)

- Cleaning `archive/`, `site/deploy/` (old static predecessor), committed `dist/`,
  `scripts/`, or loose root files (`*.md`, `*.xlsx`). Left untouched; optional later pass.
- Any content/design changes to either site beyond the path fixups required by the move.
- Converting the consulting static pages into a framework/build system — they stay static.

## Target repo structure

```
repo/
  apps/
    main/                      # cybersecurity SPA → thegideoncorp.com (+ www)
      src/
      public/                  # main-site assets only (consulting/work/wraith removed)
      index.html
      vite.config.ts
      tsconfig.json  tsconfig.app.json  tsconfig.node.json
      package.json
      vercel.json
    advisory/                  # consulting site → advisory.thegideoncorp.com
      index.html               # = former public/consulting/index.html (now ROOT)
      assets/                  # = former public/consulting/assets/
      work/                    # = former public/work/  (launcher + 6 demos)
      wraith/                  # = former public/wraith/
      vercel.json
  archive/  site/  docs/  dist/  scripts/  *.md  *.xlsx     # untouched, repo root
```

No npm workspace tooling is required: the advisory site is pure static (no
package.json, no build), and the main site keeps its own `package.json`. The repo
root will no longer have a `package.json` or `vercel.json` of its own.

## The advisory site (`apps/advisory`)

### File moves
| From | To |
|------|----|
| `public/consulting/index.html` | `apps/advisory/index.html` |
| `public/consulting/assets/*` | `apps/advisory/assets/*` |
| `public/work/*` | `apps/advisory/work/*` |
| `public/wraith/*` | `apps/advisory/wraith/*` |

### Path fixups
Because consulting moves from `/consulting` to the root, rewrite the ~16 absolute
references from `/consulting/assets/...` to `/assets/...` across
`apps/advisory/index.html`, `apps/advisory/work/**`, and `apps/advisory/wraith/**`:
- `href="/consulting/assets/logo.svg"` → `href="/assets/logo.svg"` (×9)
- `src="/consulting/assets/logo.svg"` → `src="/assets/logo.svg"` (×4)
- `src="/consulting/assets/pic.jpg"` → `src="/assets/pic.jpg"` (×1)
- `src="/consulting/assets/wraith_hero.png"` → `src="/assets/wraith_hero.png"` (×1)
- `src="/consulting/assets/wraith_teaser.mp4"` → `src="/assets/wraith_teaser.mp4"` (×1)

Single mechanical replacement of the substring `/consulting/assets/` → `/assets/`.
Links to `/work`, `/work/<demo>`, `/wraith`, and in-page `#anchors` are unchanged and
already correct at the new root. There are no bare `/consulting` self-links and no
links back to the main site to worry about (verified).

### `apps/advisory/vercel.json`
```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "redirects": [
    { "source": "/consulting", "destination": "/", "permanent": true },
    { "source": "/consulting/:path*", "destination": "/:path*", "permanent": true }
  ]
}
```
Static multi-page site: no build command, no output directory override, no SPA
catch-all rewrite. The optional `/consulting` → `/` redirect catches anyone who
deep-links the old internal path on the new host.

### Vercel project
- New project `gideon-advisory`, same GitHub repo, **Root Directory = `apps/advisory`**.
- Framework preset: Other. Build command: none. Output: serve root directory as static.
- Domain `advisory.thegideoncorp.com` moves here (off the main project).

## The main site (`apps/main`)

### File moves
Move into `apps/main/`: `src/`, `index.html`, `vite.config.ts`, `tsconfig.json`,
`tsconfig.app.json`, `tsconfig.node.json`, `package.json`, and `public/` — but
`public/consulting`, `public/work`, `public/wraith` leave for the advisory site.

### Removals (consulting no longer belongs to the main site)
- Delete `src/pages/Consulting.tsx` (dead placeholder).
- Remove the `/consulting` route + its import from `src/App.tsx`.

### `apps/main/vercel.json`
Keep `cleanUrls`/`trailingSlash`, the SPA catch-all rewrite, and the old-URL
redirects so existing links forward to advisory:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "trailingSlash": false,
  "redirects": [
    { "source": "/consulting/:path*", "destination": "https://advisory.thegideoncorp.com/", "permanent": true },
    { "source": "/work/:path*",       "destination": "https://advisory.thegideoncorp.com/work/:path*", "permanent": true },
    { "source": "/wraith/:path*",      "destination": "https://advisory.thegideoncorp.com/wraith/:path*", "permanent": true }
  ],
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
(Redirects are host-agnostic now — they live on the main project, which only serves
the main domains, so no `has`-host conditions are needed. Promote to `permanent`
308 once verified; start at temporary while validating if preferred.)

### Main-site 404 fix (in scope)
Symptom: `rewrites` ignored, deep links 404. Fix is investigation-led, tested on a
Vercel **preview** before production:
1. As a clean, properly-detected Vite project under `apps/main` (framework auto-detected
   as Vite rather than the current `framework: null`), the documented Vite SPA rewrite
   `{"source":"/(.*)","destination":"/index.html"}` is expected to work. Verify on preview.
2. If deep links still 404 on preview, work the fallback ladder, testing each on preview:
   a. Remove `cleanUrls` (suspected interaction with the `/index.html` rewrite target).
   b. Add an explicit `404.html` / filesystem SPA fallback, or adjust the rewrite
      destination.
   c. Confirm no committed `dist/` is being served stale instead of a fresh build.
This is a **goal, not a guarantee**; the implementation will report findings and the
chosen fix. Success = direct GET of `/capabilities`, `/programs`, `/mission`,
`/contact` returns 200 and renders the SPA.

### Vercel project
- Existing project `gideon` → Settings → **Root Directory = `apps/main`**.
- Domains `thegideoncorp.com` + `www.thegideoncorp.com` stay here.

## Deployment / dashboard steps (user-performed)
1. `gideon` project → Settings → Build & Development → set Root Directory `apps/main`; redeploy.
2. New project `gideon-advisory` from same repo → Root Directory `apps/advisory`,
   framework Other.
3. Move domain `advisory.thegideoncorp.com` from `gideon` to `gideon-advisory`.

Exact click-by-click instructions provided at implementation time. Note: with two
projects on one repo and Root Directory set, Vercel skips a project's build when its
subtree is unchanged.

## Safe sequencing (no downtime)
Key fact that drives the order: Vercel keeps the **last successful production
deployment live** if a new build fails. So a transient failed build does not take a
site down — it just means the old version keeps serving until a good build replaces it.

1. Do the full repo reorg + path fixups + both `vercel.json` files on a branch; merge to
   `main`. This triggers the existing `gideon` project to build from repo root, which now
   **fails** (the app moved to `apps/main`). Harmless: the prior production deployment
   keeps serving **both** `thegideoncorp.com` and `advisory.thegideoncorp.com` unchanged
   (it still carries the old redirect hack), so nothing visibly changes yet.
2. Create `gideon-advisory` (Root Directory `apps/advisory`) and verify the consulting
   site on its generated `*.vercel.app` URL (root = consulting page; `/work`, `/wraith`,
   all demos load; assets resolve) **before** touching any domain.
3. Move `advisory.thegideoncorp.com` from `gideon` to `gideon-advisory`; confirm it serves
   consulting at the bare root from the new project.
4. Now set `gideon` → Root Directory `apps/main` and redeploy → succeeds (advisory has
   already moved off, so no conflict). Verify `thegideoncorp.com` home + the deep-link
   404 fix + old `/consulting|/work|/wraith` redirecting to advisory.
5. Promote redirects to permanent (308) once everything is confirmed.

Why this order: advisory must move to its new project **before** the main project is
rebuilt as `apps/main`. The main project's `apps/main` config has no advisory-root
redirect, so if it went live while still owning the advisory domain, the bare root would
show the main SPA. Moving the domain first (steps 2–3) avoids that. Throughout steps 1–3
both sites keep serving from `gideon`'s last good deployment, so there is no downtime.

## Verification criteria
- `advisory.thegideoncorp.com/` → consulting page (HTTP 200, no redirect to `/consulting`).
- `advisory.thegideoncorp.com/work`, `/wraith`, and each of the 8 demos → 200, assets load.
- `www.thegideoncorp.com/consulting`, `/work`, `/wraith` → redirect to advisory.
- `thegideoncorp.com/` → main site (200).
- `thegideoncorp.com/capabilities`, `/programs`, `/mission`, `/contact` → **200** (404 fixed).
- Main site has no `/consulting` route and no consulting assets.

## Risks
- **Build root switch:** if the `gideon` Root Directory isn't updated when the reorg
  merges, its build breaks. Mitigated by pairing the steps and the verify-before-promote
  sequence; the prior production deployment stays live until the new one is green.
- **404 fix uncertain:** root cause not yet confirmed; mitigated by preview testing and a
  fallback ladder. Worst case, the split still succeeds and the 404 is fixed in a follow-up.
- **Domain move:** moving `advisory.thegideoncorp.com` between projects has a brief
  propagation window; done after the new project is verified on its preview URL.
