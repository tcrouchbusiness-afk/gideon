# Gideon Dynamics — Vercel Deployment

This folder is a static site, ready to deploy to Vercel.

## Deploy options

### Option A — Drag & drop (fastest)
1. Go to https://vercel.com/new
2. Drag this folder (or the unzipped contents) onto the page
3. Vercel auto-detects it as a static site — click **Deploy**

### Option B — Vercel CLI
```bash
npm i -g vercel
cd deploy
vercel            # preview deploy
vercel --prod     # production deploy
```

### Option C — Git
1. Push these files to a GitHub/GitLab/Bitbucket repo
2. Import the repo at https://vercel.com/new
3. Framework preset: **Other** (no build command, output dir = `.`)

## Configuration

`vercel.json` is already set up with:
- `cleanUrls: true` — `/about` instead of `/about.html`
- `trailingSlash: false`

No build step is required — everything is static HTML/CSS/JS + assets.

## Mobile + desktop

The site is responsive and tested on both. `mobile-preview.html` is a dev preview frame; the live URL (`/`) handles all viewports automatically via the viewport meta tag and CSS in `styles.css`.

## Notes
- React + Babel are loaded from unpkg.com CDN and JSX is compiled in-browser. This works fine but adds a one-time load cost. If you want to ship pre-compiled JS later, run the JSX files through Babel ahead of time and swap the `<script type="text/babel">` tags for plain `<script>` tags pointing at the compiled output.
- Images and SVGs are served directly from the root.
