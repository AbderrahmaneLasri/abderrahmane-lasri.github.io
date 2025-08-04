document.addEventListener("DOMContentLoaded", function () {
  const toggleButtons = document.querySelectorAll(".toggle");
  const toggleDarkModeBtn = document.getElementById("toggleDarkMode");

  toggleButtons.forEach(button => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      content.classList.toggle("open");
    });
  });

  toggleDarkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
});
