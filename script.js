const apiKey= "91114430"
const imdbKey = "k_7sn98acw"
const top250movies = "https://imdb-api.com/en/API/Top250Movies/k_7sn98acw"
const omdbURL = "http://www.omdbapi.com/?apikey=91114430"
var movieList;
function getAPI() {
    fetch(top250movies)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data.id)
    })
}