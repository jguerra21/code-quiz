var questionPosition = 0;
var highScore = 0;
var thisScore = 0;
var time = 0;
var timerStarted = false;

var questions = [
    {
        title: "Commonly used data types DO NOT include",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if/ else statement is enclosed within______.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in JavaScript can be used to store______.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within______when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    }
];

function timer() {
    document.getElementById("time").innerText = time--;
} 

function updateHighScore(score) {
    if (score > highScore) {
        highScore = score;
        console.log('highscore update to: ', highScore);
    }
    document.getElementById("highscore").innerHTML = score;
}

function checkAnswer(choice, answer) {
    console.log('Answer is: ', choice === answer);
    var response = "";
    if (choice === answer) {
        thisScore += 10;
        response = "Correct!";
    } else {
        time -= 10;
        response = "Wrong!";
    }
    console.log('highScore', highScore);
    updateHighScore(thisScore);
    document.getElementById ("answer").innerText = response;
    startQuiz();
}

function loadQuestion(position) {
    return questions[position];
}

function displayQuestion(question, questionPosition) {
    console.log('display question');
    var answer = question.answer;
    var choices = question.choices;

    // Update question title
    document.getElementById("question").innerText = question.title;

    var liList = "";
    for(var i = 0; i < choices.length; i++) {
        liList += "<li ";
        liList += "id='";
        liList += questionPosition;
        liList += i;
        liList += "' onclick=\"checkAnswer('";
        liList += choices[i];
        liList += "', '";
        liList += answer;
        liList += "')\">";
        liList += choices[i];
        liList += "</li>";
    }
    console.log(liList);
    // Update question choices
    document.getElementById("choices").innerHTML = liList;
}

function goBack(){
    time = 0;
    questionPosition = 0;
    timerStarted = false;
    var restart = "<h3>Coding Quiz Challenge</h3>";
    restart += "<p id=\"question\">Try to answer the following code-related questions with the time limit.Keep in mind that incorrect answers will penalize your scoretime by ten seconds! <br></p>";
    restart += "<ol id=\"choices\"></ol>";
    restart += "<button id=\"startButton\" onclick=\"startQuiz();\">Start Quiz</button>";

    document.getElementById("content").innerHTML = restart;
}

function clearScores (){
    thisScore = 0;
    document.getElementById("gameOver").style = "display: none;";
}

function handleInitials() {
    console.log('handling initials');
    var initials = document.getElementById("initials").value;
    var gameOver = "<h3>Highscores</h3>";
    gameOver += "<p id='gameOver'>1. ";
    gameOver += initials;
    gameOver += " - ";
    gameOver += thisScore;
    gameOver += "</p>";
    gameOver += "<button onclick=\"goBack();\">Go Back</button>";
    gameOver += "<button onclick=\"clearScores();\">Clear Highscores</button>";

    document.getElementById("content").innerHTML = gameOver;
}

function displayAllDone() {
    var allDone = "<h3>All done!</h3>";
    allDone += "<p>Your final score is: ";
    allDone += thisScore;
    allDone += "</p><label for='initials'>Enter Initials:</label>";
    allDone += "<input id='initials' type='text'>";
    allDone += "<button onclick=\"handleInitials();\">Submit</button>";
    
    document.getElementById("content").innerHTML = allDone;
}

var timerInterval = {};
function startQuiz() {
    console.log('startquiz');
    var question = {};
    

    if (questionPosition < questions.length) {
        question= loadQuestion(questionPosition);
        displayQuestion(question, questionPosition);
        document.getElementById("startButton").style = "display: none;";

        if (timerStarted === false)  {
           timerStarted = true;
           time = 75;
           timerInterval = setInterval(timer, 1000);
           console.log("timerstarted");  
       
       }
        

    } else {
        console.log('Ran out of questions');
        displayAllDone();
        clearInterval(timerInterval);
        return;
    }
    questionPosition++;
}

var startButton = document.getElementById("startButton");
startButton.addEventListener("click", startQuiz);