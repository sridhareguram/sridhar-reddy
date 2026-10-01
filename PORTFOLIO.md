# Portfolio: setup and deployment

The portfolio lives in `site/` (plain HTML, CSS and JavaScript, no build step). The workflow in `.github/workflows/pages.yml` publishes only that folder to GitHub Pages.

## Deploy (one-time)

1. In the repository go to **Settings > Pages** and set **Source** to **GitHub Actions**.
2. Push to `main` (or run the workflow from the **Actions** tab). The `deploy` job prints the live URL.

The workflow replaces `__BASE_URL__` in the pages (canonical, social preview) and writes `sitemap.xml` and `robots.txt`.
All internal links are relative, so the site works at a root domain or under `/<repo>/`.

> A repository only serves at `https://<owner>.github.io/` when it is named exactly `<owner>.github.io`; any other repository name is served under `/<repo>/`.
> This repo is `sridhareguram/sridhar-reddy`, so its URL will be `https://sridhareguram.github.io/sridhar-reddy/`.

## Edit content

- Settings (name, email, GitHub user, LinkedIn, contact endpoint): `site/assets/js/config.js`
- Pages: `site/index.html`, `experience.html`, `projects.html`, `contact.html`
- Colors and layout: tokens at the top of `site/assets/css/style.css`

Preview locally: `python3 -m http.server -d site 8000`

## Backend (optional): contact form

GitHub Pages is static hosting, so server-side code lives in a Cloudflare Worker (`worker/`). It validates the message, rejects other origins and bots, and emails it to you with [Resend](https://resend.com).

```bash
cd worker
npx wrangler secret put RESEND_API_KEY   # paste your Resend key
# edit wrangler.toml: ALLOWED_ORIGIN (your Pages origin), TO_EMAIL, FROM_EMAIL
npx wrangler deploy
```

Then put the Worker URL in `contactEndpoint` in `site/assets/js/config.js`. Until you do, the form opens the visitor's email app with the message prefilled.

Test the Worker logic offline: `node worker/test.mjs`

## Live GitHub data

`projects.html` fetches your public repositories from the GitHub API in the browser (cached for 10 minutes, forks and archived repos hidden).

## Notes on the design

- Fonts are self-hosted in `site/assets/fonts/` (see `FONTS.txt`), so the site makes no third-party font requests.
- The AURA screenshots load from the public images in the AURA README. To host them yourself, save them under `site/assets/img/` and point the `src` and `data-items` entries in `index.html` and `projects.html` at the local files.
- The cricket illustration on the CricClash card is an original doodle, not a screenshot.
