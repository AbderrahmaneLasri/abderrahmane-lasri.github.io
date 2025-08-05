document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-theme");
  const body = document.body;

  // Check localStorage for theme preference
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️ Mode clair";
  }

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      toggleBtn.textContent = "☀️ Mode clair";
      localStorage.setItem("theme", "dark");
    } else {
      toggleBtn.textContent = "🌙 Mode sombre";
      localStorage.setItem("theme", "light");
    }
  });
});
