import config from "./config.js";

function loadPicture(id) {
    return fetch(config.URL +"/photos/" + id)
        .then(response => {
            if (response.ok) return response.json();
        })
        .catch(console.log);
}

function loadResource(uri) {
    return fetch(config.domain + uri)
        .then(response => {
            if (response.ok) return response.json();
        })
        .catch(console.log);
}

export default {
    loadPicture : loadPicture,
    loadResource : loadResource
}