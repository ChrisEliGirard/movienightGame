//<<<<<<< HEAD
var timerE1 = document.getElementById('countdown');

;
function countdown() {
    var timeLeft = 90;

    var timeInterval = setInterval(function () {
        if (timeLeft >= 1) {
          timerE1.textContent = timeLeft;
          timeLeft--;
        }  else {
          timerE1.textContent = '';
          clearInterval(timeInterval);
        }
      }, 1000);
    }

    function getApi() {

      var requestUrl = "https://opentdb.com/api.php?amount=10&category=11";
      var myArray = [];
    
      fetch(requestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          for (var i = 0; i < data.results.length; i++) {
            var singleQuestion = {
              "question": "",
              "correctAnswer": "",
              "incorrectAnswers": []
            };
            singleQuestion.question = data.results[i].question;
            singleQuestion.correctAnswer = data.results[i].correct_answer;
            singleQuestion.incorrectAnswers = data.results[i].incorrect_answers;
            myArray.push(singleQuestion);
          }
        });
        console.log(myArray);
        return myArray;
        
    }
//=======
// Carry over functions to handle Nav bar functions
// Carry over functions to handle set/get to local and session storage 

function getTriviaQA()
{
    // Still need to figure out how to generate QAs - either a prefab list or finding another API
}

function displayStartButton()
{
    // Page should load with simple list of rules and Start button
}

function startTrivia()
{
    // Display timer, question with clickable answers
    countdown();
    var quizArray = getApi();
    var startpoint = 0;
    displayNextQA(startpoint, quizArray);

}

function displayNextQA(startpoint, quizArray)
{
    // Randomly or sequentially iterate through array of QAs
    console.log("Quiz", quizArray);
    var body = document.body;
    var theQuestion = document.createElement("p");
    console.log(quizArray[0]);
    theQuestion.textContent = quizArray[startpoint].question;
    var correct = document.getElementById(a_text);
  //  correct.textContent=quizArray[0].correctAnswer;
    var incorrect1 = document.getElementById(b_text);
  //  incorrect1.textContent=quizArray[0].incorrectAnswers[0];
}

function runTimer()
{
    // If timer runs out - displayCorrectAnswer()
}

function checkAnswer()
{
    // Do something when wrong/right answer; Limit number of guesses
    // Display hint if wrong answer
    // Once guess limit is hit or correct answer selected then displayCorrectAnswer() 
}

function displayCorrectAnswer()
{
    // Called from checkAnswer() when correct answer is selected or from runTimer() when time runs out
    // Highlight correct answer; Maybe display hint (remove clickability from answers)
    // Display Next and More Info buttons
    // Next calls displayNextQA(); More Info calls loadResults()
}

function loadResults()
{
    // Store movie title in sessionStorage
    // Load Results page
}

function getSessionStorage()
{

}

function setSessionStorage()
{
   
}

// Trivia on(click/submit) events
// on click for Start button
// on click for Answer buttons
// on click for Next button
// on click for MoreInfo button

// Global on(click/submit) events
// on click for Login
// on click for Home

startTrivia();
//>>>>>>> d93e6a24626e8afe88d1df7b8ae9c493ca8919cb
