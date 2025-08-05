// Preloader Animation
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
  }, 2000); // Disparait après 2 secondes
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
  const progressBar = document.getElementById('progress-bar');
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + '%';

  // Scroll-to-top button visibility
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTop > 300) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

// Scroll-to-top button action
document.getElementById('scroll-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mode Sombre / Clair Toggle
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
  reset: false
});

// Langue Switcher
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

const langToggleBtn = document.createElement('button');
langToggleBtn.id = 'lang-toggle';
langToggleBtn.innerHTML = '<i class="fa-solid fa-globe"></i>';
document.querySelector('.navbar').appendChild(langToggleBtn);

langToggleBtn.addEventListener('click', () => {
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  for (const id in translations[currentLang]) {
    const sectionTitle = document.querySelector(`#${id} h2`);
    if (sectionTitle) {
      const icon = sectionTitle.querySelector('i').outerHTML;
      sectionTitle.innerHTML = `${translations[currentLang][id]} ${icon}`;
    }
  }
});

// Mobile Navbar Toggle (Optional enhancement)
const navToggleBtn = document.createElement('button');
navToggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
navToggleBtn.classList.add('nav-toggle-btn');
document.querySelector('.navbar').appendChild(navToggleBtn);

navToggleBtn.addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth Scroll for Navbar Links
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
