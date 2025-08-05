// ✅ Thème clair/sombre
const themeButton = document.getElementById('toggle-theme');
const body = document.body;

// Charger le thème sauvegardé
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  themeButton.textContent = '☀️ Mode clair';
}

themeButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  themeButton.textContent = isDark ? '☀️ Mode clair' : '🌙 Mode sombre';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ✅ Bouton remonter en haut 🔝
const scrollBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ✅ Animation fade-in au scroll
const fadeIns = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = '0.1s';
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

fadeIns.forEach(section => {
  observer.observe(section);
});

// ✅ Écran d’intro animé
window.addEventListener('load', () => {
  const intro = document.getElementById('intro-screen');
  setTimeout(() => {
    intro.style.display = 'none';
  }, 4000); // Laisse le temps à l’animation d’être visible
});
