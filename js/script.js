const apiKey= "91114430"
const imdbKey = "k_7sn98acw"
const omdbURL = "http://www.omdbapi.com/?apikey=91114430"
var movieList = [];
var tvList = [];

var movieObject = [];
var tvObject = [];

var happy = [];
var sad = [];
var angry = [];
var anxious = [];
var inLove = [];

var happyTv = [];
var sadTv = [];
var angryTv = [];
var anxiousTv = [];
var inLoveTv = [];


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

//creates objects with data for each movie
function getTitleForMoviesAndShows(){
    for(i=0; i<movieList.length; i++){
        //finds each movie based on imdbID
        fetch("http://www.omdbapi.com/?apikey=91114430&i="+movieList[i].toString())
        .then(function(response){
            return response.json()
        })
        //creates the object
        .then(function(data){
            var movieData = {
                genre:data.Genre,
                title:data.Title,
                year:data.Year,
                poster:data.Poster,
                rating:data.imdbRating
            }
            movieObject.push(movieData)
        })
        //finds each tv show based on imbdID
        fetch("http://www.omdbapi.com/?apikey=91114430&i="+tvList[i].toString())
        .then(function(response){
            return response.json()
        })
        //creates the object
        .then(function(data){
            var tvData = {
                genre:data.Genre,
                title:data.Title,
                year:data.Year,
                poster:data.Poster,
                rating:data.imdbRating
            }
            tvObject.push(tvData) 
        })
    }
}
//seperate movies

//function to get a list of happy movies
function getHappy(){
    //array for genre options
    var emotionHappy = ["Adventure", "Animation", "Comedy", "Family", "Fantasy", "Gameshow", "Musical"]
    var movieAlreadyAdded = false;
    //loop to go through the genre
    for(i=0;i<emotionHappy.length;i++){
        //loops through movies
        for(j=0;j<movieObject.length;j++){
            //checks if movie has already been added or not
            if(movieObject[j].genre.search(emotionHappy[i]) >= 0){
                for(k=0;k<happy.length;k++){
                    if(happy[k] === movieObject[j]){
                        movieAlreadyAdded = true;
                    }
                }
                //pushes movie to the emotion array
                if(!movieAlreadyAdded){
                    happy.push(movieObject[j])
                }else{
                    movieAlreadyAdded = false;
                }
            }
        }
    }
}
//gets list of sad movies
function getSad(){
    var emotionSad = ["Documentary", "Drama", "History", "Romance", "War"]
    var movieAlreadyAdded = false;
    for(i=0;i<emotionSad.length;i++){
        for(j=0;j<movieObject.length;j++){
            if(movieObject[j].genre.search(emotionSad[i]) >= 0){
                for(k=0;k<sad.length;k++){
                    if(sad[k] === movieObject[j]){
                        movieAlreadyAdded = true;
                    }
                }
                if(!movieAlreadyAdded){
                    sad.push(movieObject[j])
                }else{
                    movieAlreadyAdded = false;
                }
            }
        }
    }
}
//gets list of Angry Movies
function getAngry(){
    var emotionAngry = ["Action", "Crime", "Documentary", "History", "Sci-Fi", "Sport", "War", "Western"]
    var movieAlreadyAdded = false;
    for(i=0;i<emotionAngry.length;i++){
        for(j=0;j<movieObject.length;j++){
            if(movieObject[j].genre.search(emotionAngry[i]) >= 0){
                for(k=0;k<angry.length;k++){
                    if(angry[k] === movieObject[j]){
                        movieAlreadyAdded = true;
                    }
                }
                if(!movieAlreadyAdded){
                    angry.push(movieObject[j])
                }else{
                    movieAlreadyAdded = false;
                }
            }
        }
    }
}
//get list of Anxious Movies
function getAnxious(){
    var emotionAnxious = ["Crime", "Documentary", "Film-Noir", "Horror", "Music", "Mystery", "Thriller"]
    var movieAlreadyAdded = false;
    for(i=0;i<emotionAnxious.length;i++){
        for(j=0;j<movieObject.length;j++){
            if(movieObject[j].genre.search(emotionAnxious[i]) >= 0){
                for(k=0;k<anxious.length;k++){
                    if(anxious[k] === movieObject[j]){
                        movieAlreadyAdded = true;
                    }
                }
                if(!movieAlreadyAdded){
                    anxious.push(movieObject[j])
                }else{
                    movieAlreadyAdded = false;
                }
            }
        }
    }
}
//gets list of loving movies
function getInLove(){
    var emotionInLove = ["Adventure", "Animation", "Drama", "Family", "Fantasy", "Romance"]
    var movieAlreadyAdded = false;
    for(i=0;i<emotionInLove.length;i++){
        for(j=0;j<movieObject.length;j++){
            if(movieObject[j].genre.search(emotionInLove[i]) >= 0){
                for(k=0;k<inLove.length;k++){
                    if(inLove[k] === movieObject[j]){
                        movieAlreadyAdded = true;
                    }
                }
                if(!movieAlreadyAdded){
                    inLove.push(movieObject[j])
                }else{
                    movieAlreadyAdded = false;
                }
            }
        }
    }
}
//end of get emotion functions

