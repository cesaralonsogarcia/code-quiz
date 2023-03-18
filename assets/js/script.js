// Variables to access the HTML elements
var highScores = document.querySelector('#highScores');
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
var optionA = document.querySelector('#optionA');
var optionB = document.querySelector('#optionB');
var optionC = document.querySelector('#optionC');
var optionD = document.querySelector('#optionD');
var nameInput = document.querySelector('#nameInput');
var saveButton = document.querySelector('#saveButton');
var startButton = document.querySelector('#startButton');
var backButton = document.querySelector('#backButton');
var clearButton = document.querySelector('#clearButton');
var playAgainButton = document.querySelector('#playAgainButton');

// All other variables
var isGameOver = false;
var timer;
var timerCount;
var highScoresArray = [];
var highScoresString;
var questionIndex = 0;
var answerClick;
var clickedClass;
var newHighScore;
var highScoreTable;

// Array with quiz questions
var questionsArray = [
    {
        question: 'When was JavaScript created?',
        options: {
            a: '1935',
            b: '2010',
            c: '1995',
            d: '1989'
        },
        answer: 'c'
    },
    {
        question: 'What element tag is used in HTML to link JavaScript?',
        options: {
            a: '<label>',
            b: '<script>',
            c: '<js>',
            d: '<h3>'
        },
        answer: 'b'
    },
    {
        question: 'How do you display an alert with JavaScript?',
        options: {
            a: 'alert(\'Message\');',
            b: '<alert>',
            c: 'function alert ()',
            d: 'displayMessage.alert'
        },
        answer: 'a'
    },
    {
        question: 'What is the proper syntax for a function in JavaScript?',
        options: {
            a: 'console.log(functionName);',
            b: '{functionName}',
            c: 'create functionName{}',
            d: 'function functionName() {}'
        },
        answer: 'd'
    },
    {
        question: 'What is the conditional statement in a for loop: for(var i = 0; i < limit; i++)',
        options: {
            a: 'for',
            b: 'var i = 0',
            c: 'i < limit',
            d: 'i++'
        },
        answer: 'c'
    }
];

// The init function will load the high scores when the page loads
function init() {
    answerList.classList.add('hidden');
    nameInput.classList.add('hidden');
    saveButton.classList.add('hidden');
    playAgainButton.classList.add('hidden');
    backButton.classList.add('hidden');
    clearButton.classList.add('hidden');
    getHighScores();
}

// The startGame function is called when the start button is clicked
function startGame() {
    isGameOver = false;
    timerCount = 75;
    startButton.className = 'hidden';
    quizTitle.className = 'hidden';
    gameDescription.className = 'hidden';
    startTimer();
    renderQuestion(questionsArray);
}

// The renderQuestion function displays the question on the screen
function renderQuestion(array) {
    if(questionIndex === questionsArray.length){
        isGameOver = true;
        showScore();
    }
    question.classList.add('alignLeft');
    answerList.classList.add('answerList');
    answerList.classList.remove('hidden');
    optionA.classList.add('displayOptions');
    optionB.classList.add('displayOptions');
    optionC.classList.add('displayOptions');
    optionD.classList.add('displayOptions');
    question.textContent = array[questionIndex].question;
    optionA.textContent = array[questionIndex].options.a;
    optionB.textContent = array[questionIndex].options.b;
    optionC.textContent = array[questionIndex].options.c;
    optionD.textContent = array[questionIndex].options.d;
}

// This function displays the final score
function showScore() {
    answerList.classList.add('hidden');
    nameInput.classList.remove('hidden');
    saveButton.classList.remove('hidden');
    result.innerHTML = '';
    question.classList.remove('alignLeft');
    question.innerHTML = 'Your score is ' + timerCount;
}

// This function shows if the answer is correct or wrong
function checkAnswer() {
    if (answerClick === questionsArray[questionIndex].answer) {
        result.textContent = 'CORRECT!!!';
        questionIndex++;
    } else {
        timerCount -= 10;
        result.textContent = 'WRONG...';
        questionIndex++;
    }
    isNextReady = true;
}

// This function removes the styling for the selected option
function clearClicked() {
    if(answerClick === 'a'){
        optionA.classList.remove('clicked');
    } else if(answerClick === 'b'){
        optionB.classList.remove('clicked');
    } else if(answerClick === 'c'){
        optionC.classList.remove('clicked');
    } else if(answerClick === 'd'){
        optionD.classList.remove('clicked');
    }
    console.log(optionA);
    console.log(optionB);
    console.log(optionC);
    console.log(optionD);
}

