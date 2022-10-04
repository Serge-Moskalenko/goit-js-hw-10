

export function fetchCountries(request) {

    return fetch(request).then(respons => { return respons.json(); });
};