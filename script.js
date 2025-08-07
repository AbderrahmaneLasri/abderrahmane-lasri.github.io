document.addEventListener("DOMContentLoaded", () => {
  // --- Message de bienvenue ---
  const welcome = document.getElementById("welcome-message");

  // Affiche le contenu principal en ajoutant une classe "ready"
  document.body.classList.add("ready");

  // Disparition progressive du message de bienvenue après 3 secondes
  setTimeout(() => welcome.classList.add("fade-out"), 3000);
  // Suppression totale du message après 4 secondes
  setTimeout(() => welcome.remove(), 4000);

  // --- Accordéon des sections ---
  // Pour chaque <h2>, on permet d'ouvrir/fermer son contenu adjacent
  document.querySelectorAll("h2").forEach((title) => {
    const content = title.nextElementSibling;

    const toggle = () => {
      // Gère l'état "aria-expanded" pour accessibilité
      const expanded = title.getAttribute("aria-expanded") === "true";
      title.setAttribute("aria-expanded", String(!expanded));
      content.classList.toggle("open");
    };

    // Toggle au clic
    title.addEventListener("click", toggle);
    // Toggle au clavier (Entrée ou Espace)
    title.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  });

  // --- Bouton "Retour en haut" ---
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

  // Scroll doux vers le haut au clic
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Affiche le bouton seulement si on a scrollé de plus de 300px
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  // --- Bouton de bascule du mode sombre ---
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

  // Animation légère au survol
  darkModeBtn.addEventListener("mouseenter", () => {
    darkModeBtn.style.transform = "scale(1.1)";
  });
  darkModeBtn.addEventListener("mouseleave", () => {
    darkModeBtn.style.transform = "scale(1)";
  });
  document.body.appendChild(darkModeBtn);

  // Activation/désactivation du mode sombre et gestion des particules
  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      canvas.style.opacity = "0"; // Cache les particules en mode sombre
    } else {
      canvas.style.opacity = "1"; // Affiche les particules en mode clair
    }
  });

  // --- Styles dynamiques complémentaires pour le mode sombre ---
  const dynamicStyle = document.createElement("style");
  dynamicStyle.textContent = `
    body.dark-mode {
      background-color: #121212 !important;
      color: #e0e0e0 !important;
    }
    body.dark-mode h2, 
    body.dark-mode p, 
    body.dark-mode li {
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

  // --- Animation particules lumineuses en fond ---
  const canvas = document.createElement("canvas");
  canvas.id = "particles-canvas";
  Object.assign(canvas.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    pointerEvents: "none", // Ne pas gêner les clics
    zIndex: "-1",
    transition: "opacity 0.5s ease"
  });
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let particlesArray;

  // Initialise les particules avec position, vitesse, taille, opacité aléatoires
  function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray = [];

    const numParticles = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < numParticles; i++) {
      particlesArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  }

  // Animation continue : dessine et déplace les particules
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach(p => {
      ctx.beginPath();
      // Dégradé radial lumineux
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 5);
      gradient.addColorStop(0, `rgba(255,255,255,${p.opacity})`);
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      // Déplacement selon vitesse
      p.x += p.speedX;
      p.y += p.speedY;

      // Rebond sur les bords du canvas
      if (p.x < 0 || p.x > canvas.width) p.speedX = -p.speedX;
      if (p.y < 0 || p.y > canvas.height) p.speedY = -p.speedY;
    });

    requestAnimationFrame(animateParticles);
  }

  // Réinitialisation des particules à la redimension du viewport
  window.addEventListener("resize", () => {
    initParticles();
  });

  initParticles();
  animateParticles();

  // --- Zoom progressif et pulsant sur la photo de profil ---
  const photo = document.querySelector('.intro img.photo-profil');
  if (photo) {
    let scale = 1;
    let growing = true;
    let animationFrameId = null;

    // Animation qui augmente/reduit la taille pour effet pulsant
    function animateZoom() {
      if (growing) {
        scale += 0.005;
        if (scale >= 1.1) growing = false;
      } else {
        scale -= 0.005;
        if (scale <= 1) growing = true;
      }
      photo.style.transform = `scale(${scale.toFixed(3)})`;
      animationFrameId = requestAnimationFrame(animateZoom);
    }

    // Démarrer l’animation au survol
    photo.addEventListener('mouseenter', () => {
      if (!animationFrameId) {
        animateZoom();
      }
    });

    // Arrêter l’animation au départ du survol et revenir à l’état initial
    photo.addEventListener('mouseleave', () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        scale = 1;
        photo.style.transform = 'scale(1)';
      }
    });
  }
});
