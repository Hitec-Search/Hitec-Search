const questions = [
    {
        question: "Following are CSS Units _________?",
        answers: [
            { text: "a. px", correct: false},
            { text: "b. rem", correct: false},
            { text: "c. mm", correct: false},
            { text: "d. All", correct: true},
        ]
    },
    {
        question: "which of the following CSS style have high peroriety?",
        answers: [
            { text: "a. Internal CSS", correct: false},
            { text: "b. Inline CSS", correct: true},
            { text: "c. External CSS", correct: false},
            { text: "d. a and c", correct: false}
        ]
    },
    {
        question: "HTML ancher tage are used to add ________.",
        answers: [
            { text: "a. Hyper link", correct: true},
            { text: "b. file", correct: false},
            { text: "c. button", correct: false},
            { text: "d. None of these", correct: false},
        ]
    },
    {
        question: "CSS staric (*) Seletor are called?",
        answers: [
            { text: "a. Class selector", correct: false},
            { text: "b. block selector", correct: false},
            { text: "c. Page selector", correct: false},
            { text: "d. Universal selector", correct: true},
        ]
    },
    {
        question: "CSS style _________ document.",
        answers: [
            { text: "a. Word", correct: false},
            { text: "b. HTML", correct: true},
            { text: "c. JavaScript", correct: false},
            { text: "d. None of these", correct: false},
        ]
    },
    {
        question: "HTML stand for_________.",
        answers: [
            { text: "a. Hyper Modern Language", correct: false},
            { text: "b. Hyper Text Language", correct: false},
            { text: "c. Hyper Text Markup Language", correct: true},
            { text: "d. All", correct: false},
        ]
    },
    {
        question: "which of the following are CSS slector?",
        answers: [
            { text: "class selector", correct: false},
            { text: "Element selector", correct: false},
            { text: "Id selector", correct: false},
            { text: "All", correct: true},
        ]
    },
    {
        question: "HTML _________ tage link JavaScript file?",
        answers: [
            { text: "a. Div", correct: false},
            { text: "b. ancher", correct: false},
            { text: "c. script", correct: true},
            { text: "d. a and b", correct: false},
        ]
    },
    {
        question: "CSS ________ property generate space around content.",
        answers: [
            { text: "a. Space", correct: false},
            { text: "b. Style", correct: false},
            { text: "c. Padding", correct: true},
            { text: "d. Outline", correct: false},
        ]
    },
    {
        question: "Input tage used to take _________.",
        answers: [
            {text: "a. User input", correct: true},
            {text: "b. User email", correct: false},
            {text: "c. Uer name", correct: false},
            {text: "d. All", correct: false},
        ]
    }
];

// Required all elements here assign with constant 
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timer = document.querySelector(".timer");
const header = document.querySelector(".header");
const start = document.querySelector(".start");
const app = document.querySelector(".app");
const container = document.querySelector(".container");

// Add event listnner on start button
start.addEventListener("click", () => {
    startQuiz();
    timeLeft = 20;
    app.style.display = "block";
    container.style.display = "none";     
});

// let assign variables
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 20;
let timerID = null;

// Function to shuffle questions 
const shuffleQuestions = () =>{
    showQuestion();
    for(let i=questions.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    currentQuestionIndex = 0;
    showQuestion();
}

// Function to start quiz
function startQuiz(){
    currentQuestionIndex = 0;
    shuffleQuestions();
    score = 0;
    timeLeft = 20;
    timer.style.display = "block";
    nextButton.innerHTML = "Next";
    header.innerHTML = "Please take your time and test / quiz";
}

// function to show question 
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = "Q" + questionNo + "/10. " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

// Function to resetstate 
function resetState(){
    header.innerHTML = "Please take your time and test / quiz";
    timer.style.display = "block";
    nextButton.innerHTML = "Next";
    
    startTimer();
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Function to find correct answer
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

// Function to show score 
function showScore(){
    resetState();
    questionElement.innerHTML = `You Rewarded ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Try Again";
    nextButton.style.textAlign = "center";
    nextButton.style.display = "block";
    timer.style.display = "none";
    header.innerHTML = "You have almost completed this quiz";
}

// Function to start timer
const startTimer = () => {
    clearInterval(timerID);
    timer.textContent = timeLeft;
    const countDown = () =>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const conFirmUser = confirm("Time is over! Do you want to try again");
            if(conFirmUser){
                timeLeft = 20;
                startQuiz();
            }
            else{
                container.style.display = "block";
                app.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to stop timer 
const stopTimer = () => {
    clearInterval(timerID);
}

// Fuction to handle next button 
function handleNextButton(){
    currentQuestionIndex++;
    timeLeft = 20;
    if(currentQuestionIndex < questions.length){
        showQuestion();
        startTimer();
    }else{
        showScore();
        stopTimer();
    }
}

// Add event listener to click on next button to add quesion
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
        header.innerHTML = "Please take your time and test / quiz";
    }
});
