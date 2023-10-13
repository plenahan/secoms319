fetch("movies.json")
    .then(response => response.json())
    .then(myMovies => loadMovies(myMovies));


    function loadMovies(myMovies) {
        
        for (var i = 0; i<myMovies.marvel.movies.length; i++){
            var txtMovieParent = document.getElementById(`txtMovie${i + 1}`); // Avengers
            var imgMovieParent = document.getElementById(`imgMovie${i + 1}`); // Avengers
            let title = myMovies.marvel.movies[i].title;
            let year = myMovies.marvel.movies[i].releaseDate;
            let file = myMovies.marvel.movies[i].file;
            let imgMovie = document.createElement("div");
            imgMovie.innerHTML = `<img src="./images/${file}.png" class="card-img-top" alt="..."></img>`;
            let txtMovie = document.createElement("p");
            txtMovie.innerHTML = `<p class="card-text"> <strong>${title}</strong> <br> ${year}</p>`;

            imgMovieParent.appendChild(imgMovie);
            txtMovieParent.appendChild(txtMovie);
            
        }  
    }      
    
    