//function to get a list of happy Tv shows
function getHappyTv(){
    //array for genre options
    var emotionHappy = ["Adventure", "Animation", "Comedy", "Family", "Fantasy", "Gameshow", "Musical"]
    var TvAlreadyAdded = false;
    //loop to go through the genre
    for(i=0;i<emotionHappy.length;i++){
        //loops through Tv show
        for(j=0;j<tvObject.length;j++){
            //checks if Tv show has already been added or not
            if(tvObject[j].genre.search(emotionHappy[i]) >= 0){
                for(k=0;k<happyTv.length;k++){
                    if(happyTv[k] === tvObject[j]){
                        TvAlreadyAdded = true;
                    }
                }
                //pushes Tv show to the emotion array
                if(!TvAlreadyAdded){
                    happyTv.push(tvObject[j])
                }else{
                    TvAlreadyAdded = false;
                }
            }
        }
    }
}
//gets list of sad Tv shows
function getSadTv(){
    var emotionSad = ["Documentary", "Drama", "History", "Romance", "War"]
    var TvAlreadyAdded = false;
    for(i=0;i<emotionSad.length;i++){
        for(j=0;j<tvObject.length;j++){
            if(tvObject[j].genre.search(emotionSad[i]) >= 0){
                for(k=0;k<sadTv.length;k++){
                    if(sadTv[k] === tvObject[j]){
                        TvAlreadyAdded = true;
                    }
                }
                if(!TvAlreadyAdded){
                    sadTv.push(tvObject[j])
                }else{
                    TvAlreadyAdded = false;
                }
            }
        }
    }
}
//gets list of Angry Tv shows
function getAngryTv(){
    var emotionAngry = ["Action", "Crime", "Documentary", "History", "Sci-Fi", "Sport", "War", "Western"]
    var TvAlreadyAdded = false;
    for(i=0;i<emotionAngry.length;i++){
        for(j=0;j<tvObject.length;j++){
            if(tvObject[j].genre.search(emotionAngry[i]) >= 0){
                for(k=0;k<angryTv.length;k++){
                    if(angryTv[k] === tvObject[j]){
                        TvAlreadyAdded = true;
                    }
                }
                if(!TvAlreadyAdded){
                    angryTv.push(tvObject[j])
                }else{
                    TvAlreadyAdded = false;
                }
            }
        }
    }
}
//get list of Anxious Tv shows
function getAnxiousTv(){
    var emotionAnxious = ["Crime", "Documentary", "Film-Noir", "Horror", "Music", "Mystery", "Thriller"]
    var TvAlreadyAdded = false;
    for(i=0;i<emotionAnxious.length;i++){
        for(j=0;j<TvAlreadyAdded.length;j++){
            if(tvObject[j].genre.search(emotionAnxious[i]) >= 0){
                for(k=0;k<anxiousTv.length;k++){
                    if(anxiousTv[k] === tvObject[j]){
                        TvAlreadyAdded = true;
                    }
                }
                if(!TvAlreadyAdded){
                    anxiousTv.push(tvObject[j])
                }else{
                    TvAlreadyAdded = false;
                }
            }
        }
    }
}
//gets list of loving Tv shows
function getInLoveTv(){
    var emotionInLove = ["Adventure", "Animation", "Drama", "Family", "Fantasy", "Romance"]
    var TvAlreadyAdded = false;
    for(i=0;i<emotionInLove.length;i++){
        for(j=0;j<tvObject.length;j++){
            if(tvObject[j].genre.search(emotionInLove[i]) >= 0){
                for(k=0;k<inLoveTv.length;k++){
                    if(inLoveTv[k] === tvObject[j]){
                        TvAlreadyAdded = true;
                    }
                }
                if(!TvAlreadyAdded){
                    inLoveTv.push(tvObject[j])
                }else{
                    TvAlreadyAdded = false;
                }
            }
        }
    }
}
//end of get Tv emotion functions

//code for materialize carousel
$('.carousel').carousel({
    fullWidth: true,
    // indicators: true,
  });
  $(document).ready(function(){
    $('.carousel').carousel();
    // $('.carousel').width(600);
    // $('.carousel').height(250);
  });

  