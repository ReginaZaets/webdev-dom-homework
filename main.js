import { getTodos, postTodos } from "./api.js";
import { renderComments } from "./render.js";

const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const likesElements = document.querySelectorAll('.likes');
const likeButtonElements = document.querySelectorAll('.like-button');
const textElementLoading = document.querySelector('.text-loading');

const fetchAndRenderComments = () => {
  getTodos().then((response) => {
      return response
    })
    .then((responseData) => {
      newComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date).toLocaleTimeString('ru-RU', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }),
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
        };
      });
      let hideTextLoading = textElementLoading.style.display = "none";
      renderComments({newComments});
    });
};

const getDate = () => {
  let currentDate = new Date();
  let date = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  let hours = currentDate.getHours();
  let minute = currentDate.getMinutes();
  if (date < 10) {
    date = "0" + date;
  }
  if (month < 10) {
    month = "0" + month;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  return date + '.' + month + '.' + year + ' ' + hours + ':' + minute;
};

buttonElement.addEventListener('click', () => {
  nameInputElement.classList.remove("error");
  commentInputElement.classList.remove("error");
  if (nameInputElement.value === "") {
    nameInputElement.classList.add("error");
    return;
  }
  if (commentInputElement.value === "") {
    commentInputElement.classList.add("error");
    return;
  }

  buttonElement.disabled = true;
  buttonElement.textContent = "Комментарий добавляется...";

  postTodos({
    text: commentInputElement.value,
    name: nameInputElement.value,
  }).then(() => {
    return fetchAndRenderComments();
  })
    .then(() => {
      textElementLoading.disabled = false;
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      nameInputElement.value = "";
      commentInputElement.value = "";
      nameInputElement.value.trim() === "" || commentInputElement.value.trim() === "";
    })
    .catch((error) => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      if (error.message === "Имя и комментарий должны быть больше 3х символов") {
        alert("Имя и комментарий должны быть больше 3х символов");
      }
      if (error.message === "Серввер упал") {
        alert("Серввер упал, попробуйте позже");
      }
      if (window.navigator.onLine === false) {
        alert('Проблемы с интернетом, проверьте подключение')
        // if (error.message === 'Failed to fetch') {
        //   alert("Отсутствует интернет");
      }
      // alert("Кажется, что-то пошло не так, попробуй позже");
      // console.warn(error);
    })

  renderComments({newComments});
});

export function initEventListerner() {
  const likeButtonElements = document.querySelectorAll('.like-button');
  for (const likeButtonElement of likeButtonElements) {
    likeButtonElement.addEventListener('click', event => {
      event.stopPropagation();
      const index = likeButtonElement.dataset.index;
      if (newComments[index].isLiked === false) {
        newComments[index].likes++;
        newComments[index].isLiked = true;
      } else {
        newComments[index].likes--;
        newComments[index].isLiked = false;
      };
      renderComments({newComments});
    });
  };
};

initEventListerner();

let newComments = [
  // {
  //       name: "Глеб Фокин",
  //       time: "12.02.22 12:18",
  //       comments: "Это будет первый комментарий на этой странице",
  //       likes: 3,
  //       isLiked: false,
  //     },
  //     {
  //       name: "Варвара Н.",
  //       time: "13.02.22 19:22",
  //       comments: "Мне нравится как оформлена эта страница! ❤",
  //       likes: 75,
  //       isLiked: false,
  //     },
];

fetchAndRenderComments();
renderComments({newComments});


export function answerComment() {
  const commentsAnswer = document.querySelectorAll('.comment');
  const formText = document.querySelector('.add-form-text');
  commentsAnswer.forEach((comment, index) => {
    comment.addEventListener('click', () => {
      formText.value = `> ${newComments[index].comments}\n ${newComments[index].name},`;
    })
  })
}

