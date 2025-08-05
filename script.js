// ✅ Thème clair/sombre
const themeButton = document.getElementById('toggle-theme');
const body = document.body;

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

// ✅ Animation du texte d’intro "Bienvenue dans mon portfolio"
const introText = "Bienvenue dans mon portfolio !";
const introElement = document.getElementById("intro-text");

let i = 0;
function typeEffect() {
  if (i < introText.length) {
    introElement.textContent += introText.charAt(i);
    i++;
    setTimeout(typeEffect, 60);
  }
}

window.addEventListener("load", () => {
  setTimeout(typeEffect, 500);
});
