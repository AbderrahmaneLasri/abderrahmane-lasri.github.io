document.addEventListener("DOMContentLoaded", () => {
  const welcome = document.getElementById("welcome-message");

  // Affiche le contenu principal
  document.body.classList.add("ready");

  // Disparition progressive du message de bienvenue
  setTimeout(() => welcome.classList.add("fade-out"), 3000);
  setTimeout(() => welcome.remove(), 4000);

  // Accordéon des sections (h2 + contenu)
  document.querySelectorAll("h2").forEach((title) => {
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

  // Bouton "Retour en haut"
  const scrollBtn = document.createElement("button");
  scrollBtn.textContent = "↑ Haut";
  scrollBtn.setAttribute("aria-label", "Remonter en haut");
  Object.assign(scrollBtn.style, {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    padding: "0.7rem 1.2rem",
    borderRadius: "50px",
    border: "none",
    backgroundColor: "#4ca1af",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1rem",
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
    display: "none",
    zIndex: "9999",
    transition: "opacity 0.3s ease"
  });

  document.body.appendChild(scrollBtn);

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  // Bouton de bascule du mode sombre
  const darkModeBtn = document.createElement("button");
  darkModeBtn.textContent = "🌙";
  darkModeBtn.setAttribute("aria-label", "Basculer le mode sombre");
  Object.assign(darkModeBtn.style, {
    position: "fixed",
    top: "30px",
    right: "30px",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#222",
    color: "#fff",
    fontSize: "1.2rem",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
    zIndex: "10000",
    transition: "transform 0.3s ease"
  });

  darkModeBtn.addEventListener("mouseenter", () => {
    darkModeBtn.style.transform = "scale(1.1)";
  });

  darkModeBtn.addEventListener("mouseleave", () => {
    darkModeBtn.style.transform = "scale(1)";
  });

  document.body.appendChild(darkModeBtn);

  // Activation/désactivation du mode sombre
  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Style JS dynamique (complément CSS pour + de détails)
  const dynamicStyle = document.createElement("style");
  dynamicStyle.textContent = `
    body.dark-mode {
      background-color: #121212 !important;
      color: #e0e0e0 !important;
    }
    body.dark-mode h2, body.dark-mode p, body.dark-mode li {
      color: #e0e0e0 !important;
    }
    body.dark-mode .btn {
      background-color: #333 !important;
      color: #fff !important;
    }
    body.dark-mode header {
      background-color: #1c1c1c !important;
    }
    body.dark-mode footer {
      background-color: #1a1a1a !important;
    }
  `;
  document.head.appendChild(dynamicStyle);
});
