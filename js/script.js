const apiKey= "91114430"
const imdbKey = "k_7sn98acw"
const omdbURL = "http://www.omdbapi.com/?apikey=91114430"
var movieList = [];
var tvList = [];

var movieObject = [];
var tvObject = [];

var selectedEmotion = JSON.parse(localStorage.getItem('selectedEmotion'))

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


//when page loads
onLoad()
function onLoad(){
    checkLocalStorage()
    getEmotionList()
    pageAmount()
    setLocalItems()
}

//checks local storage creates objects if null
function checkLocalStorage(){
    movieObject = JSON.parse(localStorage.getItem('movies'))
    tvObject = JSON.parse(localStorage.getItem('shows'))
    console.log(movieObject)
    console.log(tvObject)
    if(!movieObject && !tvObject || movieObject == 0 && tvObject == 0){
        movieObject = []
        tvObject = []
        getMovieListAPI()
        getTVShowListAPI()
        getTitleForMoviesAndShows()
    }
}

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
/*function getMovieData(){
    let promises = [];
    for(let i = 0; i <movieList.length; i++){
        promises.push(fetch("http://www.omdbapi.com/?apikey=91114430&i="+movieList[i].toString()+"&plot=full"))
    }
    Promise.all(promises)
        .then(function (data){
            console.log(data)
        })
}*/
//creates objects with data for each movie
function getTitleForMoviesAndShows(){
    //getMovieData()
    

    for(i=0; i<movieList.length; i++){
        //finds each movie based on imdbID
        fetch("http://www.omdbapi.com/?apikey=91114430&i="+movieList[i].toString()+"&plot=full")
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
                rating:data.imdbRating,
                plot:data.Plot
            }
            movieObject.push(movieData)
            
            fetch("http://www.omdbapi.com/?apikey=91114430&i="+tvList[i].toString()+"&plot=full")
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
                        rating:data.imdbRating,
                        plot:data.Plot
                    }
                    tvObject.push(tvData) 
                })
        })
        //finds each tv show based on imbdID
        
    }
    //sets local items
    
}
function setLocalItems(){
    localStorage.setItem('movies', JSON.stringify(movieObject))
    localStorage.setItem('shows', JSON.stringify(tvObject))
}
//shuffles arrays so they aren't always the same
function shuffle(selectedEmotion) {
    selectedEmotion.sort(() => Math.random() - 0.5);
}
function getEmotionList(){
    if(selectedEmotion === "happy"){
        getHappy()
        selectedEmotion = happy
        shuffle(selectedEmotion)
    }else if(selectedEmotion === "sad"){
        getSad()
        selectedEmotion = sad
        shuffle(selectedEmotion)
    }else if(selectedEmotion === "angry"){
        getAngry()
        selectedEmotion = angry
        shuffle(selectedEmotion)
    }else if(selectedEmotion === "anxious"){
        getAnxious()
        selectedEmotion = anxious
        shuffle(selectedEmotion)
    }else if(selectedEmotion === "in-love"){
        getInLove()
        selectedEmotion = inLove
        shuffle(selectedEmotion)
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
var offset;
//creates menu for 
function createColumnCards(){
    var mainCardArea = $('#movie-container .row')
    mainCardArea.children().remove()
    if(!offset){
        offset = 1
    }
    for(i=(offset*12)-11; i<=offset*12; i++){
        if(!selectedEmotion[i]){
            return
        }
        //creates main card column
        var mainCardAreaNumber = $('<div class="col s6 m4  12" id=movieNo-'+i+'>')
        mainCardAreaNumber.appendTo(mainCardArea)
        //creates the main card
        $('<div class="card">').appendTo(mainCardArea.children())
        //gives the card an image container and specifies the image
        $('<div class="card-image waves-effect waves-block waves-light">').appendTo(mainCardAreaNumber.find('.card'))
        $(`<img class="activator" src="${selectedEmotion[i].poster}">`).appendTo(mainCardAreaNumber.find('.card-image'))
        //gives the card details and a link
        $('<div class="card-content cardBg">').appendTo(mainCardAreaNumber.find('.card'))
        $('<span class="card-title activator white-text text-lighter customCardTitle">').text(selectedEmotion[i].title).appendTo(mainCardAreaNumber.find('.card-content'))
        $('<i class="material-icons right">').text('more_vert').appendTo(mainCardAreaNumber.find('.card-title'))
        $('<p>').appendTo(mainCardAreaNumber.find('.card-content'))
        $('<a href="#">').text('This is a link').appendTo(mainCardAreaNumber.find('.card-content p'))
        //creates the reveal part of card
        $('<div class="card-reveal cardBg">').appendTo(mainCardAreaNumber.find('.card'))
        $('<span class="card-title activator white-text text-lighter customCardTitle">').text(selectedEmotion[i].title).appendTo(mainCardAreaNumber.find('.card-reveal'))
        $('<i class="material-icons right">').text('close').appendTo(mainCardAreaNumber.find('.card-reveal .card-title'))
        $('<p class="white-text text-lighter">').text(selectedEmotion[i].plot).appendTo(mainCardAreaNumber.find('.card-reveal'))
    }
}
var activePage;
var lastPage;
//function to create amount of pages in pagination
function pageAmount(){
    var pages = Math.ceil(selectedEmotion.length/12)
    lastPage = pages
    for(i=1; i<=pages;i++){
        //from alfie ty much hlep
        $(`<li class="${i === 1 ? 'active' : 'wave-length'}"><a id="movie-page-${i}">${i}</a></li>`).insertBefore('.pagination li:last-child')
    }
    activePage = 1;
    createColumnCards()
}

//function to move page one left
$('#movie-container-pages').find('.pagination li:first-child a').click(function previousMoviePage(){
    if(activePage === 1){
        return
    }else{
        $('#movie-container-pages').find('#movie-page-'+activePage+'').parent().attr('class', 'waves-effect')
        activePage--;
        $('#movie-container-pages').find('#movie-page-'+activePage+'').parent().attr('class', 'active')
        console.log(activePage)
        offset = activePage
        createColumnCards()
    }
})
//function to move page on right
$('#movie-container-pages').find('.pagination li:last-child a').click(function nextMoviePage(){
    if(activePage === lastPage){
        return
    }else{
        $('#movie-container-pages').find('#movie-page-'+activePage+'').parent().attr('class', 'waves-effect')
        activePage++
        $('#movie-container-pages').find('#movie-page-'+activePage+'').parent('li').attr('class', 'active')
        console.log(activePage)
        offset = activePage
        createColumnCards()
    }
})

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

  