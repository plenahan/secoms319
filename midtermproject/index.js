fetch("data.json")
    .then(response => response.json())
    .then(myMovies => loadMovies(myMovies));


    function loadMovies(myMovies) {
        
            var txtMovieParent = document.getElementById(`txtMovie${1}`); // Avengers
            var imgMovieParent = document.getElementById(`imgMovie${1}`); // Avengers
            let title1 = myMovies.marvel.movies[0].title;
            let year1 = myMovies.marvel.movies[0].releaseDate;
            let file1 = myMovies.marvel.movies[0].file;
            let imgMovie1 = document.createElement("div");
            imgMovie1.innerHTML = `<img src="./images/${file1}.png" class="card-img-top" alt="..."></img>`;
            let txtMovie1 = document.createElement("p");
            txtMovie1.innerHTML = `<p class="card-text"> <strong>Marvel</strong></p>`;

            imgMovieParent.appendChild(imgMovie1);
            txtMovieParent.appendChild(txtMovie1);

            var txtMovieParent = document.getElementById(`txtMovie${2}`); // Avengers
            var imgMovieParent = document.getElementById(`imgMovie${2}`); // Avengers
            let title2 = myMovies.pixar.movies[0].title;
            let year2 = myMovies.pixar.movies[0].releaseDate;
            let file2 = myMovies.pixar.movies[0].file;
            let imgMovie2 = document.createElement("div");
            imgMovie2.innerHTML = `<img src="./images/${file2}.png" class="card-img-top" alt="..."></img>`;
            let txtMovie2 = document.createElement("p");
            txtMovie2.innerHTML = `<p class="card-text"> <strong>Pixar</strong></p>`;

            imgMovieParent.appendChild(imgMovie2);
            txtMovieParent.appendChild(txtMovie2);

            var txtMovieParent = document.getElementById(`txtMovie${3}`); // Avengers
            var imgMovieParent = document.getElementById(`imgMovie${3}`); // Avengers
            let title3 = myMovies.starWars.movies[0].title;
            let year3 = myMovies.starWars.movies[0].releaseDate;
            let file3 = myMovies.starWars.movies[0].file;
            let imgMovie3 = document.createElement("div");
            imgMovie3.innerHTML = `<img src="./images/${file3}.png" class="card-img-top" alt="..."></img>`;
            let txtMovie3 = document.createElement("p");
            txtMovie3.innerHTML = `<p class="card-text"> <strong>Star Wars</strong></p>`;

            imgMovieParent.appendChild(imgMovie3);
            txtMovieParent.appendChild(txtMovie3);
            
    }      
    
    