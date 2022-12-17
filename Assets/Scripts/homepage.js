// Save features may change slightly. For now if the user searches for a movie it will be saved to their list
// Will need to present the option to save a movie to their list

// Selectors
let movieSearchEl = $("#TITLE SEARCH ID");
let movieListEl = $("#MOVIE LIST ID");
let movieNotFoundModalEl = $("#MOVIE NOT FOUND ID");
let modalButtonEl = $("#MODAL CLOSE ID");

// Global Variables
let omdbKey = "3e723361"
let nytimesKey = "Wv8CqWp1AwfoFBw2eqi5iK83OjGy3A7N"


// Will be userful to create a default user profile for initial loading and for those that dont create or login to an account
// Default profile should be cleared 
function createDefaultProfile()
{
    // Used for initial loading of main page and throughout site if the user nevers creates or logs into an account.
    // Build a user object; Store in localStorage; Set as the active user in sessionStorage
}

function displayLoginModal()
{
    // When the login button is clicked - Display modal with username/password fields; Login button; Create Account button; Cancel button
    // User completes both fields and clicks one of the buttons
}

function createUserProfile()
{
    // When Create Account button is clicked: 
    // Check local storage and if the account already exits then display message indicating
    // Else create a user object and send to storage with the account name as the store name
    // Assuming creation of new user then log the user in after account creation
}

function logInProfile()
{
    // Called when Login Button is clicked or createUserProfile function calls
    // Username/password is used to get that users local stored object - store name should match the username
    // The user object will need to be loaded into sessionStorage to persist throughout the pages
}

function displayProfileMovieCarousel()
{
    // Load movies from list stored with the users profile
}

function displayListOfMovies()
{
    // If a list is returned then display the list of returned movies as clickable elements.
    // When selected send another requestAPI() 
    // Else send the single returned object to requestAPI()
}

// Displays API movie-not-found errors (nytimes needs further testing)
function displayErrorModal(msg)
{
    myModalEl.children(".modal-content").empty();
    myModalEl.children(".modal-content").append(
        $("<span>", { "class": "close" }).html("&times;"),
        $("<p>").text(msg)
    );
    movieNotFoundModalEl.css("display", "block");
}

function loadTriviaGame()
{
    // Load next page. Ensure page loads in the same tab - sessionStorage does not persist across different tabs or windows
}

// When a user searches for a movie use the '?s=' query parameter with callback to displayListOfMovies()
// When searching for full data of a single movie use '?t=' parameter
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

function createMovieObj(value)
{
    let movieObj = {
        name: value.Title,
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
    requestAPI(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${movieObj.name.split(" ").join("+")}&api-key=${nytimesKey}`, addReviewToMovieObj);
}

function addReviewToMovieObj(value)
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

function getSessionStorage()
{

}

function setSessionStorage()
{
    // Once data is set or updated to sessionStorage then also update/set localStorage
}

function getLocalStorage(storeName)
{
    let storage = JSON.parse(localStorage.getItem(storeName));
    return storage;
}

function setLocalStorage(obj, storeName)
{
    let storage = JSON.parse(localStorage.getItem(storeName));

    // Check if storage is null. If so then this is the first element to be added so skip to else
    if (storage)
    {
        // Iterate through the stored objects looking for duplicate entries. If a dupe is found
        // then its removed and the new instance is added.
        for (let i = 0; i < storage.length; i++)
        {
            if (obj.name === storage[i].name)
            {
                storage.splice(i, 1);
            }
        }

        storage.push(obj);
    } else
    {
        storage = [obj];
    }

    localStorage.setItem(storeName, JSON.stringify(storage));
}

movieSearchEl.keypress(function (event)
{
    let searchArg = "s=" + event.target.value;
    if (event.which == 13)
    {
        // Search Params: ?s= will return an array of up to 10 movies that has a matching pattern in the title.
        // Search Params: ?t= will return the first movie that matches the search pattern.
        requestAPI(`http://www.omdbapi.com/?${searchArg}&type=movie&r=json&apikey=${omdbKey}`, displayListOfMovies);
    }
});

movieListEl.on("click", "#movie-button", function (event)
{
    let searchArg = "t=" + event.target.textContent.split("-")[1].trim();
    requestAPI(`http://www.omdbapi.com/?${searchArg}&type=movie&r=json&apikey=${omdbKey}`, createMovieObj);
});

// Homepage on(click/submit) events
// on click for movie carousel/watchlist cards to load movie info into results page
// on click for Starting the Trivia Game

// Global on(click/submit) events
// on click for Login
// on click for Home