import photoloader from "./photoloader.js";
import config from "./config.js";

let currentPage = null; // stocker la page courante

/**
 * Charge la première page de la galerie.
 * @returns {Promise<Object>} l’objet JSON renvoyé par l’API
 */
function load() {
    return photoloader.loadResource(config.URI + "/photos")
      .then(data => {
        currentPage = data;
        return data;
      });
}

/** Navigue via currentPage.links[rel] */
function navigate(rel) {
    if (!currentPage || !currentPage.links[rel]) {
      return Promise.reject(new Error(`Pas de lien '${rel}' disponible.`));
    }
    const href = currentPage.links[rel].href; 
    return photoloader
      .loadResource(href)  
      .then(data => {
        currentPage = data;
        return data;
      });
  }
  

function next() { return navigate("next"); }

function prev() { return navigate("prev"); }

function first() { return navigate("first"); }

function last() { return navigate("last"); }


export default {
    load : load,
    next : next,
    prev : prev,
    first : first,
    last : last
}
