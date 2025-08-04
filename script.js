document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("h2");

  sections.forEach((title) => {
    const content = title.nextElementSibling;

    // Cliquez ou appuyez sur Entrée pour ouvrir/fermer la section
    const toggle = () => {
      const expanded = title.getAttribute("aria-expanded") === "true";
      title.setAttribute("aria-expanded", String(!expanded));
      content.classList.toggle("open");
    };

    title.addEventListener("click", toggle);

    title.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  });

  // Ajout d’un bouton pour remonter en haut
  const scrollBtn = document.createElement("button");
  scrollBtn.textContent = "↑ Haut";
  scrollBtn.setAttribute("aria-label", "Remonter en haut");
  scrollBtn.style.position = "fixed";
  scrollBtn.style.bottom = "30px";
  scrollBtn.style.right = "30px";
  scrollBtn.style.padding = "0.7rem 1rem";
  scrollBtn.style.borderRadius = "50px";
  scrollBtn.style.border = "none";
  scrollBtn.style.backgroundColor = "#4ca1af";
  scrollBtn.style.color = "#fff";
  scrollBtn.style.fontWeight = "bold";
  scrollBtn.style.cursor = "pointer";
  scrollBtn.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
  scrollBtn.style.display = "none";
  scrollBtn.style.zIndex = "999";

  document.body.appendChild(scrollBtn);

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 400 ? "block" : "none";
  });
});