const baseUrl = 'http://localhost:3001/api/v1/';

const get = (url) => {
    return fetch(baseUrl + url).then((response) => response.json());
}

const getTravelerData = (travlerId) => {
    return Promise.all([
        get('travelers/'+travlerId),
        get('destinations'),
        get('trips')
    ])
}

const post = (url, data) => {
    return fetch(baseUrl + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        } else {
            return response.json();
        }
    })
}

const remove = (url) => {
    return fetch(baseUrl + url, {
        method: "DELETE",
    }).then((response) => response.json());
}

export { getTravelerData, get, post, remove };