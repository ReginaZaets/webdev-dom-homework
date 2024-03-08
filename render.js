import { postTodos, token } from "./api.js";
import { newComments, fetchAndRenderComments, user } from "./main.js";
import { renderLogin } from "./renderLogin.js";




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

  const formHtml = ()=> { 
    if (!token) {
      return btnLogin
    } else {
      return `
    <div class="add-form">
      <input id="name-input" type="text" class="add-form-name" value="${user.name}" disable />
      <textarea id="comment-input" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
        rows="4"></textarea>
      <div class="add-form-row">
        <button id="add-button" class="add-form-button">Написать</button>
      </div>
    </div>`};
    }


      
    const btnLogin = `
    <button class="auth">Авторизуйтесь</button>
    `


    const appHtml = `
    <div class="container">
      <ul id="list" class="comments">${commentHtml}</ul>
      ${formHtml()}
    </div>
      `;

  appElement.innerHTML = appHtml;
  initEventListerner();
  answerComment();
  autorization();



  function autorization() {
    if (token) return
    const authBtn = document.querySelector(".auth")
    authBtn.addEventListener('click', () => {
      renderLogin();
    })
  }

  const addNewComment = () => {
    const buttonElement = document.getElementById("add-button");
    const listElement = document.getElementById("list");
    const nameInputElement = document.getElementById("name-input");
    const textElementLoading = document.querySelector('.text-loading');
    const commentInputElement = document.getElementById("comment-input");



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

  };
  if (token) {
    const buttonElement = document.getElementById("add-button");
    buttonElement.addEventListener('click', addNewComment())
  }
}





export function initEventListerner() {
  const likeButtonElements = document.querySelectorAll('.like-button');
  for (const likeButtonElement of likeButtonElements) {
    likeButtonElement.addEventListener('click', event => {
      event.stopPropagation();
    if (!token) {
      alert('Авторизуйтесь')
      return
    }
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

