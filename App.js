// redering top movies insdie main container
import {renderMovies} from "./renderingMovies.js";
renderMovies();

document.querySelector('body').addEventListener('click', (e) => {
    if(e.target.dataset.movieId != undefined){
        insertModal(e.target.dataset.movieId);
    }
    if(e.target.classList.contains("close-modal")){
        document.querySelector(".movieDetailsContainer").remove();
    }
    console.log(e.target);
    if(e.target.classList.contains('book-tickets-button')){
        e.preventDefault();
        // when you click on a tag => the browser will take user to the url in the href
        // 
        const price = e.target.dataset.price;
        const name = e.target.dataset.name;
        // console.log(`${location.origin}/index1.html?price=${price}`)
        window.location.href = `${location.origin}/index1.html?price=${price}&name=${name}`; 
    }
})


async function insertModal(movieId) {
        const movieData = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=a73c6d976944b3cb5444416eee8bd8d1`)
        .then(result => result.json())
        console.log(movieData);

    
        let genere = movieData.genres.map(item => item.name).join(" ");
        // [2,2].map(num => num*num) => [action, fantasy].join(" ") => "action fantasy"
        let movieTicketPrice = Math.floor(Math.random() * 50) + 250;
        
        const element = `
        <div class="movieDetailsContainer">
            <div class="movieDetails">  
                <i class="fa-solid fa-xmark close-modal"></i>
                <div class="movie-popup">
                    <img src="http://image.tmdb.org/t/p/w500${movieData["poster_path"]}" alt="">
                    <div class="movie-info">
                        <p class="movie-name">${movieData.title}</p>
                        <p class="movie-rating"><i class="fa-solid fa-star"></i> ${movieData.vote_average} / 10</p>
                        <p class="movie-lang">${movieData.original_language}</p>
                        <p class="movie-duration">${movieData.runtime} min</p>
                        <p class="movie-genere">${genere}</p>
                        <p class="movie-desc">${movieData.overview}</p>
                        <p class="movie-price">${movieTicketPrice} Rs</p>
                        <a data-name="${movieData.title}" data-price="${movieTicketPrice}" class="book-tickets-button">Book Tickets</a>
                    </div>
                </div>
            </div>
        </div>
        `
    
        
        document.querySelector("#main").insertAdjacentHTML('beforeEnd', element);
}

/******
* search functionality 
******/
let search = document.querySelector("#search");
let timeOut; // undefined
search.addEventListener("input", function(e) {
    if(e.target.value === "") window.location.href = "index.html";
    clearTimeout(timeOut); //
    timeOut = setTimeout(searchResult, 1000);
})

async function searchResult(){
    try{
        const movies = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=a73c6d976944b3cb5444416eee8bd8d1&language=en-US&page=1&include_adult=false&query=${search.value.trim()}`)
        .then((data)=> data.json())
        .then((res)=> res)
        const moviesContainer = document.querySelector('#main');
        moviesContainer.innerHTML = ""; // to remove existing elements which are rendered on page
        movies.results.forEach(movie => {
            const element = `
            <div data-movie-name="${movie["original_title"]}" 
        data-movie-id="${movie["id"]}" class="movie">
            <img class="movie-card-image" src="http://image.tmdb.org/t/p/w500${movie["poster_path"]}">
            <div class="movie-info">
                <h3 >${movie["original_title"]}</h3>
                <span class="green" >${movie["vote_average"]}</span>
            </div>
            <div  class="overview" >
            ${movie["overview"]}
            </div>
        </div>
            `
            moviesContainer.insertAdjacentHTML('afterBegin', element);
        })
    }catch(error){
        console.log(error);
    }
    
    
}

// GENRES LIST
fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=a73c6d976944b3cb5444416eee8bd8d1&language=en-US`)
.then((data)=> data.json())
.then((res)=> {
    
    const g = res.genres; //[{id: , nameofgenere}, {id: , nameofgenere} ....., {id: , nameofgenere}]
    g.forEach(genres => { // {id: , name}
      const k =  `<h3 data-id="${genres.id}">${genres.name}</h3>`
      //console.log(genres.id, genres.name);
      const container = document.querySelector("#genre");
      //console.log(container ,k);
      container.insertAdjacentHTML('beforeend', k);
    })
})
.catch((error) => console.log(error))

document.querySelector("#genre").addEventListener('click', function(e) {
    console.log(e.target.id)
    if(e.target.dataset.id !== null){ // #genre => p 
        const id = e.target.dataset.id;
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=a73c6d976944b3cb5444416eee8bd8d1&with_genres=${id}`)
        .then(response => response.json())
        .then(movies => {
            const moviesContainer = document.querySelector('#main');

            moviesContainer.innerHTML = "";
            movies.results.forEach(movie => {
                const element = `
                <div data-movie-name="${movie["original_title"]}" data-movie-id="${movie["id"]}" class="movie">
                    <img class="movie-card-image" src="http://image.tmdb.org/t/p/w500${movie["poster_path"]}" />
                    <div class="movie-info">
                        <h3>
                            ${movie["original_title"]}
                        </h3>
                        <span class="green" >
                            ${movie["vote_average"]}
                        </span>
                    </div>
                    <div  class="overview" >
                        ${movie["overview"]}
                    </div>
                </div>
                `
                moviesContainer.insertAdjacentHTML('afterBegin', element);
            })
        });
    }
})







