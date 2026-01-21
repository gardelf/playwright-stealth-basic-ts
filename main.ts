import { chromium } from "playwright-extra";

const LOGIN_URL = "https://panel.timp.pro";

async function main(): Promise<void> {
  console.log("▶ Login TIMP iniciado");

  const browser = await chromium.launch({
    headless: false, // VER navegador
    slowMo: 50,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(LOGIN_URL, { waitUntil: "networkidle" });

  // Login
  await page.fill('input[type="email"]', process.env.TIMP_EMAIL || "");
  await page.fill('input[type="password"]', process.env.TIMP_PASSWORD || "");
  await page.click('button[type="submit"]');

  console.log("⏳ Mete el código con calma. Esperando acceso al panel...");

  // 🔒 ESPERA CLARA A ESTAR DENTRO
  await page.waitForSelector('a[href^="/admins"]', {
    timeout: 180000, // 3 minutos
  });

  console.log("✔ Login confirmado. Guardando sesión...");

  await context.storageState({ path: "timp-session.json" });

  console.log("✔ Sesión guardada correctamente");

  // ⏸️ Pausa opcional para comprobar visualmente
  await page.waitForTimeout(3000);

  await browser.close();
  console.log("■ Fin");
}

main().catch(err => {
  console.error("❌ Error:", err);
  process.exit(1);
});
