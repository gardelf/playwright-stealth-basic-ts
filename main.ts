import { chromium } from "playwright-extra";

const LOGIN_URL = "https://panel.timp.pro";

async function main(): Promise<void> {
  console.log("▶ Login TIMP iniciado");

  const browser = await chromium.launch({
    headless: false, // VER navegador
    slowMo: 50,      // más humano
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(LOGIN_URL, { waitUntil: "networkidle" });

  // Email y contraseña
  await page.fill('input[type="email"]', process.env.TIMP_EMAIL || "");
  await page.fill('input[type="password"]', process.env.TIMP_PASSWORD || "");
  await page.click('button[type="submit"]');

  console.log("⏸️ Script en pausa. Mete el código tranquilamente.");

  // 🔴 AQUÍ SE PARA TODO
  await page.pause();

  // Cuando tú cierres la pausa manualmente:
  await context.storageState({ path: "timp-session.json" });
  console.log("✔ Sesión guardada");

  await browser.close();
  console.log("■ Fin");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
