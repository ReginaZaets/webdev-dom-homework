const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const userURL = 'https://wedev-api.sky.pro/api/v2/regina-zaets/comments';
const host = 'https://wedev-api.sky.pro/api/v2/regina-zaets/comments';

export function getTodos() {
    return fetch(host, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            return response.json();
        })
};

export function postTodos() {
    return fetch(host, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            text: commentInputElement.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
            name: nameInputElement.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
            // forceError: true,
        })
    })
        .then((response) => {
            if (response.status === 400) {
                throw new Error("Имя и комментарий должны быть больше 3х символов");
            } else if (response.status === 500) {
                throw new Error("Серввер упал");
                // } else if (response.status === '') {
                //   throw new Error('Failed to fetch');
            } else {
                return response.json();
            }
            // if (response.status === 201) {
            //   return response.json();
            // } else {
            //   throw new Error("Серввер упал");
            // }
        })
};

let token;
export const setToken = (newToken) => {
    token = newToken;
};

export function login({ login, password }) {
    return fetch(userURL, {
        method: "POST",
        body: JSON.stringify({
                login,
                password,
            })
    })
        .then((response) => {
            return response.json();
        });
};