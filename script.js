document.addEventListener("DOMContentLoaded", () => {
  const welcome = document.getElementById("welcome-message");

  // Afficher le contenu principal après intro
  document.body.classList.add("ready");

  // Disparition progressive du message de bienvenue
  setTimeout(() => welcome.classList.add("fade-out"), 3000);
  setTimeout(() => welcome.remove(), 4000);

  /* ------------------ ACCORDÉON ------------------ */
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

  /* ------------------ BOUTON RETOUR HAUT ------------------ */
  const scrollBtn = document.createElement("button");
  scrollBtn.textContent = "↑";
  scrollBtn.setAttribute("aria-label", "Remonter en haut");
  Object.assign(scrollBtn.style, {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    padding: "0.7rem 1.2rem",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#4ca1af",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1.2rem",
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
    opacity: "0",
    pointerEvents: "none",
    transition: "opacity 0.4s ease",
    zIndex: "9999"
  });
  document.body.appendChild(scrollBtn);

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.style.opacity = "1";
      scrollBtn.style.pointerEvents = "auto";
    } else {
      scrollBtn.style.opacity = "0";
      scrollBtn.style.pointerEvents = "none";
    }
  });

  /* ------------------ BOUTON DARK MODE ------------------ */
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
    fontSize: "1.3rem",
    cursor: "pointer",
    boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
    zIndex: "10000",
    transition: "transform 0.4s ease, box-shadow 0.4s ease"
  });

  darkModeBtn.addEventListener("mouseenter", () => {
    darkModeBtn.style.transform = "rotate(15deg) scale(1.1)";
    darkModeBtn.style.boxShadow = "0 0 15px rgba(255,255,255,0.5)";
  });

  darkModeBtn.addEventListener("mouseleave", () => {
    darkModeBtn.style.transform = "rotate(0) scale(1)";
    darkModeBtn.style.boxShadow = "0 6px 16px rgba(0,0,0,0.25)";
  });

  document.body.appendChild(darkModeBtn);

  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";

    canvas.style.opacity = document.body.classList.contains("dark-mode") ? "0" : "1";
  });

  /* ------------------ PARTICULES ------------------ */
  const canvas = document.createElement("canvas");
  canvas.id = "particles-canvas";
  Object.assign(canvas.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    pointerEvents: "none",
    zIndex: "-1",
    transition: "opacity 0.5s ease"
  });
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let particlesArray = [];
  let mouse = { x: null, y: null };

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
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach(p => {
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
      gradient.addColorStop(0, `rgba(255,255,255,${p.opacity})`);
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      // mouvement
      p.x += p.speedX;
      p.y += p.speedY;

      // interaction avec la souris
      if (mouse.x && Math.hypot(p.x - mouse.x, p.y - mouse.y) < 80) {
        p.x += (p.x - mouse.x) * 0.02;
        p.y += (p.y - mouse.y) * 0.02;
      }

      // rebonds
      if (p.x < 0 || p.x > canvas.width) p.speedX = -p.speedX;
      if (p.y < 0 || p.y > canvas.height) p.speedY = -p.speedY;
    });

    requestAnimationFrame(animateParticles);
  }

  window.addEventListener("resize", initParticles);
  window.addEventListener("mousemove", e => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  initParticles();
  animateParticles();

  /* ------------------ PHOTO PROFIL PULSE ------------------ */
  const photo = document.querySelector('.intro img.photo-profil');
  if (photo) {
    let scale = 1;
    let growing = true;
    let animationFrameId = null;

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

    photo.addEventListener('mouseenter', () => {
      if (!animationFrameId) animateZoom();
    });

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
