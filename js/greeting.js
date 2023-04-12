const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector('#login-form input');
const greeting = document.querySelector('#greeting');
const tapName1 = document.querySelector('#tap-name1');
const mainPage = document.querySelector('#main-page');

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(e) {
    e.preventDefault();

    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    printSentence(username);
}

function printSentence(username) {
   greeting.innerText = `Tu vas y arriver, ${username} :)`;
   mainPage.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener('submit', onLoginSubmit);   
} else {
    loginForm.classList.add(HIDDEN_CLASSNAME);
    printSentence(savedUsername);
}

