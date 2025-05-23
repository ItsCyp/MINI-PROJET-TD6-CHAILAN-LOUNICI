import Handlebars from "handlebars";
import config from "./config.js";

function displayPicture(picture) {
    const template = document.querySelector("#photoTemplate").innerHTML;
    let templateCompiled = Handlebars.compile(template);
    
    picture.url.href = config.domain + picture.url.href;

    document.querySelector("section#la_photo").innerHTML = templateCompiled(picture);
}

function displayCategory(category) {
    document.querySelector("#la_categorie").innerHTML = `categorie : ${category.nom}`;
}

function displayComments(comments) {
    document.querySelector("#les_commentaires").innerHTML = comments.map(comment => `<li>(${comment.pseudo}) : ${comment.content}</li>`).join("");
}

export default {
    displayPicture : displayPicture,
    displayCategory : displayCategory,
    displayComments : displayComments
}
