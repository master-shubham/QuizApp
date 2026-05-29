import { questions } from "./questions.js";


interface Answer{
    text:string;
    correct?:boolean;
}

interface Question {
  question: string;
  answers: Answer[];
}

const questionElement = document.getElementById("quastion") as HTMLElement;
const ansBtns = document.getElementById("ans-btn") as HTMLDivElement;
const nextBtn = document.getElementById("next-btn") as HTMLButtonElement;

// console.log(questions);
let currentQIndex:number = 0;
let score:number = 0;

//1:Start Quiz
function startQuiz() : void {
    currentQIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

//2:Show All Quastion one by one
function showQuestion() : void {

    resetState();

    let currentQuestion:Question = questions[currentQIndex] as Question;
    let quastionNo:number = currentQIndex + 1;

    questionElement.innerHTML = quastionNo + ". " + currentQuestion.question;


    currentQuestion.answers.forEach((ans:Answer) => {
        const button = document.createElement("button") as HTMLButtonElement;
        button.innerHTML = ans.text;
        button.classList.add("btn");
        ansBtns.appendChild(button);

        if (ans.correct) {
            button.dataset.correct =String(ans.correct);
        }
        button.addEventListener("click", selecAnswer);

    })
}

//3:Reset all the previous quastion
function resetState():void {
    nextBtn.style.display = "none";
    while (ansBtns.firstChild) {
        ansBtns.removeChild(ansBtns.firstChild);
    }
}

//4: Select sepecific Q-answer
function selecAnswer(e:MouseEvent):void {
    const selectedBtn = e.target as HTMLButtonElement;
    const isCorrect:boolean = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("inCorrect");
    }

    Array.from(ansBtns.children).forEach(button=> {
        const btn = button as HTMLButtonElement;
        if (btn.dataset.correct === "true") {
            btn.classList.add("correct")
        }
        btn.disabled = true;
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

//5: Show total Score and Play Again.
function showScore() :void {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

//5:Move to next quastion
function handleNextButton():void {
    currentQIndex++;
    if (currentQIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}
startQuiz();