import config from "./config.js";
import photoloader from "./photoloader.js";
import ui from "./ui.js"; 

function displayGallery(gallery) {
  const container = document.querySelector("section#gallery");
  if (!container) {
    console.error("Container not found");
    return;
  }

  container.innerHTML = "";
  gallery.photos.forEach(item => {
    const p = item.photo;
    const figure = document.createElement("figure");
    figure.classList.add("thumbnail");

    const img = document.createElement("img");
    img.src = config.domain + p.thumbnail.href;
    img.alt = p.titre;
    img.dataset.photoId = p.id;

    img.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        const data = await photoloader.loadPicture(p.id);
        ui.displayPicture(data.photo);
      } catch (err) {
        console.error("Erreur chargement photo :", err);
      }
    });

    figure.appendChild(img);
    container.appendChild(figure);
  });
}

export default {
  displayGallery
};
