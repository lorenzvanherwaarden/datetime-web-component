import { Browser, chromium, firefox, Page, webkit } from "playwright";
import { afterAll, beforeAll, describe, it } from "vitest";
import { test, expect } from '@playwright/test';


const browserTypes = process.env.ALL_BROWSERS
  ? [chromium, firefox, webkit]
  : [chromium];

for (const browserType of browserTypes) {
  describe(`browser:${browserType.name()}`, () => {
    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
      browser = await browserType.launch({ headless: true });
      const page = await browser.newPage();
      page.on("console", (msg) => console.log(msg.text()));
      await page.goto("http://localhost:5173");
    });

    afterAll(async () => {
      browser?.close();
    });
    it("evaluate with vite module", async () => {
      await expect(page.getByTestId('input')).toHaveText('aaa');
      
      // await page.locator("#ready").waitFor({ state: "attached" });
      // await page.evaluate(() => {
      //   return new Promise(async (r) => {
      //     const mod = await new Function("return import('/mod.ts')")();
      //     console.log("hello in eval", Object.keys(mod));
      //     r(null);
      //   });
      // });
    });
  });
}