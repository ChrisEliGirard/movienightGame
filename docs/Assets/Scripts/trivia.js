//<<<<<<< HEAD
var timerE1 = document.getElementById('countdown');
var requestUrl = "https://opentdb.com/api.php?amount=10&category=11";
var myArray = [];
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
    
      fetch(requestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          for (var i = 0; i < data.results.length; i++) {
      //      console.log(data.results[i].question);
      //      console.log(data.results[i].correct_answer);
      //      console.log(data.results[i].incorrect_answers)
            myArray[i].question = data.results[i].question;
            myArray[i].correct_answer = data.results[i].correct_answer;
            myArray[i].incorrect_answers = data.results[i].incorrect_answers;
            console.log(myArray[i].question);
            console.log(myArray[i].correct_answer);
            console.log(myArray[i].incorrect_answers);
          }
        });
        console.log("My array starts");
        console.log(myArray.length);
        for (var k = 0; k < myArray.length; k++) {
          console.log(myArray[k].question);
          console.log(myArray[k].correct_answer);
          console.log(myArray[k].incorrect_answers);
        }
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
    getApi();
}

function displayNextQA()
{
    // Randomly or sequentially iterate through array of QAs
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