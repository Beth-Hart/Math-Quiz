function getRandomNumber(number) { 

    return  Math.floor(Math.random() * Math.floor(number));
}

function shuffleArray(arr) {
    return arr.sort(function (a, b) { return Math.random() - 0.5 })
  }  

let leftOp = 0;
let rightOp = 0;
let wrongAnswer = 0;
let rightAnswer = 0;
const numOfQuestions = 10;
let currentQuestionNumber = 1;
let currentScore = 0;

let answersArray = [];


let listOfQuestions = [];


createQuestion();

function displayQuestion() {
    let currentProblem = document.querySelector('.expression.show-hide');
    currentProblem.innerText = listOfQuestions[currentQuestionNumber - 1].problem;
}

displayQuestion();

function displayAnswers() {
    let currentAnswers = document.querySelectorAll('li');
    for(let i = 0; i < currentAnswers.length; i++)
    {
        currentAnswers[i].innerText = listOfQuestions[currentQuestionNumber - 1].answers[i];
    }
}

displayAnswers();

function incrementQuestionNumber() {
    if (currentQuestionNumber < numOfQuestions) {
        currentQuestionNumber++;
        let questionNumber = document.querySelector('.currentProblem');
        questionNumber.innerText = currentQuestionNumber;
    }
}

function updateScore(event) {
    const answerSelected = event.target.innerText;
    if(answerSelected == listOfQuestions[currentQuestionNumber - 1].correctAnswer && currentScore < 10)
    {
        currentScore++;
        let score = document.querySelector('.currentScore');
        score.innerText = currentScore;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let answerList = document.querySelectorAll('li');
    answerList.forEach( (answer) => {
        answer.addEventListener('click', (event) => {
            updateScore(event);
            incrementQuestionNumber();
            displayQuestion();
            displayAnswers();
            displayAnswers()
        })
    })

    let btn = document.getElementById('btnStartOver');
    btn.addEventListener('click', () => {
        resetQuiz();
    })
})

function resetQuiz() {
    leftOp = 0;
    rightOp = 0;
    wrongAnswer = 0;
    rightAnswer = 0;
    currentQuestionNumber = 1;
    currentScore = 0;
    answersArray = [];
    listOfQuestions = [];
    createQuestion ();
    displayQuestion();
    displayAnswers();

    let questionNumber = document.querySelector('.currentProblem');
        questionNumber.innerText = currentQuestionNumber;

    let score = document.querySelector('.currentScore');
        score.innerText = currentScore;
}

function createQuestion () {
    for(let i = 0; i < numOfQuestions; i++)
    {
        let question = {
            problem: '',
            answers: [],
            correctAnswer: 0
        };
        leftOp = getRandomNumber(10);
        rightOp = getRandomNumber(10);
        rightAnswer = leftOp * rightOp;
        question.correctAnswer = rightAnswer;
        question.problem = `${leftOp} * ${rightOp}`;
        answersArray.push(rightAnswer);
        for(let j = 0; j < 3; j++)
        {
            wrongAnswer = getRandomNumber(82);
            while (wrongAnswer == rightAnswer) {
                wrongAnswer = getRandomNumber(82);
            }
            answersArray.push(wrongAnswer);
        }
        shuffleArray(answersArray);
        question.answers = answersArray;
        listOfQuestions.push(question);
        answersArray = [];
    }
}