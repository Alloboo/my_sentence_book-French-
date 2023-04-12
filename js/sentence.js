const sentences = [
    {
        sentence: `J'ai du mal  à  vous entendre. Il y a trop de bruit d'ici.`,
        mean: `당신 말이 잘 안 들려요. 여기 너무 시끄러워요.`,
    },
    {
        sentence: `N'importe quel jour ferait l'affaire pour moi`,
        mean: `어떤 날이든 괜찮아요.`,
    },
    {
        sentence: `Ça n'a aucun sens`,
        mean: `말도 안 돼요.`,
    },
    {
        sentence: `ça ira`,
        mean: `그렇게 하면 되겠네요.`,
    },
    {
        sentence: `Peu n'importe`,
        mean: `어떤 쪽이든 괜찮아요.`,
    },
    {
        sentence: `Le moment est-il mal choisi?`,
        mean: `지금 바쁘신가요?`,
    },
    {
        sentence: `Quelles nouvelles?`,
        mean: `요즘 어떻게 지내요?`,
    },
    {
        sentence: `À quelle heure allons-nous nous rencontrer?`,
        mean: `몇시에 만날까요?`,
    },
    {
        sentence: `Où nous retrouvons-nous ?`,
        mean: `어디서 만날까요?`,
    }, {
        sentence: `Quel est le tarif?`,
        mean: `요금이 얼마에요?`,
    }
    , {
        sentence: `Où va ce train?`,
        mean: `이 기차는 어디로 가나요?`,
    },
    {
        sentence: `Est-ce que je peux avoir l'addition s'il vous plaît?`,
        mean: `계산서 주세요.`,
    },
    {
        sentence: `Y a-t-il des places dehors ?`,
        mean: `바깥에 자리 있나요?`,
    },
    {
        sentence: `Qu'avez-vous comme dessert ?`,
        mean: `디저트는 뭐가 있나요?`,
    },
    {
        sentence: `J'aimerais une salade.`,
        mean: `샐러드 주세요.`,
    },
    {
        sentence: `J'aimerais mon steak à point.`,
        mean: `스테이크는 미디엄 레어로 해 주세요.`,
    },
    {
        sentence: `Combien ça coûte?`,
        mean: `이거 얼마에요?`,
    },
    {
        sentence: `Puis-je l'essayer?`,
        mean: `이거 입어 봐도 되요?`,
    },
    {
        sentence: `Je regarde juste, merci.`,
        mean: `그냥 둘러보는 중이에요. 감사합니다.`,
    },
    {
        sentence: `Restez sur la voie de droite.`,
        mean: `오른쪽 차선에 계세요.`,
    },
    {
        sentence: `Ton travail semble intéressant.`,
        mean: `하시는 일이 흥미롭게 들리네요.`,
    },
    {
        sentence: `Vous venez ici souvent?`,
        mean: `여기 자주 오세요?`,
    },
    {
        sentence: `Est-ce que je peux te revoir?`,
        mean: `다시 만날 수 있을까요?`,
    },
    {
        sentence: `Ravi de te rencontrer.
        `,
        mean: `만나서 반가워요.`,
    },
]

const sentence = document.querySelector('#sentence span:first-child');
const mean = document.querySelector('#sentence span:last-child');
const meanBtn = document.querySelector('#mean-btn');
const sentenceList = document.querySelector('#sentence-list');
const showReviewBtn = document.querySelector(".showReviewBtn");

const SENTENCE_KEY = "sentences";
const HIDDEN_MEAN = "hidden-mean";

let reviewSentences = [];

function getTodaySentence() {
    const todaySentence = sentences[Math.floor(Math.random() * sentences.length)];
    sentence.innerText = todaySentence.sentence;
    mean.innerText = todaySentence.mean;

    const newSentenceObj = {
        text: todaySentence,
        id: Date.now(),
    };

    reviewSentences.push(newSentenceObj);
    paintSentence(newSentenceObj);
    saveSentences();
};

function openMean(e) {
    e.preventDefault();

    if (meanBtn.className !== HIDDEN_MEAN) {
        mean.classList.remove(HIDDEN_CLASSNAME);
        meanBtn.classList.add(HIDDEN_MEAN);
    } else {
        mean.classList.add(HIDDEN_CLASSNAME);
        meanBtn.classList.remove(HIDDEN_MEAN);
    }   
}

meanBtn.addEventListener('click', openMean);

function saveSentences() {
    localStorage.setItem(SENTENCE_KEY, JSON.stringify(reviewSentences));
    sessionStorage.setItem(SENTENCE_KEY, JSON.stringify(reviewSentences));
}

function deleteSentence(e) {
    const li = e.target.parentElement;
    li.remove();
    reviewSentences = reviewSentences.filter(sentence => sentence.id !== parseInt(li.id));
    saveSentences();
}

const savedSentences = localStorage.getItem(SENTENCE_KEY);
const savedTodaySentence = sessionStorage.getItem(SENTENCE_KEY);

//브라우저를 닫기 전까지 today 문장은 바뀌지 않음
const parsedSentences = JSON.parse(savedSentences);

if (savedSentences) {
    reviewSentences = parsedSentences;
    parsedSentences.forEach(paintSentence);
}

if (savedTodaySentence) {  
    sentence.innerText = parsedSentences[0].text.sentence;
    mean.innerText = parsedSentences[0].text.mean;

    reviewSentences.push(parsedSentences);
    paintSentence(parsedSentences);
} else {
    getTodaySentence();
}

function paintSentence(newSentenceObj) {
    const savedSentences = localStorage.getItem(SENTENCE_KEY);

    if (newSentenceObj.text !== savedSentences[0].text) {
        const li = document.createElement("li");
        li.id = newSentenceObj.id;
    
        const span = document.createElement("span");
        span.innerText = newSentenceObj.text.sentence;

        const deleteSentenceBtn = document.createElement("button");
        deleteSentenceBtn.className = "delete-btn";
        deleteSentenceBtn.innerText = 'x';
        deleteSentenceBtn.addEventListener('click', deleteSentence);
    
        li.appendChild(span);
        li.appendChild(deleteSentenceBtn);
        sentenceList.appendChild(li);
    }
}


function showSentenceList(e) {
    e.preventDefault();

    const mainPage = document.querySelector("#main-page");
    mainPage.classList.add(HIDDEN_CLASSNAME);
    voca.classList.add(HIDDEN_CLASSNAME);
    review.classList.remove(HIDDEN_CLASSNAME);
}

showReviewBtn.addEventListener('click', showSentenceList);

const mainBtn = document.querySelector(".mainBtn");

function combackMain(e) {
    e.preventDefault();

    mainPage.classList.remove(HIDDEN_CLASSNAME);
    voca.classList.add(HIDDEN_CLASSNAME);
    review.classList.add(HIDDEN_CLASSNAME);
}

mainBtn.addEventListener('click', combackMain);


