// Preloader Effect
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
  }, 2500);
});

// Scroll Progress Bar & Scroll to Top Button
window.addEventListener('scroll', () => {
  const progressBar = document.getElementById('progress-bar');
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + '%';

  const scrollTopBtn = document.getElementById('scroll-top');
  scrollTopBtn.style.display = scrollTop > 300 ? 'block' : 'none';
});

// Scroll to Top Button Click
document.getElementById('scroll-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Theme Toggle (Light/Dark)
const themeToggle = document.getElementById('toggle-theme');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const icon = themeToggle.querySelector('i');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
});

// ScrollReveal Animations
ScrollReveal().reveal('.section', {
  origin: 'bottom',
  distance: '50px',
  duration: 1000,
  easing: 'ease-in-out',
  interval: 200,
  reset: false
});

// Dynamic Language Switch
let currentLang = 'fr';
const translations = {
  en: {
    'a-propos': 'About Me',
    'parcours': 'My Journey',
    'voyages': 'My Travels',
    'passions': 'My Passions',
    'langues': 'Languages',
    'competences': 'Technical Skills',
    'notes': 'Life Quotes'
  },
  fr: {
    'a-propos': 'À propos de moi',
    'parcours': 'Mon Parcours',
    'voyages': 'Mes Voyages',
    'passions': 'Mes Passions',
    'langues': 'Langues',
    'competences': 'Compétences Techniques',
    'notes': 'Notes de Vie'
  }
};

document.getElementById('toggle-lang').addEventListener('click', () => {
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  for (const id in translations[currentLang]) {
    const sectionTitle = document.querySelector(`#${id} h2`);
    if (sectionTitle) sectionTitle.textContent = translations[currentLang][id];
  }
});

// Responsive Navigation Toggle
const navToggleBtn = document.createElement('button');
navToggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
navToggleBtn.classList.add('nav-toggle-btn');
document.querySelector('.nav-container').appendChild(navToggleBtn);

navToggleBtn.addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth Scroll on Nav Links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    if (window.innerWidth <= 768) {
      document.querySelector('.nav-links').classList.remove('active');
    }
  });
});
