fetch("data.json")
    .then(response => response.json())
    .then(myMovies => updateMovie(myMovies));

const urlParams = new URLSearchParams(window.location.search);
  const greetingValue = urlParams.get('greeting');
  const type = urlParams.get('genre');
  console.log(greetingValue); 
  console.log(type);

  function updateMovie(myMovies) {
    console.log(myMovies[type].movies[greetingValue].title);
    let title = document.getElementById("title").innerHTML = myMovies[type].movies[greetingValue].title;
    let cover = document.getElementById("cover").innerHTML = `<img width="400" src = "./images/${myMovies[type].movies[greetingValue].file}.png">`;
    let rating = document.getElementById("rating").innerHTML = `Rating: ${myMovies[type].movies[greetingValue].rottenTomatosScore}/10`;
    let director = document.getElementById("director").innerHTML = `Director: ${myMovies[type].movies[greetingValue].director}`;
    let releaseDate = document.getElementById("releaseDate").innerHTML = `Release Date: ${myMovies[type].movies[greetingValue].releaseDate}`;
  }