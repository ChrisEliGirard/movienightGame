$(function ()
{
    let movieSearchEl = $("#title-search");
    let myModalEl = $("#errorModal");
    let modalButtonEl = $("#myBtn");
    let movieListEl = $("#movie-list")

    let omdbKey = "3e723361"
    let nytimesKey = "Wv8CqWp1AwfoFBw2eqi5iK83OjGy3A7N"

    // `https://opentdb.com/api.php?amount=10&category=11`
    // `http://www.omdbapi.com/?s=${searchParams}&type=movie&r=json&apikey=${omdbKey}`
    // `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${searchParams}&api-key=${nytimesKey}`

    // This function handles all API requests. Requires URL with params and args loaded, and a callback function
    function requestAPI(url, infoCallback)
    {
        $.ajax({
            url: url,
            type: "GET",
            timeout: 5000,
            success: function (data)
            {
                // OMDB returns True if a movie is found. NYTimes returns OK if found
                if (data.Response == "True" || data.status == "OK")
                {
                    // Callback function
                    infoCallback(data);
                } else
                {
                    // For now if no movie is found a modal pops up with error text (if my temp html/css files are present)
                    displayErrorModal(data.Error);
                }
            },
            error: function (xhr, status, error)
            {
                // Needs error handling work
                // displayErrorModal(xhr.status);
            }
        });
    }

    function buildMovieObj(value)
    {
        let movieObj = {
            title: value.Title,
            genre: value.Genre,
            rated: value.Rated,
            actors: value.Actors,
            year: value.Year,
            ratings: value.Ratings,
            plot: value.Plot,
            poster: value.Poster,
            metascore: value.Metascore,
            imdbRating: value.imdbRating,
            review: ""
        };

        setLocalStorage(movieObj, "movieObjects");

        // Now that the movie is stored we have to reach out to nytimes for the review link
        requestAPI(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${movieObj.title.split(" ").join("+")}&api-key=${nytimesKey}`, addMovieReview);
    }

    function addMovieReview(value)
    {
        let storedMovieObjs = getLocalStorage("movieObjects");

        // Because the movieobj is already stored we have to iterate through the stored movies
        // And match the nytimes obj title with the stored movie title and add the review to that movieobj
        storedMovieObjs.forEach(element =>
        {
            if (value.results[0].display_title === element.title)
            {
                // Match found. Send this one element back to storage
                element.review = value.results[0].link;
                setLocalStorage(element, "movieObjects");
            }
        });
    }

    function getLocalStorage(storeName)
    {
        let storage = JSON.parse(localStorage.getItem(storeName));
        return storage;
    }

    // Storage can easily be limited to X number of saved movie objects
    function setLocalStorage(obj, storeName)
    {
        let storage = JSON.parse(localStorage.getItem(storeName));

        // Check if storage is null. If so then this is the first element to be added so skip to else
        if (storage)
        {
            // Iterate through the stored objects looking for duplicate movie titles. If a dupe is found
            // then the dupe is removed from storage and the new instance is added.
            for (let i = 0; i < storage.length; i++)
            {
                if (obj.title === storage[i].title)
                {
                    storage.splice(i, 1);
                }
            }

            storage.push(obj);
        }else
        {
            storage = [obj];
        }

        localStorage.setItem(storeName, JSON.stringify(storage));
    }

    // Used just to display the list of returned movies from a wildcard api query
    function displayMovieList(value)
    {
        let listOfMovies = value.Search

        // Display list of movies for the user to select from
        for (let i = 0; i < listOfMovies.length; i++)
        {
            movieListEl.append(
                $("<button>", { "id": "movie-button" }).text(listOfMovies[i].Year + " - " + listOfMovies[i].Title),
                $("<br>")
            )
        }
    }

    // Displays API movie-not-found errors (nytimes needs further testing)
    function displayErrorModal(msg)
    {
        myModalEl.children(".modal-content").empty();
        myModalEl.children(".modal-content").append(
            $("<span>", { "class": "close" }).html("&times;"),
            $("<p>").text(msg)
        );
        myModalEl.css("display", "block");
    }

    movieSearchEl.keypress(function (event)
    {
        let searchArg = "s=" + event.target.value;
        if (event.which == 13)
        {
            // Search Params: ?s= will return an array of up to 10 movies that has a matching pattern in the title.
            // Search Params: ?t= will return the first movie that matches the search pattern.
            requestAPI(`http://www.omdbapi.com/?${searchArg}&type=movie&r=json&apikey=${omdbKey}`, displayMovieList);
        }
    });

    movieListEl.on("click", "#movie-button", function (event)
    {
        let searchArg = "t=" + event.target.textContent.split("-")[1].trim();
        requestAPI(`http://www.omdbapi.com/?${searchArg}&type=movie&r=json&apikey=${omdbKey}`, buildMovieObj);
    });

    modalButtonEl.on("click", function () { myModalEl.css("display", "block"); });
    myModalEl.on("click", ".close", function () { myModalEl.css("display", "none"); });
    $(window).on("click", function (event) { if (event.target == myModalEl) { myModalEl.css("display", "none"); }; });
})