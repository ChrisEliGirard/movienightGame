$(function ()
{
    let movieSearchEl = $("#title-search");
    let myModalEl = $("#errorModal");
    let modalButtonEl = $("#myBtn");
    let movieListEl = $("#movie-list")

    let omdbKey = "3e723361"
    let nytimesKey = "Wv8CqWp1AwfoFBw2eqi5iK83OjGy3A7N"

    // `https://opentdb.com/api.php?amount=10&category=11`
    // `http://www.omdbapi.com/?t=${searchParams}&type=movie&r=json&apikey=${omdbKey}`
    // `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${searchParams}&api-key=${nytimesKey}`


    // URL requires built-in search parameter (s=, t=), search value (bob), and api key (omdbKey)
    function requestAPI(url, infoCallback)
    {
        $.ajax({
            url: url,
            type: "GET",
            timeout: 5000,
            success: function (data)
            {
                if (data.Response == "True")
                {
                    infoCallback(data);
                } else
                {
                    displayErrorModal(data.Error);
                }
            },
            error: function (xhr, status, error)
            {
                // displayErrorModal(xhr.status);
            }
        });
    }

    function gatherMovieInfo(value)
    {
        let listOfMovies = value.Search
        console.log(listOfMovies)

        // Display list of movies for the user to select from
        for(let i = 0; i < listOfMovies.length; i++){
            movieListEl.append(
                $("<p>").text(listOfMovies[i].Year + " - " + listOfMovies[i].Title)
            )
        }

       
    }

    function displayErrorModal(msg)
    {
        myModalEl.children(".modal-content").empty();
        myModalEl.children(".modal-content").append(
            $("<span>", { "class": "close" }).html("&times;"),
            $("<p>").text(msg)
        );
        myModalEl.css("display", "block");
    }

    function getLocalStorage(storeName)
    {
        let storage = JSON.parse(localStorage.getItem(storeName));
        return storage;
    }

    function setLocalStorage(obj, storeName)
    {
        tmpValue = obj
        let storage = JSON.parse(localStorage.getItem(storeName));

        if (storage)
        {
            // If already exists in localStorage then remove the duplicate from storage
            if (storage.includes)
            {
                storage = storage.filter(function (e) { return e !== tmpValue })
            }

            // Limit number of objects stored?
            // if (storage.length > 5)
            // {
            //     storage.shift();
            // }

            storage.push(tmpValue);
        } else
        {
            storage = [tmpValue];
        }

        localStorage.setItem(storeName, JSON.stringify(storage));
    }

    movieSearchEl.keypress(function (event)
    {
        let params = "s=" + event.target.value;
        if (event.which == 13)
        {
            // Search Params: ?s= will return an array of up to 10 movies that has a matching pattern in the title.
            // Search Params: ?t= will return the first movie that matches the search pattern.
            // Might be worth performing a search with ?s first, present list of movies to the user and have them choose
            // from the list. Then use that title to pull the bulk info with ?t 
            requestAPI(`http://www.omdbapi.com/?${params}&type=movie&r=json&apikey=${omdbKey}`, gatherMovieInfo);
            // return false;
        }
    });

    modalButtonEl.on("click", function () { myModalEl.css("display", "block"); });
    myModalEl.on("click", ".close", function () { myModalEl.css("display", "none"); });
    $(window).on("click", function (event) { console.log(event.target); if (event.target == myModalEl) { console.log("close modal"); myModalEl.css("display", "none"); }; });
})