// The changeBackground function highlights the chosen option
function changeBackgroundA() {
    optionA.classList.add('clicked');
    answerClick = 'a';
}

function changeBackgroundB() {
    optionB.classList.add('clicked');
    answerClick = 'b';
}

function changeBackgroundC() {
    optionC.classList.add('clicked');
    answerClick = 'c';
}

function changeBackgroundD() {
    optionD.classList.add('clicked');
    answerClick = 'd';
}

// The startTimer function starts the timer for the game
function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerTime.textContent = timerCount;
        if (timerCount >= 0) {
            if (isGameOver) {
                clearInterval(timer);
                showScore();
            }
        }

        if (timerCount <= 0) {
            clearInterval(timer);
            timerCount = 0;
            showScore();
        }
    }, 1000);
}

// This function displays the high scores
function displayHighScores() {
    startButton.classList.add('hidden');
    question.classList.add('hidden');
    result.classList.add('hidden');
    nameInput.classList.add('hidden');
    saveButton.classList.add('hidden');
    playAgainButton.classList.add('hidden');
    answerList.classList.add('hidden');
    quizTitle.classList.remove('hidden');
    quizTitle.innerHTML = 'High Scores';
    backButton.classList.remove('hidden');
    clearButton.classList.remove('hidden');
    for(var i = 0; i < highScoresArray.length; i++){
        highScoreTable += highScoresArray[i] + '<br>';
    }
    console.log(highScoreTable);
}

// The getHighScores function gets the stored data from local storage
function getHighScores() {
    highScoresString = localStorage.getItem("highScores");
    highScoresArray = JSON.parse(highScoresString);
    if (highScores === null) {
        highScoresArray = ['', ''];
    } else {
        highScoresArray = highScores;
    }
}

// This function saves the high score to the local storage
function saveHighScore() {
    newHighScore = nameInput.value + " - " + timerCount;
    //highScoresArray.push(newHighScore);
    //highScoresArray = newHighScore + " - " + timerCount;
    console.log(highScoresArray);
    highScoresString = JSON.stringify(highScoresArray);
    console.log(highScoresString);
    localStorage.setItem("highScores", highScoresString);
}

function checkEnd() {
    if(questionIndex >= questionsArray.length) {
        isGameOver = true;
    }
}

// Call init() to have high scores ready
init();

// Event listener to start the game
startButton.addEventListener('click', startGame);

// Event listeners for multiple choice
optionA.addEventListener('mousedown', function(event) {
    event.preventDefault();
    if (timerCount === 0) {
        return;
    }
    changeBackgroundA();
    checkAnswer();
    checkEnd();
});

optionB.addEventListener('mousedown', function(event) {
    event.preventDefault();
    if (timerCount === 0) {
        return;
    }
    changeBackgroundB();
    checkAnswer();
    checkEnd();
});

optionC.addEventListener('mousedown', function(event) {
    event.preventDefault();
    if (timerCount === 0) {
        return;
    }
    changeBackgroundC();
    checkAnswer();
    checkEnd();
});

optionD.addEventListener('mousedown', function(event) {
    event.preventDefault();
    if (timerCount === 0) {
        return;
    }
    changeBackgroundD();
    checkAnswer();
    checkEnd();
});

// Event listener for rendering next screen
optionA.addEventListener('mouseup', function(event) {
    event.preventDefault();
    if (timerCount === 0) {
        return;
    }
    optionA.classList.remove('clicked');
    result.textContent = '';
    renderQuestion(questionsArray);
});

optionB.addEventListener('mouseup', function(event) {
    event.preventDefault();
    if (timerCount === 0) {
        return;
    }
    optionB.classList.remove('clicked');
    result.textContent = '';
    renderQuestion(questionsArray);
});

optionC.addEventListener('mouseup', function(event) {
    event.preventDefault();
    if (timerCount === 0) {
        return;
    }
    optionC.classList.remove('clicked');
    result.textContent = '';
    renderQuestion(questionsArray);
});

optionD.addEventListener('mouseup', function(event) {
    event.preventDefault();
    if (timerCount === 0) {
        return;
    }
    optionD.classList.remove('clicked');
    result.textContent = '';
    renderQuestion(questionsArray);
});

// Event listener for save button
saveButton.addEventListener('click', saveHighScore);

// Event listener for high scores button
highScores.addEventListener('click', displayHighScores);

// Event listener for back button
backButton.addEventListener('click', function() {
    location.reload();
});

// Event listener for play again button
playAgainButton.addEventListener('click', function() {
    location.reload();
});

// Event listener for clear button
//clearButton.addEventListener('click', clearHighScores);