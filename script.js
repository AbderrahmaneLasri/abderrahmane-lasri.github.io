document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const welcome = document.getElementById("welcome-message");

  /* ------------------ INTRO ------------------ */
  body.classList.remove("ready");
  setTimeout(() => welcome.classList.add("fade-out"), 2500);
  setTimeout(() => {
    welcome.remove();
    body.classList.add("ready");
    document.querySelectorAll(".container").forEach(container => {
      container.style.opacity = 0;
      container.style.transform = "translateY(40px)";
      container.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      setTimeout(() => {
        container.style.opacity = 1;
        container.style.transform = "translateY(0)";
      }, 80);
    });
  }, 3500);

  /* ------------------ UTILITAIRE : ACCORDÉON ------------------ */
  function setupAccordion(triggers, isExclusive = false) {
    triggers.forEach(trigger => {
      const content = trigger.nextElementSibling;
      trigger.setAttribute("aria-expanded", "false");
      content.setAttribute("aria-hidden", "true");
      content.style.maxHeight = "0px";
      content.style.overflow = "hidden";
      content.style.transition = "max-height 0.5s ease";

      const toggle = () => {
        const expanded = trigger.getAttribute("aria-expanded") === "true";
        if (isExclusive) {
          triggers.forEach(other => {
            if (other !== trigger) {
              other.setAttribute("aria-expanded", "false");
              const otherContent = other.nextElementSibling;
              otherContent.setAttribute("aria-hidden", "true");
              otherContent.style.maxHeight = "0px";
            }
          });
        }
        if (expanded) {
          trigger.setAttribute("aria-expanded", "false");
          content.setAttribute("aria-hidden", "true");
          content.style.maxHeight = "0px";
        } else {
          trigger.setAttribute("aria-expanded", "true");
          content.setAttribute("aria-hidden", "false");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      };

      trigger.addEventListener("click", toggle);
      trigger.addEventListener("keydown", e => {
        if (["Enter", " "].includes(e.key)) {
          e.preventDefault();
          toggle();
        }
      });
    });
  }

  // Accordéon principal (H2)
  setupAccordion(document.querySelectorAll("h2"));

  // Accordéon sous-sections Certificats (H3, exclusif)
  setupAccordion(document.querySelectorAll("#certificats h3"), true);

  /* ------------------ BOUTON RETOUR HAUT ------------------ */
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = "⬆️";
  scrollBtn.setAttribute("aria-label", "Remonter en haut");
  Object.assign(scrollBtn.style, {
    position: "fixed",
    bottom: "25px",
    right: "25px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "none",
    background: "linear-gradient(135deg, #4ca1af, #2c3e50)",
    color: "#fff",
    fontSize: "1.4rem",
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
    opacity: "0",
    pointerEvents: "none",
    transition: "opacity 0.4s ease, transform 0.2s ease",
    zIndex: "9999"
  });
  scrollBtn.addEventListener("mouseenter", () => scrollBtn.style.transform = "scale(1.15)");
  scrollBtn.addEventListener("mouseleave", () => scrollBtn.style.transform = "scale(1)");
  body.appendChild(scrollBtn);
  scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", () => {
    scrollBtn.style.opacity = window.scrollY > 300 ? "1" : "0";
    scrollBtn.style.pointerEvents = window.scrollY > 300 ? "auto" : "none";
  });

  /* ------------------ BOUTON DARK MODE ------------------ */
  const darkModeBtn = document.createElement("button");
  darkModeBtn.textContent = "🌙";
  darkModeBtn.setAttribute("aria-label", "Basculer le mode sombre");
  Object.assign(darkModeBtn.style, {
    position: "fixed",
    top: "25px",
    right: "25px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#222",
    color: "#fff",
    fontSize: "1.4rem",
    cursor: "pointer",
    boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
    zIndex: "10000",
    transition: "transform 0.3s ease, box-shadow 0.3s ease"
  });
  darkModeBtn.addEventListener("mouseenter", () => {
    darkModeBtn.style.transform = "scale(1.1)";
    darkModeBtn.style.boxShadow = "0 0 15px rgba(255,255,255,0.6)";
  });
  darkModeBtn.addEventListener("mouseleave", () => {
    darkModeBtn.style.transform = "scale(1)";
    darkModeBtn.style.boxShadow = "0 6px 16px rgba(0,0,0,0.25)";
  });
  body.appendChild(darkModeBtn);

  /* ------------------ PARTICULES ------------------ */
  const canvas = document.createElement("canvas");
  canvas.id = "particles-canvas";
  Object.assign(canvas.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "-1",
    transition: "opacity 0.5s ease"
  });
  body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  let particlesArray = [];

  function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray = [];
    const numParticles = Math.floor(window.innerWidth / 25);
    for (let i = 0; i < numParticles; i++) {
      particlesArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    });
    requestAnimationFrame(animateParticles);
  }
  window.addEventListener("resize", initParticles);
  initParticles();
  animateParticles();

  /* ------------------ DARK MODE ------------------ */
  function applyDarkMode(isDark) {
    body.classList.toggle("dark-mode", isDark);
    darkModeBtn.textContent = isDark ? "☀️" : "🌙";
    canvas.style.opacity = isDark ? "0" : "1";
    localStorage.setItem("darkMode", isDark);
  }
  darkModeBtn.addEventListener("click", () => {
    const isDark = !body.classList.contains("dark-mode");
    applyDarkMode(isDark);
  });
  applyDarkMode(localStorage.getItem("darkMode") === "true");

  /* ------------------ PHOTO PROFIL PULSE ------------------ */
  const photo = document.querySelector('.intro img.photo-profil');
  if (photo) {
    let scale = 1, growing = true, animationFrameId = null;
    function animateZoom() {
      if (growing) { scale += 0.003; if (scale >= 1.08) growing = false; }
      else { scale -= 0.003; if (scale <= 1) growing = true; }
      photo.style.transform = `scale(${scale.toFixed(3)})`;
      animationFrameId = requestAnimationFrame(animateZoom);
    }
    photo.addEventListener('mouseenter', () => { if (!animationFrameId) animateZoom(); });
    photo.addEventListener('mouseleave', () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        photo.style.transform = 'scale(1)';
        scale = 1; growing = true;
      }
    });
  }
});
