export function getTodos() {
    return fetch("https://wedev-api.sky.pro/api/v1/regina-zaets/comments", {
        method: "GET"
    })
        .then((response) => {
            return response.json();
        })
};

export function postTodos({ text, name }) {
    return fetch('https://wedev-api.sky.pro/api/v1/regina-zaets/comments', {
        method: "POST",
        body: JSON.stringify({
            text: text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
            name: name.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
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

