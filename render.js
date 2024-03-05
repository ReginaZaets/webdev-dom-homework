import { postTodos } from "./api.js";
import { newComments } from "./main.js";
import { fetchAndRenderComments } from "./main.js";




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
      renderComments({ newComments });
    });
  };
};

initEventListerner();

export function answerComment() {
  const commentsAnswer = document.querySelectorAll('.comment');
  const formText = document.querySelector('.add-form-text');
  commentsAnswer.forEach((comment, index) => {
    comment.addEventListener('click', () => {
      formText.value = `> ${newComments[index].text}\n ${newComments[index].name},`;
    })
  })
}

export const renderComments = ({ newComments }) => {
  const appElement = document.getElementById("app");
  const commentHtml = newComments.map((comment, index) => {
    return `<li class="comment">
          <div class="comment-header">
            <div>${comment.name} </div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button data-index="${index}" class="${comment.isLiked ? 'like-button -active-like' : 'like-button'}"></button>
            </div>
          </div>`
  }).join('');

  const appHtml = `
    <div class="container">
    <ul id="list" class="comments">${commentHtml}
    </ul>
  </div>
`

  appElement.innerHTML = appHtml;
  initEventListerner();
  answerComment();

  const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const textElementLoading = document.querySelector('.text-loading');
const commentInputElement = document.getElementById("comment-input");

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

  postTodos().then(() => {
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
      console.log(error);
    });
  renderComments({ newComments });
})

};

