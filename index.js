import photoloader from "./lib/photoloader.js";
import ui from "./lib/ui.js";

async function getPicture(id) {
    let res = await photoloader.loadPicture(id);
    console.log(res);
    console.log(res.photo.titre);
    console.log(res.photo.descr);
    console.log(res.photo.type);
    console.log(res.photo.url.href);
    ui.displayPicture(res.photo);

    let cat = await photoloader.loadResource(res.links.categorie.href);
    console.log(cat);
    console.log(cat.categorie.nom);
    console.log(cat.categorie.id);
    console.log(cat.categorie.descr);
    ui.displayCategory(cat.categorie);

    let comments = await photoloader.loadResource(res.links.comments.href);
    console.log(comments);
    ui.displayComments(comments.comments);
}

getPicture(window.location.hash ? window.location.hash.substr(1): 105);
