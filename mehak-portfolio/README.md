# Mehak Khandelwal — Software, with context.

An editorial portfolio built with React, TypeScript and Vite. Warm ivory, ink, oxide and moss; self-hosted Newsreader, DM Sans and IBM Plex Mono; no photo dependencies or external font requests.

## Start locally

Use Node.js 22.12+ (or a supported newer LTS) and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. For a production build:

```sh
npm run build
npm run preview
```

The included `dist/` is a ready-built static site. Serve it through an HTTP server, rather than opening its HTML directly as a file. For example, `python3 -m http.server 8080 --directory dist`. Assets currently use root-relative URLs, so deploy at a domain root. For a subdirectory deployment, add the appropriate Vite `base` setting and rebuild.

## Deploy

No live deployment was created: Sites returned “Sites is not yet enabled for this workspace.” No public sharing or permission changes were made.

- **Vercel:** import this source folder/repository, select Vite, build command `npm run build`, output directory `dist`.
- **Netlify:** import the source and use the same build settings, or manually deploy the contents of `dist`.
- **Other static hosting:** upload the contents of `dist` to the web root.

Enable private/access-controlled hosting if you do not want the portfolio publicly accessible. Review the included email address and content before publishing. There is no backend, form submission service, analytics, tracking pixel or environment secret. The contact action opens the visitor's email app; copy email requires clipboard support (otherwise an explanatory status appears).

## Customize

- `src/data.ts`: name, contact, education, work studies, experience, skills and leadership.
- `src/main.tsx`: component layout, editorial copy and interactions.
- `src/styles.css`: palette, typography, spacing, breakpoints and reduced-motion rules.
- `index.html`: title and social metadata. Add a canonical URL and absolute Open Graph image URL after choosing your final domain.
- `public/`: original vector favicon and social-card artwork.

Only FinBuddy is presented as a personal project. Microsoft and Avira are internship work studies. All diagrams are clearly marked conceptual, not actual employer interfaces. Metrics are résumé-reported, not independently verified. React Native, Django, TensorFlow and AWS Cloud Practitioner are labeled learning/exploring. No GitHub or LinkedIn URL was invented. Add verified links to `data.ts` and the relevant component when you have shareable public destinations.

## Included interactions

Project selector with arrow/Home/End keyboard controls; expandable work studies; experience accordions; skill filters; responsive mobile navigation with Escape-to-close; email-copy status; active-section navigation; scroll progress; subtle pointer response on the hero artwork. A native cursor is retained. Reduced-motion preferences disable decorative movement. Content stays readable when IntersectionObserver is unavailable.

## Tests and verification

```sh
npm test
# In another terminal, start npm run dev first:
npx playwright install chromium
npm run test:browser
```

Optionally set `BASE_URL` and `CHROMIUM_EXECUTABLE_PATH` for your environment. The browser script targets widths 1440, 1024, 768, 390 and 320, captures screenshots under `qa/`, and checks overflow, interactions, reduced motion, progress and anchors.

`npm run build` and `npm test` passed. Real-browser visual/viewport QA could not run in the creation environment; see `QA.md`. Do not interpret DOM tests as visual acceptance. Review every target width before publishing.

## Structure

```
src/                 editable application and content
public/              vector brand assets
dist/                production build, including local fonts
qa/                  DOM tests, browser test script, DOM results
CONTENT_NOTES.md     résumé analysis and content decisions
QA.md                verification record and remaining checks
```

Dependencies are locked in `package-lock.json`. Font packages retain their upstream open-source licenses in installed dependencies. This project includes no proprietary employer code or internal screenshots.
