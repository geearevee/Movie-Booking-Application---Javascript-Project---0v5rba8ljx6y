function renderMovies() {
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=a73c6d976944b3cb5444416eee8bd8d1')
        .then((result) => result.json())
        .then((result) => {
            const moviesContainer = document.querySelector('#main');
            const movies = result["results"]; // movies array which we got from that api
            movies.forEach(movie => {
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
        })
}
export {renderMovies};