const vocaForm = document.querySelector('#voca-form');
const vocaInput = document.querySelector('#voca-form input');
const voca = document.querySelector("#voca");
const vocaList = document.querySelector('#voca-list');
const review = document.querySelector("#review");

const VOCAS_KEY = "vocas";

let vocas = [];

const showVocaBtn = document.querySelector(".showVocaBtn");

function showVocaList(e) {
    e.preventDefault();

    const mainPage = document.querySelector("#main-page");

    mainPage.classList.add("hidden");
    review.classList.add("hidden");
    voca.classList.remove("hidden");
}

showVocaBtn.addEventListener('click', showVocaList);

function saveVocas() {
    localStorage.setItem(VOCAS_KEY, JSON.stringify(vocas));
}

function deleteVoca(e) {
    const li = e.target.parentElement;
    li.remove();
    vocas = vocas.filter(voca => voca.id !== parseInt(li.id));
    saveVocas();
}

function paintVoca(newVoca) {
    const li = document.createElement("li");
    li.id = newVoca.id;

    const span = document.createElement("span");
    span.innerText = newVoca.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerText = 'x';
    deleteBtn.addEventListener('click', deleteVoca);

    li.appendChild(span);
    li.appendChild(deleteBtn);
    vocaList.appendChild(li);   
}

function handleVocaSubmit(e) {
    e.preventDefault();

    const newVoca = vocaInput.value;
    vocaInput.value = "";

    const newVocaObj = {
        text: newVoca,
        id: Date.now(),
    };

    vocas.push(newVocaObj);
    paintVoca(newVocaObj);
    saveVocas();
}

vocaForm.addEventListener('submit', handleVocaSubmit);

const savedVocas = localStorage.getItem(VOCAS_KEY);

if (savedVocas) {
    const parsedVocas = JSON.parse(savedVocas);
    vocas = parsedVocas;
    parsedVocas.forEach(paintVoca);
}


