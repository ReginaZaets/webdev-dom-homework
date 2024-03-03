import { getTodos } from "./api.js";
import { renderComments } from "./render.js";
import { getDate } from "./helpers.js";
import { initEventListerner , answerComment } from "./render.js";


const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const likesElements = document.querySelectorAll('.likes');
const likeButtonElements = document.querySelectorAll('.like-button');
const textElementLoading = document.querySelector('.text-loading');

export const fetchAndRenderComments = () => {
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

fetchAndRenderComments();
initEventListerner();

export let newComments = [
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
