document.addEventListener("DOMContentLoaded", () => {
  const langToggle = document.getElementById("lang-toggle");
  let isEnglish = false;

  langToggle.addEventListener("click", () => {
    const textsFr = [
      "À propos de moi", "Mon Parcours", "Stages", "Projets Académiques",
      "Mes Voyages", "Mes Passions", "Langues", "Compétences Techniques", "Notes de Vie ✍️",
      "Présentation personnelle ici.", "Détails sur le parcours académique et professionnel.",
      "Description de mes expériences à l'international.",
      "Description de mes centres d'intérêt personnels.",
      "Français - Langue maternelle", "Anglais - Avancé", "Espagnol - Intermédiaire",
      "Programmation (Python, C++)", "CAO (SolidWorks, CATIA)", "Gestion de projet (MS Project, Trello)",
      "“La réussite appartient à tout le monde. C’est au travail d’équipe qu’en revient le mérite.”"
    ];

    const textsEn = [
      "About Me", "My Background", "Internships", "Academic Projects",
      "My Travels", "My Passions", "Languages", "Technical Skills", "Life Notes ✍️",
      "Personal introduction here.", "Details about academic and professional background.",
      "Description of my international experiences.",
      "Description of my personal interests.",
      "French - Native", "English - Advanced", "Spanish - Intermediate",
      "Programming (Python, C++)", "CAD (SolidWorks, CATIA)", "Project Management (MS Project, Trello)",
      "“Success belongs to everyone. It is teamwork that deserves the credit.”"
    ];

    document.querySelectorAll("h2, .toggle-content p, .toggle-content li, blockquote").forEach((el, i) => {
      el.innerHTML = isEnglish ? textsFr[i] : textsEn[i];
    });

    langToggle.textContent = isEnglish ? "🇬🇧 English" : "🇫🇷 Français";
    isEnglish = !isEnglish;
  });

  // Scroll button
  const scrollTop = document.getElementById("scroll-top");
  window.addEventListener("scroll", () => {
    scrollTop.style.display = window.scrollY > 300 ? "block" : "none";
  });
  scrollTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Mode sombre
  const darkToggle = document.getElementById("toggle-dark-mode");
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Ouvrir/fermer contenu au clic sur les titres
  document.querySelectorAll("h2").forEach(h2 => {
    h2.addEventListener("click", () => {
      h2.nextElementSibling.classList.toggle("open");
    });
  });

  // Effet de fade-in au chargement
  document.body.style.opacity = 0;
  document.body.style.transition = "opacity 1s ease-in-out";
  requestAnimationFrame(() => {
    document.body.style.opacity = 1;
  });
});
