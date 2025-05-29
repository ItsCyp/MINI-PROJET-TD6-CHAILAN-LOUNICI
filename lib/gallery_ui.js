import config from "./config.js";

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

        const link = document.createElement("a");
        link.href = config.domain + p.original.href;
        link.target = "_blank";

        const img = document.createElement("img");
        img.src = config.domain + p.thumbnail.href;
        img.alt = p.titre;
        img.setAttribute("data-photoId", p.id);

        link.appendChild(img);
        figure.appendChild(link);

        container.appendChild(figure);
    });
}

export default {
    displayGallery : displayGallery
}
