var movieListEl = document.getElementById("movie-list")
var movieFormEl = document.getElementById("searchName")
var searchFormEl = document.getElementById("searchForm")
var searchResultsEl = document.getElementById("searchResults")
var searchError= document.getElementById("error")

// IF NO SEARCH, SHOW UPCOMING MOVIES

var getUpcomingMovies = function() {
    var apiUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key=3fa1f09b9409b474da0058e7029fa615&language=en-US&page=1"
    
    fetch(apiUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
         console.dir(data);
         var upcomingMovieArray = data.results
         displayUpcomingMovies(upcomingMovieArray);

    })
    
}

var displayUpcomingMovies = function (movieArray) {

        for (i = 0; i < movieArray.length; i++) {

            var upcomingPicture = movieArray[i].poster_path;
            var upcomingMovieId = movieArray[i].id;

            if (upcomingPicture != "N/A"){

                var upcomingTitle = document.getElementById("upcomingTitle");
                upcomingTitle.innerHTML = "Upcoming Movies You'd Love"

                var movieTitle = document.createElement("h4");
                movieTitle.append(movieArray[i].title); //<h4> "data.title" </h4>

                var moviePoster = document.createElement("img");
                moviePoster.setAttribute("src", "https://image.tmdb.org/t/p/w342"+upcomingPicture); // <img src="poster_path">

                var movieCard = document.createElement("a");
                movieCard.setAttribute("href", "./search.html?title=" + upcomingMovieId)
                movieCard.classList = ("well text-center movie-card")
                movieCard.append(movieTitle);
                movieCard.append(moviePoster);

                var upcomingEl = document.getElementById("upcomingList");
                upcomingEl.append(movieCard);
            }


        }
    }

getUpcomingMovies();

var movieSearch = function (event) {
    event.preventDefault();
    var movie = movieFormEl.value.trim();

    
    if (movie) {
        //if there's a real movie being searched, stop recommending upcoming movies
        var upcomingMovieEl = document.getElementById("upcomingMovies");
        upcomingMovieEl.innerHTML = "";
        searchResults(movie);
        searchError.innerText=" ";
        movieFormEl.value = " ";
    }
    else {
        searchError.innerText="Please Enter A Movie Name"
    }
}

searchFormEl.addEventListener("submit", movieSearch);



var searchResults = function (movie) {
    var apiUrl = "https://www.omdbapi.com/?&s=" + movie + "&type=movie&apikey=c952743e"
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.dir(data)
            var movieResults = data.Search

            displayMovies(movieResults, movie);

        })
}

var displayMovies = function (movieResults, movie) {

    movieListEl.textContent = (" ")


    console.dir(movieResults)

    if (!movieResults){
        searchError.innerText ="No Results Found For " +movie   
    }

    else{

        searchError.innerText = "Showing Results For "+movie;


        for (i = 0; i < movieResults.length; i++) {

            var moviePicture = movieResults[i].Poster
            

            if (moviePicture != "N/A"){

                var movieTitle = movieResults[i].Title
                var movieId = movieResults[i].imdbID
                console.log(movieId);

                // create a link to contain the movie poster
                var movieBox = document.createElement("a")
                movieBox.setAttribute("href", "./search.html?title=" + movieId)
                movieBox.classList = ("col-md-3 pt-2")
                movieBox.setAttribute("id", "moviePoster")

                //movie Poster holding the image and title
                var moviePoster = document.createElement("div")
                moviePoster.classList = ("well text-center poster-div")
                //movie image
                var movieImage = document.createElement("img");
                movieImage.setAttribute("src", moviePicture);
                //movie title
                var posterTitle = document.createElement("h5")
                posterTitle.innerText = movieTitle


                moviePoster.appendChild(movieImage)
                moviePoster.appendChild(posterTitle)
                movieBox.appendChild(moviePoster)
                movieListEl.appendChild(movieBox)
            }
        }

        document.getElementById("movieBackground").scrollIntoView();
    }

}



  

 