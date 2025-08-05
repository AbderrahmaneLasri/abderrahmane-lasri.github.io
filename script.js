// Attendre que le DOM soit entièrement chargé
document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll("section h2");

  headers.forEach((header) => {
    const content = header.nextElementSibling;

    // Définir le style initial
    content.style.display = "block"; // Affiché par défaut

    // Ajouter le curseur pointeur
    header.style.cursor = "pointer";

    // Gestion du clic sur les titres
    header.addEventListener("click", () => {
      const isVisible = content.style.display === "block";
      
      // Animation douce avec opacity + height
      if (isVisible) {
        content.style.opacity = "0";
        setTimeout(() => {
          content.style.display = "none";
        }, 200);
      } else {
        content.style.display = "block";
        content.style.opacity = "0";
        setTimeout(() => {
          content.style.opacity = "1";
        }, 10);
      }
    });
  });
});
