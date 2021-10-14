const apiKey= "91114430"
const imdbKey = "k_7sn98acw"
const omdbURL = "http://www.omdbapi.com/?apikey=91114430"
var movieList = [];
var tvList = [];

var movieObject = [];
var tvObject = [];

//creates an array of movies with IMDb-API
function getMovieListAPI(){
    fetch("https://imdb-api.com/en/API/Top250Movies/k_7sn98acw")
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        for(i=0; i<data.items.length; i++){
            //pushed movie id's to movieList Variable
            movieList.push(data.items[i].id)
        }
    })
}

//creates an array of tv shows with IMDb-API
function getTVShowListAPI (){
    fetch("https://imdb-api.com/en/API/Top250TVs/k_7sn98acw")
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        //pushed tv show id's to tvList variable
        for(i=0; i<data.items.length; i++){
            tvList.push(data.items[i].id)
        }
    })
}

function getTitleForMoviesAndShows(){
    for(i=0; i<movieList.length; i++){
        fetch("http://www.omdbapi.com/?apikey=91114430&i="+movieList[i].toString())
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            movieObject[i] = {
                genre:data.genre,
                title:data.title,
                year:data.year,
                image:data.poster,
                rating:data.imdbRating
            }
            console.log(data)
        })
    }
    
}
