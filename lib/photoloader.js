import config from "./config.js";

function loadPicture(id) {
    return fetch(config.URL +"/photos/" + id, { credentials: 'include' })
        .then(response => {
            if (response.ok) return response.json();
        })
        .catch(console.log);
}

function loadResource(uri) {
    return new Promise((resolve, reject) => {
        fetch(config.domain + uri, { credentials: 'include' })
            .then(response => {
                if (response.ok) {
                    response.json().then(resolve);
                } else {
                    reject(new Error('Network response was not ok'));
                }
            })
            .catch(reject);
    });
}

export default {
    loadPicture : loadPicture,
    loadResource : loadResource
}