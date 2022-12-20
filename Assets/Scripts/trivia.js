var timerE1 = document.getElementById('countdown');
var requestUrl = "https://opentdb.com/api_config.php";

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

    function getApi() {
    
      fetch(requestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          for (var i = 0; i < data.length; i++) {
      //      var listItem = document.createElement("li");
      //      listItem.textContent = data[i].html_url;
      //      repoList.appendChild(listItem);
            console.log(data);
          }
        });
    }
    countdown();
    getApi();
