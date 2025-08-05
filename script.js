// Mode sombre
const toggleBtn = document.getElementById("toggle-theme");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Scroll to top
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Form handling
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("form-message").textContent = "Message envoyé ✅ (fonctionnalité de test)";
  this.reset();
});
