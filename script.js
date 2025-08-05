document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-theme");
  const body = document.body;

  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️ Mode clair";
  }

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const mode = body.classList.contains("dark-mode") ? "dark" : "light";
    toggleBtn.textContent = mode === "dark" ? "☀️ Mode clair" : "🌙 Mode sombre";
    localStorage.setItem("theme", mode);
  });

  // Form submission (demo purpose)
  const form = document.getElementById("contact-form");
  const msg = document.getElementById("form-message");

  form.addEventListener("submit", e => {
    e.preventDefault();
    msg.textContent = "✅ Merci ! Votre message a été envoyé.";
    form.reset();

    setTimeout(() => {
      msg.textContent = "";
    }, 5000);
  });
});
