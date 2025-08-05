document.addEventListener("DOMContentLoaded", () => {
  // Basculer le mode sombre
  const themeToggleBtn = document.getElementById("toggle-theme");

  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    themeToggleBtn.textContent = isDark ? "☀️ Mode clair" : "🌙 Mode sombre";
  });

  // Apparition fluide des sections
  const fadeIns = document.querySelectorAll(".fade-in");

  fadeIns.forEach((el, i) => {
    el.style.animationDelay = `${i * 0.2}s`;
  });
});
