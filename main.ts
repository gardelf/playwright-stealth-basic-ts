import { chromium } from "playwright-extra";
import fs from "fs";

const LOGIN_URL = "https://panel.timp.pro";

async function main(): Promise<void> {
  console.log("▶ Login TIMP iniciado");

  const browser = await chromium.launch({
    headless: false, // IMPORTANTE: solo esta vez
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(LOGIN_URL, { waitUntil: "networkidle" });

  await page.fill('input[type="email"]', process.env.TIMP_EMAIL || "");
  await page.fill('input[type="password"]', process.env.TIMP_PASSWORD || "");

  await page.click('button[type="submit"]');

  console.log("⏳ Esperando posible código de verificación...");
  await page.waitForTimeout(60000); // 60s para meter el código manualmente

  // Guardar sesión
  await context.storageState({ path: "timp-session.json" });

  console.log("✔ Sesión guardada en timp-session.json");

  await browser.close();
  console.log("■ Login terminado");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
  });
