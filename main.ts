import { chromium } from "playwright-extra";

async function main(): Promise<void> {
  console.log("▶ Script iniciado");

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://example.com", {
    waitUntil: "networkidle",
  });

  console.log("✔ Página cargada");

  await browser.close();
  console.log("■ Script terminado");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
  });
