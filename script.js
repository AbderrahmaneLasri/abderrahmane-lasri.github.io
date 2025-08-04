// === OUVERTURE / FERMETURE DES RUBRIQUES ===

// Récupère toutes les sections avec la classe .section
document.querySelectorAll('.section').forEach(section => {
  const title = section.querySelector('h2');

  // Événement au clic sur le titre de section
  title.addEventListener('click', () => {
    // Ferme les autres sections ouvertes (facultatif)
    document.querySelectorAll('.section').forEach(s => {
      if (s !== section) {
        s.classList.remove('active');
      }
    });

    // Active ou désactive cette section
    section.classList.toggle('active');
  });
});

// === MODE SOMBRE / MODE CLAIR ===

const darkModeToggle = document.getElementById('darkModeToggle');

// Vérifie si un mode est déjà enregistré dans le localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
}

// Gère le clic sur le bouton
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Enregistre le choix dans le localStorage
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
});
