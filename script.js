
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("h2");

  sections.forEach((h2) => {
    h2.addEventListener("click", function () {
      const content = this.nextElementSibling;
      content.classList.toggle("open");

      const expanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !expanded);
    });
  });

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "🌙 Mode sombre / clair";
  toggleBtn.className = "btn";
  document.querySelector("header .container").appendChild(toggleBtn);

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
});
