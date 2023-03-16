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

var isGameOver = false;
var timer;
var timerCount;
var highScoresArray = [];
var isA;
var isB;
var isC;
var isD;

// Object with questions and answers
var questionOne = {
    question: 'What is question 1?',
    a: 'This is wrong',
    b: 'Also wrong',
    c: 'WRONG',
    correct: 'CORRECT ANSWER'
};

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
    timerCount = 15;
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
    questionContainer.style.textAlign = 'left';
    optionContainer.style.textAlign = 'left';
    answerList.style.padding = '10px 0';
    answerList.style.lineHeight = '2';
    for (var i = 0; i < array.length; i++){
    question.textContent = array[0].question;
    // var optionA = '<li>' + array[0].options.a + '</li>';
    // var optionB = '<li>' + array[0].options.b + '</li>';
    // var optionC = '<li>' + array[0].options.c + '</li>';
    // var optionD = '<li>' + array[0].options.d + '</li>';
    // answerList.innerHTML = optionA + optionB + optionC + optionD;
    answerList.innerHTML = '<li>' + array[0].options.a + '</li><li>' +
        array[0].options.b + '</li><li>' +
        array[0].options.c + '</li><li>' +
        array[0].options.d + '</li>';
    
    var answerClick = document.querySelectorAll('li');
    answerClick[0].addEventListener('click', changeBackground);
    answerClick[1].addEventListener('click', changeBackground);
    answerClick[2].addEventListener('click', changeBackground);
    answerClick[3].addEventListener('click', changeBackground);
    /*
    for (var i = 0; i < answerClick.length; i++){
    answerClick[i].addEventListener('click', changeBackground);
    if (i === 0) {
        var isA = true;
    } else if (i === 1) {
        var isB = true;
    } else if (i === 2) {
        var isC = true;
    } else {
        var isD = true;
    }*/
    
    //}

}

function changeBackground(event) {
    var clicked = event.currentTarget;
    clicked.setAttribute(
        'style',
        'background-color: aquamarine; color: black; font-weight: bold'
    );
    clicked.classList.add("clicked");
    console.log(answerList);
}

function checkAnswer() {
    answerClick.addEventListener('click', function(){})
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