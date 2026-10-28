import { chromium } from "@playwright/test";
import fs from "node:fs";
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROMIUM_EXECUTABLE_PATH
    ? { executablePath: process.env.CHROMIUM_EXECUTABLE_PATH }
    : {}),
});
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
const results = [];
for (const width of [1440, 1024, 768, 390, 320]) {
  await page.setViewportSize({ width, height: 960 });
  await page.goto(process.env.BASE_URL || "http://localhost:5173");
  await page.waitForTimeout(1200);
  await page.evaluate(() => document.fonts.ready);
  const layout = await page.evaluate(() => ({
    width: innerWidth,
    scroll: document.documentElement.scrollWidth,
    fonts: document.fonts.check("20px Newsreader"),
  }));
  if (layout.scroll > width) throw Error(`Overflow ${width}: ${layout.scroll}`);
  await page.screenshot({ path: `qa/desktop-${width}.png`, fullPage: true });
  await page.getByRole("tab", { name: /FinBuddy/ }).click();
  await page.getByRole("button", { name: "Read work study" }).click();
  if (!(await page.getByText("THE OUTCOME", { exact: true }).isVisible()))
    throw Error("work study unavailable");
  await page.getByRole("button", { name: "Close work study" }).click();
  await page.getByRole("tab", { name: /HR management portal/ }).focus();
  await page.keyboard.press("Home");
  if (
    (await page
      .getByRole("tab", { name: /AI-assisted engineering/ })
      .getAttribute("aria-selected")) !== "true"
  )
    throw Error("tab keyboard");
  await page.getByRole("button", { name: /May–June 2025/ }).click();
  if (
    !(await page
      .getByText("Full-stack applications and real-time HR operations.", {
        exact: true,
      })
      .isVisible())
  )
    throw Error("experience");
  await page.getByRole("button", { name: "Exploring", exact: true }).click();
  if (
    !(await page.getByText(/AWS Cloud Practitioner \(learning\)/).isVisible())
  )
    throw Error("skills");
  await page.getByRole("button", { name: "All", exact: true }).click();
  if (width < 600) {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page.locator("nav").getByRole("link", { name: "Contact" }).click();
    if (await page.locator("nav").isVisible()) throw Error("menu not closed");
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page.keyboard.press("Escape");
    if (await page.locator("nav").isVisible()) throw Error("escape");
  }
  await page
    .locator("footer")
    .getByRole("link", { name: "Back to top", exact: true })
    .click();
  await page.waitForTimeout(800);
  results.push({ width, layout, status: "passed" });
}
await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto(process.env.BASE_URL || "http://localhost:5173");
const reduced = await page
  .locator("h1 em")
  .evaluate((el) => getComputedStyle(el).animationName);
if (reduced !== "none") throw Error("reduced motion");
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(100);
const progress = await page.evaluate(() =>
  getComputedStyle(document.documentElement).getPropertyValue("--progress"),
);
if (Number(progress) < 0.9) throw Error("progress");
const anchors = await page
  .locator("a")
  .evaluateAll((as) => as.map((a) => a.getAttribute("href")));
for (const href of anchors) {
  if (href?.startsWith("#") && !(await page.locator(href).count()))
    throw Error("broken anchor " + href);
}
await browser.close();
fs.writeFileSync(
  "qa/results.json",
  JSON.stringify(
    { results, errors, reducedMotion: reduced, progress, anchors },
    null,
    2,
  ),
);
if (errors.length) throw Error(errors.join("\n"));
console.log(
  JSON.stringify(
    { results, errors, reducedMotion: reduced, progress },
    null,
    2,
  ),
);
