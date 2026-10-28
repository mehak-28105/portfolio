# Verification record

## Passed

- TypeScript strict checking and Vite production build.
- React render without IntersectionObserver support; core content remains visible.
- Project selection and expand/collapse; keyboard Home navigation.
- Experience accordion state.
- Skill filtering and reset.
- Mobile navigation state, Escape close and link-close behavior.
- Clipboard copy success state.
- Internal anchor targets and absence of invented external links.
- No captured DOM runtime errors.
- Local font bundling; no Google Fonts request needed.

Machine-readable results: `qa/dom-results.json`. The test uses jsdom, not a browser rendering engine.

## Not verified in a real browser

The environment prevented Chromium startup (socket creation not permitted), and a separate browser could not reach the isolated local server. Browser screenshot and viewport tests therefore remain unrun. No screenshots or performance/accessibility scores are claimed.

Before publishing, run `npm run test:browser` against the local server and inspect all screenshots at 1440, 1024, 768, 390 and 320 pixels. Also inspect keyboard focus, contrast, touch behavior, narrow-width text wrapping, reduced motion, sticky navigation and clipboard-denied behavior manually. Use a screen reader for a final semantic review. Responsive CSS and reduced-motion rules are implemented but not visually certified.

## Hosting

Sites creation returned `sites_access_disabled`: Sites is not enabled for this workspace. No site or live URL was created. Source and built static assets are supplied, with deployment steps in README.
