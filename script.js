// --- PRELOADER ---
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
  }, 2500);
});

// --- SCROLL PROGRESS BAR & SCROLL-TO-TOP BUTTON ---
window.addEventListener('scroll', () => {
  const progressBar = document.getElementById('progress-bar');
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + '%';

  const scrollTopBtn = document.getElementById('scroll-top');
  scrollTopBtn.style.display = scrollTop > 300 ? 'block' : 'none';
});

// Scroll to top on button click
document.getElementById('scroll-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- THEME TOGGLE (LIGHT / DARK) ---
const themeToggle = document.getElementById('toggle-theme');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const icon = themeToggle.querySelector('i');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');

  // Save preference
  if(document.body.classList.contains('dark-mode')){
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// Apply saved theme on load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if(savedTheme === 'dark'){
    document.body.classList.add('dark-mode');
    const icon = themeToggle.querySelector('i');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
});

// --- RESPONSIVE NAVIGATION TOGGLE ---
const navToggleBtn = document.createElement('button');
navToggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
navToggleBtn.classList.add('nav-toggle-btn');
document.querySelector('.nav-actions').prepend(navToggleBtn);

navToggleBtn.setAttribute('aria-label', 'Toggle navigation menu');
navToggleBtn.setAttribute('aria-expanded', 'false');
navToggleBtn.setAttribute('aria-controls', 'nav-links');

navToggleBtn.addEventListener('click', () => {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
  const expanded = navToggleBtn.getAttribute('aria-expanded') === 'true';
  navToggleBtn.setAttribute('aria-expanded', !expanded);
});

// --- SMOOTH SCROLL ON NAV LINKS ---
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetEl = document.getElementById(targetId);
    if(targetEl){
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu on small screen
    if (window.innerWidth <= 768) {
      document.querySelector('.nav-links').classList.remove('active');
      navToggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
});

// --- CUSTOM SCROLL REVEAL ANIMATION ---
const revealElements = document.querySelectorAll('.section');

const revealOnScroll = () => {
  const windowBottom = window.innerHeight + window.scrollY;
  revealElements.forEach(el => {
    const elTop = el.offsetTop;
    if(windowBottom > elTop + 100){ // Trigger 100px before element top
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
      el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    }
  });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// --- DYNAMIC LANGUAGE SWITCH (FR / EN) ---
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
  // Optionally update button text
  document.getElementById('toggle-lang').textContent = currentLang === 'fr' ? 'EN' : 'FR';
});

// --- Accessibility improvements ---
document.querySelectorAll('button, a').forEach(elem => {
  elem.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      elem.click();
    }
  });
});
