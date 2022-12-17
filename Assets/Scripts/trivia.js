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