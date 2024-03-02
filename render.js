import { answerComment, initEventListerner } from "./main.js";

const listElement = document.getElementById("list");

export const renderComments = ({newComments}) => {
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
    listElement.innerHTML = commentHtml;
    initEventListerner();
    answerComment();
  };