const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");
const { PuppeteerBlocker } = require("@cliqz/adblocker-puppeteer");
const fetch = require("node-fetch");

const app = express();
const port = 3000;

let browser, page;

app.use(cors());
app.get("/youtube", async (req, res) => {
  const query = req.query.text.replace("_", "+");
  if (!browser) {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    const blocker = await PuppeteerBlocker.fromPrebuiltAdsAndTracking(fetch);
    blocker.enableBlockingInPage(page);

    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });

    await page.setCookie({
      value: "YES+BE.en-GB+V9+BX",
      domain: ".youtube.com",
      expires: Date.now() + Date.now(),
      name: "CONSENT",
    });
  }
  await page.goto("https://music.youtube.com/search?q=" + query);

  const videos = await page.$$(".ytmusic-responsive-list-item-renderer div");
  await videos[0].click();
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
