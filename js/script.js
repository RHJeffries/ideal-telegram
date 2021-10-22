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
var meh = []

var happyTv = [];
var sadTv = [];
var angryTv = [];
var anxiousTv = [];
var inLoveTv = [];
var mehTv = [];

var activePage;
var lastPage;

var showList = "movies"

//when page loads
onLoad()
function onLoad(){
    highLightCurrentEmotion()
    checkLocalStorage()    
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
        setTimeout(function(){
            getEmotionList()
            pageAmount()
        }, 5000)
             
    }else{
        getEmotionList()
        pageAmount()
    }
}

//creates an array of movies with IMDb-API
function getMovieListAPI(){
    fetch("https://imdb-api.com/en/API/Top250Movies/k_ikibdvys")
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        for(i=0; i<data.items.length; i++){
            //pushed movie id's to movieList Variable
            movieList.push(data.items[i].id)
        }
        getMovieData()
    })
}

//creates an array of tv shows with IMDb-API
function getTVShowListAPI (){
    fetch("https://imdb-api.com/en/API/Top250TVs/k_ikibdvys")
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        //pushed tv show id's to tvList variable
        for(i=0; i<data.items.length; i++){
            tvList.push(data.items[i].id)
        }
        getTvData()
    })
}
//creates objects with data for each movie
function getMovieData(){
    let promises = [];
    for(let i = 0; i <movieList.length; i++){
        promises.push(fetch("http://www.omdbapi.com/?apikey=91114430&i="+movieList[i].toString()+"&plot=full"))
    }
    Promise.all(promises)
        .then(function (responseArr){
            console.log(responseArr)
            let dataArr = [];
            for(let i = 0; i <responseArr.length; i++){
                dataArr.push(responseArr[i].json())
            }
            Promise.all(dataArr)
            .then(function(data){
                console.log(data)
                for(let i = 0; i<data.length; i++){
                    var movieData = {
                        genre:data[i].Genre,
                        title:data[i].Title,
                        titleId:movieList[i],
                        year:data[i].Year,
                        poster:data[i].Poster,
                        rating:data[i].imdbRating,
                        plot:data[i].Plot
                        
                    }
                    movieObject.push(movieData)
                }
                localStorage.setItem('movies', JSON.stringify(movieObject))
                console.log(movieObject)
            })
        })
}
function getTvData(){
    let promises = [];
    for(let i = 0; i <tvList.length; i++){
        promises.push(fetch("http://www.omdbapi.com/?apikey=91114430&i="+tvList[i].toString()+"&plot=full"))
    }
    Promise.all(promises)
        .then(function (responseArr){
            console.log(responseArr)
            let dataArr = [];
            for(let i = 0; i <responseArr.length; i++){
                dataArr.push(responseArr[i].json())
            }
            Promise.all(dataArr)
            .then(function(data){
                console.log(data)
                for(let i = 0; i<data.length; i++){
                    var tvData = {
                        genre:data[i].Genre,
                        title:data[i].Title,
                        titleId:movieList[i],
                        year:data[i].Year,
                        poster:data[i].Poster,
                        rating:data[i].imdbRating,
                        plot:data[i].Plot
                    }
                    tvObject.push(tvData)
                }
                localStorage.setItem('shows', JSON.stringify(tvObject))
                console.log(tvObject)

            })
        })
}
//shuffles arrays so they aren't always the same
function shuffle(selectedEmotion) {
    selectedEmotion.sort(() => Math.random() - 0.5);
}
function getEmotionList(){
    if(selectedEmotion === "happy"){
        $('#movie-container-title').text('Movies based on: Happy')
        if(showList === "movies"){
            getHappy()
            selectedEmotion = happy
        }else if(showList === "shows"){
            getHappyTv()
            selectedEmotion = happyTv
        }
        shuffle(selectedEmotion)
    }else if(selectedEmotion === "sad"){
        $('#movie-container-title').text('Movies based on: Sad')
        if(showList === "movies"){
            getSad()
            selectedEmotion = sad
        }else if(showList === "shows"){
            getSadTv()
            selectedEmotion = sadTv
        }
        shuffle(selectedEmotion)
    }else if(selectedEmotion === "angry"){
        $('#movie-container-title').text('Movies based on: Angry')
        if(showList === "movies"){
            getAngry()
            selectedEmotion = angry
        }else if(showList === "shows"){
            getAngryTv()
            selectedEmotion = angryTv
        }
        shuffle(selectedEmotion)
    }else if(selectedEmotion === "anxious"){
        $('#movie-container-title').text('Movies based on: Anxious')
        if(showList === "movies"){
            getAnxious()
            selectedEmotion = anxious
        }else if(showList === "shows"){
            getAnxiousTv()
            selectedEmotion = anxiousTv
        }
        shuffle(selectedEmotion)
    }else if(selectedEmotion === "in-love"){
        $('#movie-container-title').text('Movies based on: Love')
        if(showList === "movies"){
            getInLove()
            selectedEmotion = inLove
        }else if(showList === "shows"){
            getInLoveTv()
            selectedEmotion = inLoveTv
        }
        shuffle(selectedEmotion)
    }else if(selectedEmotion === "meh"){
        $('#movie-container-title').text('Meh you pick')
        if(showList === "movies"){
            getMeh()
            selectedEmotion = meh
        }else if(showList === "shows"){
            getMehTv()
            selectedEmotion = getMehTv
        }
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
function getMeh(){
    meh = movieObject
}
function getMehTv(){
    mehTv = tvObject
}
//get list of Anxious Tv shows
function getAnxiousTv(){
    var emotionAnxious = ["Crime", "Documentary", "Film-Noir", "Horror", "Music", "Mystery", "Thriller"]
    var TvAlreadyAdded = false;
    for(i=0;i<emotionAnxious.length;i++){
        for(j=0;j<tvObject.length;j++){
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
var offset;
//creates menu for 
function createColumnCards(){
    $('a.cc1').css('background-image', 'url('+selectedEmotion[1].poster+')')
    $('a.cc2').css('background-image', 'url('+selectedEmotion[2].poster+')')
    $('a.cc3').css('background-image', 'url('+selectedEmotion[3].poster+')')
    $('a.cc4').css('background-image', 'url('+selectedEmotion[4].poster+')')
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
        var mainCardAreaNumber = $('<div class="col s6 m4" id=movieNo-'+i+'>')
        mainCardAreaNumber.appendTo(mainCardArea)
        //creates the main card
        $('<div class="card">').appendTo(mainCardAreaNumber)
        //gives the card an image container and specifies the image
        $('<div class="card-image waves-effect waves-block waves-light">').appendTo(mainCardAreaNumber.find('.card'))
        $(`<img class="responsive-img" height="350px" src="${selectedEmotion[i].poster}">`).appendTo(mainCardAreaNumber.find('.card-image'))
        //gives the card details and a link
        $('<div class="card-content cardBg">').appendTo(mainCardAreaNumber.find('.card'))
        $('<span class="card-title activator white-text text-lighter customCardTitle">').text(selectedEmotion[i].title).appendTo(mainCardAreaNumber.find('.card-content'))
        $('<i class="material-icons right">').text('more_vert').appendTo(mainCardAreaNumber.find('.card-title'))
        $('<p>').appendTo(mainCardAreaNumber.find('.card-content'))
        $(`<a href="https://www.imdb.com/title/${selectedEmotion[i].titleId}/">`).text('imdb page').appendTo(mainCardAreaNumber.find('.card-content p'))
        //creates the reveal part of card
        $('<div class="card-reveal cardBg">').appendTo(mainCardAreaNumber.find('.card'))
        $('<span class="card-title activator white-text text-lighter customCardTitle">').text(selectedEmotion[i].title).appendTo(mainCardAreaNumber.find('.card-reveal'))
        $('<i class="material-icons right">').text('close').appendTo(mainCardAreaNumber.find('.card-reveal .card-title'))
        $('<p class="white-text text-lighter">').text(selectedEmotion[i].plot).appendTo(mainCardAreaNumber.find('.card-reveal'))
    }
}
//function to create amount of pages in pagination
function pageAmount(){
    $('.pagination li:not(:first-child):not(:last-child)').remove();
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
$('#selector-buttons').click(function generateMovieOrTv(event){
    if(event.target.id === "movie-button"){
        showList = "movies"
    }else if(event.target.id === "tv-button"){
        showList = "shows"
    }
    selectedEmotion = JSON.parse(localStorage.getItem('selectedEmotion'))
    getEmotionList()
    pageAmount()
    createColumnCards()
})
$('#emotion-buttons').click(function (event){
    let ele = event.target
    if(ele.tagName === 'I'){
        selectedEmotion = ele.id
        localStorage.setItem('selectedEmotion', JSON.stringify(selectedEmotion))
        window.location.href = "landing.html"
    }else{
        selectedEmotion = $(ele).find('i').attr('id')
        localStorage.setItem('selectedEmotion', JSON.stringify(selectedEmotion))
        window.location.href = "landing.html"
    }
})
function highLightCurrentEmotion(){
    $('#emotion-buttons').find('#'+selectedEmotion).parent().attr('class', 'waves-effect light-blue darken-4 btn-large')
}

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

  