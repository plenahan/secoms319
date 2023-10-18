fetch("data.json")
    .then(response => response.json())
    .then(myMovies => loadMovies(myMovies));


    function loadMovies(myMovies) {
        
        for (var i = 0; i<myMovies.pixar.movies.length; i++){
            var txtMovieParent = document.getElementById(`txtMovie${i + 1}`); // Avengers
            var imgMovieParent = document.getElementById(`imgMovie${i + 1}`); // Avengers
            let title = myMovies.pixar.movies[i].title;
            let year = myMovies.pixar.movies[i].releaseDate;
            let file = myMovies.pixar.movies[i].file;
            let imgMovie = document.createElement("div");
            imgMovie.innerHTML = `<img src="./images/${file}.png" class="card-img-top" alt="..."></img>`;
            let txtMovie = document.createElement("p");
            // if(title == "Captain America: Civil War"){
            //     txtMovie.innerHTML = `<p class="card-text"> <strong>${title}</strong> <br> <br> ${year}</p>`;
            // }
            // else if(title.length > 24){
            //     txtMovie.innerHTML = `<p class="card-text"> <strong>${title}</strong> <br> ${year}</p>`;
            // }else {
            txtMovie.innerHTML = `<p class="card-text"> <strong>${title}</strong> <br> <br> ${year}</p>`;
            // }
            

            imgMovieParent.appendChild(imgMovie);
            txtMovieParent.appendChild(txtMovie);
            
        }  
    }      
    
    var value;

    document.addEventListener("DOMContentLoaded", function (e) {
        function handleCardClick(event) {
            value = event.target.parentNode.parentNode.getAttribute("id").substring(8) - 1;
            console.log(value);
            window.location.href = `./singleMovie.html?greeting=${value}&genre=pixar`;
        }
        const cards = document.getElementsByClassName("image");
    
        for (var i = 0; i < cards.length; i++) {
            cards[i].addEventListener('click', handleCardClick);
        }
    });
    