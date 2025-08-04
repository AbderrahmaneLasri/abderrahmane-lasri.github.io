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

  // Scroll top button
  const scrollBtn = document.getElementById("scroll-top");
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 400 ? "block" : "none";
  });
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Dark mode toggle
  const darkBtn = document.getElementById("toggle-dark-mode");
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
  darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
  });

  // Lang toggle
  const translations = {
    fr: {
      "À propos de moi": "About Me",
      "Mon Parcours": "My Journey",
      "Mes Voyages 🌍": "My Travels 🌍",
      "Mes Passions ❤️": "My Passions ❤️",
      "Langues": "Languages",
      "Compétences Techniques": "Technical Skills",
      "Notes de Vie ✍️": "Life Quotes ✍️",
      "Télécharger mon CV": "Download My Resume",
      "Remonter en haut": "Back to Top",
      "Mode Sombre": "Dark Mode"
    },
    en: {}
  };
  for (const key in translations.fr) {
    translations.en[translations.fr[key]] = key;
  }

  let currentLang = "fr";
  const langBtn = document.getElementById("lang-toggle");
  langBtn.addEventListener("click", () => {
    const map = translations[currentLang];
    document.querySelectorAll("h2, button, a, p, li, strong, blockquote").forEach(el => {
      const text = el.textContent.trim();
      if (map[text]) el.textContent = map[text];
    });
    currentLang = currentLang === "fr" ? "en" : "fr";
    langBtn.textContent = currentLang === "fr" ? "🇬🇧 English" : "🇫🇷 Français";
  });

  // Fade in on scroll
  const faders = document.querySelectorAll('.toggle-content');
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  faders.forEach(fader => {
    fader.classList.add('fade-in');
    appearOnScroll.observe(fader);
  });

  // Bienvenue message
  const welcome = document.createElement("div");
  welcome.textContent = "👋 Bienvenue ! Faites défiler pour découvrir mon univers.";
  Object.assign(welcome.style, {
    position: "fixed",
    top: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#4ca1af",
    color: "white",
    padding: "10px 20px",
    borderRadius: "30px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    zIndex: 1001,
    opacity: "0",
    transition: "opacity 0.8s"
  });
  document.body.appendChild(welcome);
  setTimeout(() => { welcome.style.opacity = "1"; }, 500);
  setTimeout(() => { welcome.style.opacity = "0"; }, 5000);

  // Fade in page
  document.body.style.opacity = 0;
  document.body.style.transition = "opacity 1s ease-in-out";
  requestAnimationFrame(() => {
    document.body.style.opacity = 1;
  });
});
