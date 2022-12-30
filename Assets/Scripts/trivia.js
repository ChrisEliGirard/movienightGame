//<<<<<<< HEAD
var timerE1 = document.getElementById('countdown');
var questionE1 = document.getElementById('question');
var answerE1 = document.getElementById('a');
var answerE2 = document.getElementById('b');
var answerE3 = document.getElementById('c');
var answerE4 = document.getElementById('d');
var labelE1 = document.getElementById('a_text');
var labelE2 = document.getElementById('b_text');
var labelE3 = document.getElementById('c_text');
var labelE4 = document.getElementById('d_text');
var replyE1 = document.getElementById('reply');
var timeLeft = 90;
var getSelectedValue = document.querySelector( 'input[name="answer"]:checked');
var startpoint = 0;
var singleQuestion = {
  "question": "",
  "correctAnswer": "",
  "incorrectAnswers": []
};
var myArray = [];

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

    function createAPI() {

      var requestUrl = "https://opentdb.com/api.php?amount=10&category=11";
      
    
      fetch(requestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          for (var i = startpoint; i < data.results.length; i++) {
            singleQuestion.question = data.results[i].question;
            singleQuestion.correctAnswer = data.results[i].correct_answer;
            singleQuestion.incorrectAnswers = data.results[i].incorrect_answers;
            myArray.push(singleQuestion);
            askQuestions();
          }
        });
        
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

}

function displayNextQA(startpoint, quizArray)
{
    // Randomly or sequentially iterate through array of QAs
    
}

function askQuestions(){
    singleQuestion.question=singleQuestion.question.replace(/&#039;/g, "\'");
    singleQuestion.question=singleQuestion.question.replace(/&quot;/g, "\"");
    singleQuestion.question=singleQuestion.question.replace(/&amp;/g, "\&");
    singleQuestion.question=singleQuestion.question.replace(/&rsquo;/g, "\'");
    questionE1.textContent = singleQuestion.question;
    singleQuestion.correctAnswer=singleQuestion.correctAnswer.replace(/&#039;/g, "\'");
    singleQuestion.correctAnswer=singleQuestion.correctAnswer.replace(/&quot;/g, "\"");
    singleQuestion.correctAnswer=singleQuestion.correctAnswer.replace(/&amp;/g, "\&");
    singleQuestion.correctAnswer=singleQuestion.correctAnswer.replace(/&rsquo;/g, "\'");
    labelE1.textContent = singleQuestion.correctAnswer;
    singleQuestion.incorrectAnswers[0]=singleQuestion.incorrectAnswers[0].replace(/&#039;/g, "\'");
    singleQuestion.incorrectAnswers[0]=singleQuestion.incorrectAnswers[0].replace(/&quot;/g, "\"");
    singleQuestion.incorrectAnswers[0]=singleQuestion.incorrectAnswers[0].replace(/&amp;/g, "\&");
    singleQuestion.incorrectAnswers[0]=singleQuestion.incorrectAnswers[0].replace(/&rsquo;/g, "\'");
    labelE2.textContent = singleQuestion.incorrectAnswers[0];
    if(singleQuestion.incorrectAnswers[1] != null) {
      singleQuestion.incorrectAnswers[1]=singleQuestion.incorrectAnswers[1].replace(/&#039;/g, "\'");
      singleQuestion.incorrectAnswers[1]=singleQuestion.incorrectAnswers[1].replace(/&quot;/g, "\"");
      singleQuestion.incorrectAnswers[1]=singleQuestion.incorrectAnswers[1].replace(/&amp;/g, "\&");
      singleQuestion.incorrectAnswers[1]=singleQuestion.incorrectAnswers[1].replace(/&rsquo;/g, "\'");
      answerE3.style.visibility="visible";
      labelE3.style.visibility="visible";
      labelE3.textContent = singleQuestion.incorrectAnswers[1]; }
    else{
      answerE3.style.visibility="hidden";
      labelE3.style.visibility="hidden";
    }
    if(singleQuestion.incorrectAnswers[2] != null) {
      singleQuestion.incorrectAnswers[2]=singleQuestion.incorrectAnswers[2].replace(/&#039;/g, "\'");
      singleQuestion.incorrectAnswers[2]=singleQuestion.incorrectAnswers[2].replace(/&quot;/g, "\"");
      singleQuestion.incorrectAnswers[2]=singleQuestion.incorrectAnswers[2].replace(/&amp;/g, "\&");
      singleQuestion.incorrectAnswers[2]=singleQuestion.incorrectAnswers[2].replace(/&rsquo;/g, "\'");
      answerE4.style.visibility="visible";
      labelE4.style.visibility="visible";
      labelE4.textContent = singleQuestion.incorrectAnswers[2]; }
    else {
      answerE4.style.visibility="hidden";
      labelE4.style.visibility="hidden";
    }
    return;
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
    var answergiven = '';
    if(document.getElementById('a').checked) {   
      answergiven = 'a';
      console.log(answergiven)
    }   
    else if(document.getElementById('b').checked) {   
      answergiven = 'b';
      console.log(answergiven);
    }   
    else if(document.getElementById('c').checked) {   
      answergiven = 'c';
      console.log(answergiven);
    }   
  else if(document.getElementById('d').checked) {   
      answergiven = 'd';
      console.log(answergiven)
    }  
  else {   
      answergiven = '';
    }
    if(answergiven == 'a') {
      replyE1.textContent = "Correct!";
    }
    else{
      replyE1.textContent = "Wrong!"
    }
    startpoint++;
    
    if(startpoint < 10){
      askQuestions();
    }
    else{
      console.log("done");
    }
    document.getElementById(answergiven).checked = false;
    createAPI();
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

countdown();
createAPI();

//>>>>>>> d93e6a24626e8afe88d1df7b8ae9c493ca8919cb
