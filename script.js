document.addEventListener("DOMContentLoaded", () => {
  // Affichage du message de bienvenue et effet fade-in du body
  const welcome = document.getElementById("welcome-message");
  document.body.style.opacity = 0;

  setTimeout(() => {
    welcome.classList.add("fade-out");
  }, 3000); // Disparait après 3s

  setTimeout(() => {
    if (welcome.parentNode) welcome.parentNode.removeChild(welcome);
    document.body.style.opacity = 1;
  }, 4000); // Après 4s total

  // Comportement des sections accordéon
  const headers = document.querySelectorAll("h2.toggle-header");
  headers.forEach((title) => {
    const content = title.nextElementSibling;
    const chevron = title.querySelector(".chevron");

    const toggle = () => {
      const expanded = title.getAttribute("aria-expanded") === "true";
      title.setAttribute("aria-expanded", String(!expanded));
      content.classList.toggle("open");
      if (chevron) {
        chevron.style.transform = content.classList.contains("open")
          ? "rotate(180deg)"
          : "rotate(0deg)";
      }
    };

    title.addEventListener("click", toggle);
    title.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  });

  // Bouton retour en haut
  const scrollBtn = document.createElement("button");
  scrollBtn.textContent = "↑ Haut";
  scrollBtn.setAttribute("aria-label", "Remonter en haut");
  Object.assign(scrollBtn.style, {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    padding: "0.7rem 1rem",
    borderRadius: "50px",
    border: "none",
    backgroundColor: "#4ca1af",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    display: "none",
    zIndex: "999"
  });

  document.body.appendChild(scrollBtn);

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 400 ? "block" : "none";
  });

  // Bouton mode sombre
  const darkModeBtn = document.createElement("button");
  darkModeBtn.textContent = "🌙 Mode Sombre";
  darkModeBtn.setAttribute("aria-label", "Activer/désactiver le mode sombre");
  Object.assign(darkModeBtn.style, {
    position: "fixed",
    top: "30px",
    right: "30px",
    padding: "0.5rem 1rem",
    borderRadius: "50px",
    border: "none",
    backgroundColor: "#222",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    zIndex: "1000"
  });

  document.body.appendChild(darkModeBtn);

  // Persistance du mode sombre (optionnel)
  if (localStorage.getItem("dark-mode") === "true") {
    document.body.classList.add("dark-mode");
  }

  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode"));
  });

  // Style dynamique pour le mode sombre (pour JS-injecté uniquement)
  const style = document.createElement("style");
  style.textContent = `
    body.dark-mode {
      background-color: #121212;
      color: #e0e0e0;
      transition: background-color 0.4s, color 0.4s;
    }
    body.dark-mode h2, body.dark-mode p, body.dark-mode li {
      color: #e0e0e0;
    }
    body.dark-mode .btn {
      background-color: #444 !important;
      color: #fff !important;
    }
  `;
  document.head.appendChild(style);
});
