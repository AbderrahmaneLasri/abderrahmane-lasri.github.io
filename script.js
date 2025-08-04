document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("h2");

  sections.forEach((title) => {
    const content = title.nextElementSibling;

    const toggle = () => {
      const expanded = title.getAttribute("aria-expanded") === "true";
      title.setAttribute("aria-expanded", String(!expanded));
      content.classList.toggle("open");
    };

    title.addEventListener("click", toggle);

    title.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  });

  // Bouton de retour en haut
  const scrollBtn = document.createElement("button");
  scrollBtn.textContent = "↑ Haut";
  scrollBtn.setAttribute("aria-label", "Remonter en haut");
  scrollBtn.style.position = "fixed";
  scrollBtn.style.bottom = "30px";
  scrollBtn.style.right = "30px";
  scrollBtn.style.padding = "0.7rem 1rem";
  scrollBtn.style.borderRadius = "50px";
  scrollBtn.style.border = "none";
  scrollBtn.style.backgroundColor = "#4ca1af";
  scrollBtn.style.color = "#fff";
  scrollBtn.style.fontWeight = "bold";
  scrollBtn.style.cursor = "pointer";
  scrollBtn.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
  scrollBtn.style.display = "none";
  scrollBtn.style.zIndex = "999";

  document.body.appendChild(scrollBtn);

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 400 ? "block" : "none";
  });

  // Bouton de mode sombre
  const darkModeBtn = document.createElement("button");
  darkModeBtn.textContent = "🌙 Mode Sombre";
  darkModeBtn.setAttribute("aria-label", "Activer/désactiver le mode sombre");
  darkModeBtn.style.position = "fixed";
  darkModeBtn.style.top = "30px";
  darkModeBtn.style.right = "30px";
  darkModeBtn.style.padding = "0.5rem 1rem";
  darkModeBtn.style.borderRadius = "50px";
  darkModeBtn.style.border = "none";
  darkModeBtn.style.backgroundColor = "#222";
  darkModeBtn.style.color = "#fff";
  darkModeBtn.style.fontWeight = "bold";
  darkModeBtn.style.cursor = "pointer";
  darkModeBtn.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
  darkModeBtn.style.zIndex = "1000";

  document.body.appendChild(darkModeBtn);

  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Appliquer les styles du mode sombre
  const style = document.createElement("style");
  style.textContent = `
    body.dark-mode {
      background-color: #121212;
      color: #e0e0e0;
      transition: background-color 0.4s, color 0.4s;
    }
    body.dark-mode h2, body.dark-mode p {
      color: #e0e0e0;
    }
    body.dark-mode button {
      background-color: #444 !important;
      color: #fff !important;
    }
  `;
  document.head.appendChild(style);

  // Effet de transition intelligente à l'ouverture
  document.body.style.opacity = 0;
  document.body.style.transition = "opacity 1s ease-in-out";
  window.requestAnimationFrame(() => {
    document.body.style.opacity = 1;
  });
});
