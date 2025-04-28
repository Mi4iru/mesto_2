const token = "1ef92f0f-4707-407d-8195-8d32e9d69658";
const group_id = "apf-cohort-202";

const config = {
    baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202',
    headers: {
        authorization: '1ef92f0f-4707-407d-8195-8d32e9d69658',
        'Content-Type': 'application/json'
    }
};

function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => res.json())
            .then((res) => {
                return res
            })
}

function fillProfile() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res => res.json())
            .then(res => {
                return res
            })
}

function editProfile(name, description) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: description
        })
    })
}

export {getInitialCards, fillProfile, editProfile}