// Helpers
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

/** THEME **/
(function initTheme() {
  const saved = localStorage.getItem("theme");
  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  const theme = saved || (prefersLight ? "light" : "dark");
  document.documentElement.dataset.theme = theme;
  updateThemeIcon();
})();

function updateThemeIcon(){
  const btn = $("#themeBtn");
  if(!btn) return;
  const theme = document.documentElement.dataset.theme;
  btn.textContent = theme === "light" ? "🌙" : "☀️";
}

$("#themeBtn")?.addEventListener("click", () => {
  const current = document.documentElement.dataset.theme || "dark";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("theme", next);
  updateThemeIcon();
});

/** MOBILE MENU **/
const menuBtn = $("#menuBtn");
const nav = $("#nav");

menuBtn?.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuBtn.setAttribute("aria-expanded", String(open));
});

$$(".nav__link").forEach(link => {
  link.addEventListener("click", () => {
    nav?.classList.remove("is-open");
    menuBtn?.setAttribute("aria-expanded", "false");
  });
});

/** PROJECT FILTER **/
const filters = $$(".filter");
const cards = $$("#projectGrid .card--project");

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    const f = btn.dataset.filter;
    cards.forEach(card => {
      const tags = (card.dataset.tags || "").split(/\s+/);
      const show = f === "all" || tags.includes(f);
      card.style.display = show ? "" : "none";
    });
  });
});

/** COPY EMAIL **/
$("#copyEmailBtn")?.addEventListener("click", async () => {
  const email = $("#emailText")?.textContent?.trim() || "";
  const msg = $("#copyMsg");
  if (!email) return;

  try {
    await navigator.clipboard.writeText(email);
    if (msg) msg.textContent = "✅ Copiado al portapapeles.";
  } catch {
    if (msg) msg.textContent = "No pude copiar automáticamente. Cópialo manualmente.";
  }
  setTimeout(() => { if (msg) msg.textContent = ""; }, 2500);
});

/** FAKE SEND **/
$("#fakeSendBtn")?.addEventListener("click", () => {
  alert("Formulario demo ✅\nSi quieres, te lo conecto a Formspree/Netlify Forms.");
});

/** BACK TO TOP **/
const toTop = $("#toTopBtn");
window.addEventListener("scroll", () => {
  const show = window.scrollY > 600;
  toTop?.classList.toggle("show", show);
});
toTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/** FOOTER YEAR **/
$("#year")?.textContent = String(new Date().getFullYear());
