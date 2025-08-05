// 🌙 Bascule entre mode clair et sombre
const toggleThemeBtn = document.getElementById("toggle-theme");
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggleThemeBtn.textContent = document.body.classList.contains("dark-mode")
    ? "☀️ Mode clair"
    : "🌙 Mode sombre";
});

// 🔝 Bouton retour en haut
const scrollBtn = document.getElementById("scroll-top");
window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ⌨️ Animation du texte d’accueil
const introText = "Bienvenue dans mon portfolio !";
const introElement = document.getElementById("intro-text");
let i = 0;
function typeEffect() {
  if (i < introText.length) {
    introElement.textContent += introText.charAt(i);
    i++;
    setTimeout(typeEffect, 60);
  }
}
window.addEventListener("load", () => {
  setTimeout(typeEffect, 500);
});

// 🌐 Changement de langue FR / EN
const languageToggleBtn = document.getElementById("language-toggle");
let currentLanguage = "fr";

languageToggleBtn.addEventListener("click", () => {
  currentLanguage = currentLanguage === "fr" ? "en" : "fr";
  toggleLanguage(currentLanguage);
  languageToggleBtn.textContent = currentLanguage === "fr" ? "🇫🇷/🇬🇧" : "🇬🇧/🇫🇷";
});

function toggleLanguage(lang) {
  const elements = document.querySelectorAll("[data-fr]");
  elements.forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) el.textContent = text;
  });
}
