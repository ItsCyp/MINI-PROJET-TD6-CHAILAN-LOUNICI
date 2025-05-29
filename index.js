import photoloader from "./lib/photoloader.js";
import ui from "./lib/ui.js";
import gallery from "./lib/gallery.js";
import galleryUi from "./lib/gallery_ui.js";

async function getPicture(id) {
    let res = await photoloader.loadPicture(id);
    console.log(res);
    console.log(res.photo.titre);
    console.log(res.photo.descr);
    console.log(res.photo.type);
    console.log(res.photo.url.href);
    ui.displayPicture(res.photo);
    
    let cat = await getCategory(res);
    console.log(cat);
    console.log(cat.nom);
    console.log(cat.id);
    console.log(cat.descr);
    ui.displayCategory(cat);

    let comments = await getComments(res);
    console.log(comments);
    ui.displayComments(comments);
}

async function getCategory(picture) {
    return new Promise(async (resolve, reject) => {
        let cat = await photoloader.loadResource(picture.links.categorie.href);
        if (cat.categorie) {    
            resolve(cat.categorie);
        } else {
            reject(new Error("Category not found"));
        }
    });
}

async function getComments(picture) {
    return new Promise(async (resolve, reject) => {
        let comments = await photoloader.loadResource(picture.links.comments.href);
        if(comments.comments) {
            resolve(comments.comments);
        } else {
            reject(new Error("Comments not found"));
        }
    });
}

const onError = err => console.error('Erreur galerie :', err);

const actions = {
    loadGallery: gallery.load,
    first:       gallery.first,
    prev:        gallery.prev,
    next:        gallery.next,
    last:        gallery.last,
};
  

document.querySelectorAll("#gallery-nav button").forEach(button => {
    button.addEventListener("click", () => {
        const action = actions[button.id];
        if (action) {
            action()
                .then(data => {
                    galleryUi.displayGallery(data);
                })
                .catch(onError);
        }
    });
});


getPicture(window.location.hash ? window.location.hash.substr(1): 105);
