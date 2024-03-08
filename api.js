

const host = "https://wedev-api.sky.pro/api/v2/regina-zaets/comments";
const userUrl = "https://wedev-api.sky.pro/api/user/login";
const userUrlReg = "https://wedev-api.sky.pro/api/user";

export let token;

export const setToken = (newToken) => {
    token = newToken;
}

export function getTodos() {
    return fetch(host, {
        method: "GET",
        headers: {
            Autorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            return response.json();
        })
};

export function postTodos() {
    const nameInputElement = document.getElementById("name-input");
    const commentInputElement = document.getElementById("comment-input");   
    return fetch(host, {
        method: "POST",
        headers: {
            Autorization: `Bearer ${token}`,
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
}

export function login(login, password) {
    return fetch(userUrl, {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
            // forceError: true,
        })
    })
    .then((response) => {
        if (response.status === 201) {
            console.log("вот страница с комментариями и формой");
            return response.json();
        }
        if (response.status === 400) {
            return Promise.reject("вы ввели не верный логин или пароль");
        }
        if (response.status === 500) {
            return Promise.reject("ошибка сервера");
        }
        return Promise.reject("сервер упал");

    })
    .catch((error) => {
        alert(error);
        console.warn(error);
    })
};

export function register({ login, name, password }) {
    return fetch(userUrlReg, {
        method: "POST",
        body: JSON.stringify({
            login,
            name,
            password,
        }),
    }).then((response) => {
        if (response.status === 201) {
            console.log("регистрация прошла успешно");
            return response.json();
        }
        if (response.status === 400) {
            return Promise.reject("пользователь с таким логином уже существует");
        }
        if (response.status === 500) {
            return Promise.reject("ошибка сервера");
        }
        return Promise.reject("сервер упал");

    })
        .catch((error) => {
            alert(error);
            console.warn(error);
        })
};