// Variables to access the HTML elements
var timerTime = document.querySelector('#timerTime');
var container = document.querySelector('#container');
var questionContainer = document.querySelector('#questionContainer');
var quizTitle = document.querySelector('#quizTitle');
var question = document.querySelector('#question');
var optionContainer = document.querySelector('#optionContainer');
var gameDescription = document.querySelector('#gameDescription');
var answerList = document.querySelector('#answerList');
var startButton = document.querySelector('#startButton');
var result = document.querySelector('#result');

var isGameOver = false;
var timer;
var timerCount;
var highScoresArray = [];
var questionIndex = 0;
var answerClick;
var finalAnswer;

// Array with quiz questions
var questionsArray = [
    {
        question: 'What is question 1?',
        options: {
            a: 'option 1',
            b: 'option 2',
            c: 'option 3',
            d: 'option 4'
        },
        answer: 'c'
    },
    {
        question: 'What is question 2?',
        options: {
            a: 'option 1',
            b: 'option 2',
            c: 'option 3',
            d: 'option 4'
        },
        answer: 'b'
    },
    {
        question: 'What is question 3?',
        options: {
            a: 'option 1',
            b: 'option 2',
            c: 'option 3',
            d: 'option 4'
        },
        answer: 'a'
    },
    {
        question: 'What is question 4?',
        options: {
            a: 'option 1',
            b: 'option 2',
            c: 'option 3',
            d: 'option 4'
        },
        answer: 'd'
    },
    {
        question: 'What is question 5?',
        options: {
            a: 'option 1',
            b: 'option 2',
            c: 'option 3',
            d: 'option 4'
        },
        answer: 'c'
    }
];

// The init function will load the high scores when the page loads
function init() {
    getHighScores();
}

// The startGame function is called when the start button is clicked
function startGame() {
    isGameOver = false;
    timerCount = 50;
    startButton.className = 'hidden';
    quizTitle.className = 'hidden';
    gameDescription.className = 'hidden';
    startTimer();
    for (var i = 0; i < questionsArray.length; i++){
        renderQuestion(questionsArray);
    }
}

// The renderQuestion function displays the question on the screen
function renderQuestion(array) {
    question.classList.add('alignLeft');
    answerList.classList.add('answerList');
    if (questionIndex < array.length){
        question.textContent = array[questionIndex].question;
        answerList.innerHTML = '<li>' + array[questionIndex].options.a + '</li><li>' +
        array[questionIndex].options.b + '</li><li>' +
        array[questionIndex].options.c + '</li><li>' +
        array[questionIndex].options.d + '</li>';
        answerClick = document.querySelectorAll('li');
        for (var i = 0; i < answerClick.length; i++) {
        answerClick[i].addEventListener('click', changeBackground);
        }
    }

}

// The changeBackground function highlights the chosen option
function changeBackground(event) {
    var clicked = event.currentTarget;
    clicked.classList.add("clicked");
    checkAnswer(answerClick);
    return;
}

// The checkAnswer functino checks if the correct answer was clicked
function checkAnswer(array) {
    for (var i = 0; i < array.length; i++) {
        var clickedClass = array[i].getAttribute("class");
        if (clickedClass) {
            if (i === 0) {
                finalAnswer = 'a';
            } else if (i === 1) {
                finalAnswer = 'b';
            } else if (i === 2) {
                finalAnswer = 'c';
            } else if (i === 3) {
                finalAnswer = 'd';
            }
        }
    }
    if (finalAnswer === questionsArray[questionIndex].answer) {
        result.textContent = "CORRECT!";
        questionIndex++;
        renderQuestion(questionsArray);
    } else {
        timerCount -= 10;
        result.textContent = "WRONG!";
        questionIndex++;
        renderQuestion(questionsArray);
    }  
}

// The startTimer function starts the timer for the game
function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerTime.textContent = timerCount;
        if (timerCount > 0) {
            if (isGameOver) {
                //displayScore();
            }
        } else {
            isGameOver = true;
            clearInterval(timer);
            //displayScore();
        }
    }, 1000);
}

// The getHighScores function gets the stored data from local storage
function getHighScores() {
    // Get stored values for high scores
    var highScoresString = localStorage.getItem("highScores");
    // Convert it into an array
    var highScores = JSON.parse(highScoresString);
    // Check if the storage is empty
    if (highScores === null) {
        highScoresArray = ['', ''];
    } else {
        highScoresArray = highScores;
    }
    // Render array to page
    //answerList.textContent('<li>' + highScoresArray[0] + '</li>');
}

// Call init() to have high scores ready
init();

// Event listener to start the game
startButton.addEventListener("click", startGame);