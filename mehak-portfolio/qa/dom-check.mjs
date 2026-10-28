import { JSDOM } from "jsdom";
import { build } from "esbuild";
import assert from "node:assert/strict";
import fs from "node:fs";
const bundled = await build({
  entryPoints: ["src/main.tsx"],
  bundle: true,
  write: false,
  format: "iife",
  loader: { ".css": "empty" },
  jsx: "automatic",
});
const dom = new JSDOM('<!doctype html><div id="root"></div>', {
  url: "http://localhost/",
  runScripts: "dangerously",
  pretendToBeVisual: true,
});
const w = dom.window;
w.matchMedia = () => ({
  matches: false,
  addListener() {},
  removeListener() {},
  addEventListener() {},
  removeEventListener() {},
});
let copied = "";
Object.defineProperty(w.navigator, "clipboard", {
  value: {
    writeText: async (text) => {
      copied = text;
    },
  },
});
const errors = [];
w.addEventListener("error", (e) => errors.push(e.message));
// Deliberately omit IntersectionObserver to verify graceful feature fallback.
w.eval(bundled.outputFiles[0].text);
const pause = () => new Promise((r) => setTimeout(r, 30));
await pause();
const q = (s) => w.document.querySelector(s);
const text = () => w.document.body.textContent;
const click = async (el) => {
  assert.ok(el);
  el.click();
  await pause();
};
assert.match(text(), /Software,/);
assert.match(text(), /Microsoft/);
await click(q("#work-tab-1"));
assert.equal(q("#work-tab-1").getAttribute("aria-selected"), "true");
assert.match(q("#work-panel").textContent, /FinBuddy|personal finance/);
await click(q(".detail-toggle"));
assert.equal(q("#work-details").hidden, false);
assert.match(q("#work-details").textContent, /35%/);
await click(q(".detail-toggle"));
assert.equal(q("#work-details").hidden, true);
await click(q("#work-tab-2"));
assert.match(q("#work-panel").textContent, /1,000\+/);
q("#work-tab-2").dispatchEvent(
  new w.KeyboardEvent("keydown", { key: "Home", bubbles: true }),
);
await pause();
assert.equal(q("#work-tab-0").getAttribute("aria-selected"), "true");
await click(w.document.querySelectorAll(".experience-trigger")[1]);
assert.equal(q("#experience-1").hidden, false);
assert.equal(q("#experience-0").hidden, true);
const filter = [...w.document.querySelectorAll(".skill-filters button")].find(
  (x) => x.textContent === "Exploring",
);
await click(filter);
assert.match(
  q(".skills-grid").textContent,
  /AWS Cloud Practitioner \(learning\)/,
);
assert.equal(w.document.querySelectorAll(".skill-group").length, 1);
await click(w.document.querySelector(".skill-filters button"));
assert.equal(w.document.querySelectorAll(".skill-group").length, 6);
await click(q("#menu-toggle"));
assert.equal(q("#menu-toggle").getAttribute("aria-expanded"), "true");
w.dispatchEvent(new w.KeyboardEvent("keydown", { key: "Escape" }));
await pause();
assert.equal(q("#menu-toggle").getAttribute("aria-expanded"), "false");
await click(q("#menu-toggle"));
await click(q('nav a[href="#contact"]'));
assert.equal(q("#menu-toggle").getAttribute("aria-expanded"), "false");
await click(q(".copy-button"));
assert.equal(copied, "mehak.28105@gmail.com");
assert.match(q(".copy-status").textContent, /copied/);
const anchors = [...w.document.querySelectorAll("a")].map((a) =>
  a.getAttribute("href"),
);
for (const h of anchors) {
  if (h.startsWith("#")) assert.ok(q(h), "Missing target " + h);
  else assert.equal(h, "mailto:mehak.28105@gmail.com");
}
assert.equal(errors.length, 0, errors.join("\n"));
const results = {
  status: "passed",
  checks: [
    "React rendering",
    "IntersectionObserver unavailable fallback",
    "Project selection",
    "Project expand/collapse",
    "Project keyboard navigation",
    "Experience accordion",
    "Skill filter and show-all",
    "Mobile menu state, Escape and navigation close",
    "Clipboard copy",
    "All internal anchors",
    "No invented external links",
    "No DOM runtime errors",
  ],
  limitations: [
    "No real viewport or pixel rendering in jsdom",
    "Browser screenshot and viewport tests blocked by execution environment",
  ],
  timestamp: new Date().toISOString(),
};
fs.writeFileSync("qa/dom-results.json", JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
dom.window.close();
