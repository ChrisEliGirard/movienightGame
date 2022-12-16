var timerE1 = document.getElementById('countdown');

function countdown() {
    var timeLeft = 90;

    var timeInterval = setInterval(function () {
        if (timeLeft >= 1) {
          timerE1.textContent = timeLeft + ' seconds remaining';
          timeLeft--;
        }  else {
          timerE1.textContent = '';
          clearInterval(timeInterval);
        }
      }, 1000);
    }

    countdown();
