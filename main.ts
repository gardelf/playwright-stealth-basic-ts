import { chromium } from "playwright-extra";

const LOGIN_URL = "https://panel.timp.pro";

async function main(): Promise<void> {
  console.log("▶ Login TIMP iniciado");

  const browser = await chromium.launch({
    headless: false,
    slowMo: 50,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(LOGIN_URL, { waitUntil: "networkidle" });

  // Login
  await page.fill('input[type="email"]', process.env.TIMP_EMAIL || "");
  await page.fill('input[type="password"]', process.env.TIMP_PASSWORD || "");
  await page.click('button[type="submit"]');

  console.log("🛑 EL SCRIPT ESTÁ PAUSADO");
  console.log("👉 Mete el código");
  console.log("👉 Entra en el panel");
  console.log("👉 NO CIERRES EL NAVEGADOR");
  console.log("👉 Cuando estés dentro, vuelve al terminal");

  // ⛔ PAUSA ABSOLUTA
  await page.pause();

  // 👇 SOLO SE EJECUTA CUANDO TÚ REANUDAS
  console.log("✔ Reanudado. Guardando sesión...");

  await context.storageState({ path: "timp-session.json" });
  console.log("✔ Sesión guardada");

  // ❌ NO CERRAMOS EL BROWSER AUTOMÁTICAMENTE
  console.log("🟢 Puedes cerrar Chromium a mano");
}

main().catch(err => {
  console.error("❌ Error:", err);
  process.exit(1);
});
