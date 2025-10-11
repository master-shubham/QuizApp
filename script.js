import { questions } from "./questions.js   ";

const questionElement = document.getElementById("quastion");
const ansBtns = document.getElementById("ans-btn");
const nextBtn = document.getElementById("next-btn");
console.log(questions);
let currentQIndex = 0;
let score = 0;

//1:Start Quiz
function startQuiz() {
    currentQIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

//2:Show All Quastion one by one
function showQuestion() {

    resetState();

    let currentQuestion = questions[currentQIndex];
    let quastionNo = currentQIndex + 1;
    questionElement.innerHTML = quastionNo + ". " + currentQuestion.question;


    currentQuestion.answers.forEach((ans) => {
        const button = document.createElement("button");
        button.innerHTML = ans.text;
        button.classList.add("btn");
        ansBtns.appendChild(button);

        if (ans.correct) {
            button.dataset.correct = ans.correct;
        }
        button.addEventListener("click", selecAnswer);

    })
}

//3:Reset all the previous quastion
function resetState() {
    nextBtn.style.display = "none";
    while (ansBtns.firstChild) {
        ansBtns.removeChild(ansBtns.firstChild);
    }
}

//4: Select sepecific Q-answer
function selecAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("inCorrect");
    }

    Array.from(ansBtns.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
    if (currentQIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})


function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}


function handleNextButton() {
    currentQIndex++;
    if (currentQIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}
startQuiz();