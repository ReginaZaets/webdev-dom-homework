import { login, setToken, token } from "./api";
import { fetchAndRenderComments } from "./main";



export const renderLogin = ({ fetchAndRenderComments }) => {
    const appElement = document.getElementById("app");
    const loginHtml = `
    <div class="container">
    <div id="log-form" class="add-form">
      <h3>Форма входа</h3>
      <input type="text" id="login-input" class="form-name" placeholder="Введите логин" />
      <input type="password" id="password-input" class="form-password" placeholder="Введите пароль" />
      <div class="add-form-row">
        <button id="log-button" class="log-form-button">Войти</button>
      </div>
      <button id="reg-button" class="reg" href="#">Зарегистрироваться</button>
    </div>
  </div>
    `;
    appElement.innerHTML = loginHtml;
};

const buttonLoginElement = document.getElementById("login-button");
const loginInputElement = document.getElementById("login-input");
const passwordInputElement = document.getElementById("password-input");

buttonLoginElement.addEventListener("click", () => {
    login({
        login: loginInputElement.value,
        password: passwordInputElement.value,
    }).then((responseData) => {
        setToken(responseData.user.token);
    }).then(() => {
        fetchAndRenderComments();
    })
});