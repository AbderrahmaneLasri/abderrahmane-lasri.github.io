
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-theme");
  const scrollBtn = document.getElementById("scrollTop");
  const form = document.getElementById("contact-form");
  const message = document.getElementById("form-message");

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
  });

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    message.textContent = "Message envoyé avec succès ! ✅";
    form.reset();
  });
});
