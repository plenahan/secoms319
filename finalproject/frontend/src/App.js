import "./App.css";
import React, { useState, useEffect } from "react";

var marvelMovies = [];
var pixarMovies = [];
var starWarsMovies = [];
var yourMoviesArr = [];

function getMethod() {
  fetch("http://localhost:8080")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      marvelMovies = data[0].marvel.movies;
      pixarMovies = data[0].pixar.movies;
      starWarsMovies = data[0].starWars.movies;
      yourMoviesArr = data[1].yourMovies;
    });
}

function App() {
  getMethod();
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  

  const [addNewMovie, setAddNewMovie] = useState({
    title: "",
    releaseDate: "",
    director: "",
    rating: 0.0,
    file: ""
  });

  const handleStarWarsMovieClick = (movieId) => {
    const selected = starWarsMovies[movieId];
    setSelectedMovie(selected);
    setCurrentPage("showPage");
  };

  const handleMarvelMovieClick = (movieId) => {
    const selected = marvelMovies[movieId];
    setSelectedMovie(selected);
    setCurrentPage("showPage");
  };

  const handlePixarMovieClick = (movieId) => {
    const selected = pixarMovies[movieId];
    setSelectedMovie(selected);
    setCurrentPage("showPage");
  };

  const handleYourMovieClick = (movieId) => {
    const selected = yourMoviesArr[movieId];
    setSelectedMovie(selected);
    setSelectedIndex(movieId);
    setCurrentPage("showPage");
  };

  function handleOnSubmit(e) {
    e.preventDefault();

    fetch("http://127.0.0.1:8080/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({movie: addNewMovie})})
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new Movie completed");
        console.log(addNewMovie);
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
          
        }
      });
  }

  async function updateSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ index: selectedIndex, newMovie: selectedMovie }),
      });

      const result = await response.text();
      alert(result);
     
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteMovie(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ index: selectedIndex }),
      });
  
      const result = await response.text();
      alert(result);
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "title") {
      setAddNewMovie({ ...addNewMovie, title: value });
    } else if (evt.target.name === "releaseDate") {
      setAddNewMovie({ ...addNewMovie, releaseDate: value });
    } else if (evt.target.name === "director") {
      setAddNewMovie({ ...addNewMovie, director: value });
    } else if (evt.target.name === "rating") {
      setAddNewMovie({ ...addNewMovie, rating: value });
    } else if (evt.target.name === "image") {
      setAddNewMovie({ ...addNewMovie, file: value });
    } 
  }

  function handleUpdateChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "title") {
      setAddNewMovie({ ...addNewMovie, title: value });
      setSelectedMovie({ ...selectedMovie, title: value });
    } else if (evt.target.name === "releaseDate") {
      setAddNewMovie({ ...addNewMovie, releaseDate: value });
      setSelectedMovie({ ...selectedMovie, releaseDate: value });
    } else if (evt.target.name === "director") {
      setAddNewMovie({ ...addNewMovie, director: value });
      setSelectedMovie({ ...selectedMovie, director: value });
    } else if (evt.target.name === "rating") {
      setAddNewMovie({ ...addNewMovie, rating: value });
      setSelectedMovie({ ...selectedMovie, rating: value });
    } else if (evt.target.name === "image") {
      setAddNewMovie({ ...addNewMovie, file: value });
      setSelectedMovie({ ...selectedMovie, file: value });
    } 
  }

  const MovieDetail = ({ movie }) => {
    return (
      
      <div>
        <h1 id="title">{movie.title}</h1>
      
      <div class="grid_container">
        
      <div class="cover">
        <img style={{width:450}}
            src={`http://localhost:8080/images/${movie.file}.png`}
            className="card-img-top"
          />
          </div>
        <div class="list">
          <h2 id="director">Director: {movie.director}</h2>
          <h2 id="rating">Rating: {movie.rottenTomatosScore}</h2>
          <h2 id="releaseDate">Release Date: {movie.releaseDate}</h2>
      </div>
        {/* <h2>{movie.title}</h2> */}
        
          </div>
          <button class="btn btn-primary" onClick={() => setCurrentPage("updateMovie")}>Edit</button>
          <button class="btn btn-danger" onClick={deleteMovie}>Delete</button>
          </div>
        
    );
  };

  const addMovie = (
    <div class="container">
      <h1 class="display-4 fw-normal text-body-emphasis">Add Movie</h1>
    <form action="">
    <div class="form-row">
    <div class="form-item">
     <label>Title</label>
      <input type="text" name="title" value={addNewMovie.title} onChange={handleChange}/>
    </div>
    <div class="form-item">
      <label>Release Date</label>
      <input type="text" name="releaseDate" value={addNewMovie.releaseDate} onChange={handleChange}/>
      </div>
      </div>
      <div class="form-row">
      <div class="form-item">
      <label>Director</label>
      <input type="text" name="director" value={addNewMovie.director} onChange={handleChange}/>
        </div>
        <div class="form-item">
      <label>Rating</label>
      <input type="number" name="rating" value={addNewMovie.rating} onChange={handleChange}/>
        </div>
      </div>
      <div class="form-row">
      <div class="form-item">
      <label>Image File Name</label>
      <input type="text" name="image" value={addNewMovie.file} onChange={handleChange}/>
        </div>
        </div>
      
      <button class="btn btn-primary" type="submit" onClick={handleOnSubmit}>Submit</button>
    </form>
    </div>
  );

  const updateMovie = (
    <div class="container">
      <h1 class="display-4 fw-normal text-body-emphasis">Update Movie</h1>
    <form action="">
    <div class="form-row">
    <div class="form-item">
     <label>Title</label>
      <input type="text" name="title" value={selectedMovie.title} onChange={handleUpdateChange}/>
    </div>
    <div class="form-item">
      <label>Release Date</label>
      <input type="text" name="releaseDate" value={selectedMovie.releaseDate} onChange={handleUpdateChange}/>
      </div>
      </div>
      <div class="form-row">
      <div class="form-item">
      <label>Director</label>
      <input type="text" name="director" value={selectedMovie.director} onChange={handleUpdateChange}/>
        </div>
        <div class="form-item">
      <label>Rating</label>
      <input type="number" name="rating" value={selectedMovie.rating} onChange={handleUpdateChange}/>
        </div>
      </div>
      <div class="form-row">
      <div class="form-item">
      <label>Image File Name</label>
      <input type="text" name="image" value={selectedMovie.file} onChange={handleUpdateChange}/>
        </div>
        </div>
      
      <button class="btn btn-primary" type="submit" onClick={updateSubmit}>Submit</button>
    </form>
    </div>
  );

  const Movies = ({ movies, onMovieClick, movietype }) => {
    // PRODUCT
    if(movies.length > 0){
    return (
    <div class="container">
      <h1 class="display-4 fw-normal text-body-emphasis">{movietype}</h1>
      <button class="btn btn-primary" onClick={() => setCurrentPage("addMovie")}>Add A Movie+</button>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        
      {movies.map((el, index) => (
        <div>
        <a key={index} href="#" onClick={() => onMovieClick(index)}>
        <div key={index}  className="col">
          <div className="card collapse show shadow-sm">
            <div className="image">
              <img
                src={`http://localhost:8080/images/${el.file}.png`}
                className="card-img-top"
              />
            </div>
            <div className="card-body">
              <p id={`txtMovie${index + 1}`} className="card-text">
                {el.title}
              </p>
              <div className="d-flex justify-content-between align-items-center"></div>
            </div>
          </div>
        </div>
        </a> 
      
      </div>
      ))}
      </div>
    </div>
    
  );
      } else {
        return (
          <div class="container">
            <h1 class="display-4 fw-normal text-body-emphasis">{movietype}</h1>
            <button class="btn btn-primary" onClick={() => setCurrentPage("addMovie")}>Add A Movie+</button>
          </div>
        )
      }
    }

  const marvelPage = (
    <div>
      <Movies  movies={marvelMovies} onMovieClick={handleMarvelMovieClick} movietype={"Marvel"} />
    </div>
  );


  const pixarPage = (
    <div>
      <Movies  movies={pixarMovies} onMovieClick={handlePixarMovieClick} movietype={"Pixar"} />
    </div>
  );

  

  const starWarsPage = (
    <div>
      <Movies  movies={starWarsMovies} onMovieClick={handleStarWarsMovieClick} movietype={"Star Wars"} />
    </div>
  );

  const yourMoviesPage = (
    <div>
      <Movies  movies={yourMoviesArr} onMovieClick={handleYourMovieClick} movietype={"Your Movies"} />
    </div>
  );

  const showPage = (
    <div>
      {selectedMovie && <MovieDetail movie={selectedMovie} />}
    </div>
  )

  const mainPage = (
    <div>
      <div className="album py-5 bg-body-tertiary">
        <h1>Disney Flick Picks</h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3 justify-content-center">
          <a href="#" onClick={() => setCurrentPage("marvel")}>
          <div key="0" className="col">
            <div className="card collapse show shadow-sm">
              <div className="image">
                {
                  <img
                    src={"http://localhost:8080/images/antman.png"}
                    className="card-img-top"
                  />
                }
              </div>
              <div className="card-body">
                <p id="txtMovie0" className="card-text">
                  Marvel
                </p>
                <div className="d-flex justify-content-between align-items-center"></div>
              </div>
            </div>
          </div>
          </a>
          <a href="#" onClick={() => setCurrentPage("pixar")}>
          <div key="1" className="col">
            <div className="card collapse show shadow-sm">
              <div className="image">
                {
                  <img
                    src={"http://localhost:8080/images/toystory.png"}
                    className="card-img-top"
                  />
                }
              </div>
              <div className="card-body">
                <p id="txtMovie1" className="card-text">
                  Pixar
                </p>
                <div className="d-flex justify-content-between align-items-center"></div>
              </div>
            </div>
          </div>
          </a>
          <a href="#" onClick={() => setCurrentPage("starwars")}>
          <div key="2" className="col">
            <div className="card collapse show shadow-sm">
              <div className="image">
                {
                  <img
                    src={"http://localhost:8080/images/anewhope.png"}
                    className="card-img-top"
                  />
                }
              </div>
              <div className="card-body">
                <p id="txtMovie2" className="card-text">
                  Star Wars
                </p>
                <div className="d-flex justify-content-between align-items-center"></div>
              </div>
            </div>
          </div>
          </a>
        </div>
      </div>
      <h2></h2>
    </div>
  );

  const aboutPage = (
    <div>
      <section class="py-5 text-center container">
        <div class="row py-lg-5">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h1>About the team</h1>
            <p>
              Students in SE/ComS319 Construction of User Interfaces, Spring
              2023 pretending to be own a movie rating website. This project was
              finished on 11/29/2023 for Dr. Abraham Aldaco aalacdo@iastate.edu
            </p>
          </div>
        </div>
      </section>

      <div class="container">
        <div class="row justify-content-center">
          <div class="col-4">
            <div class="card shadow-sm">
              <div class="card-body">
                <p class="card-text">
                  Meet <strong>Jaden Burke</strong>, co-founder of
                  DisneyMovieRatings.com. With an unshakable love for Disney and
                  a knack for web development, Jaden's vision turned this
                  website into a hub for Disney enthusiasts of all ages. Their
                  mission? To create a space for fans to explore, critique, and
                  cherish the enchanting world of Disney movies. Jaden is not
                  just a co-founder but a true Disney aficionado on a mission to
                  share the joy and nostalgia of Disney movies with fans
                  worldwide.
                </p>
                <p class="card-text">
                  Contact at:{" "}
                  <a href="mailto: jadenb04@iastate.edu">
                    jadenb04@iastate.edu
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="card shadow-sm">
              <div class="card-body">
                <p class="card-text">
                  Meet <strong>Patrick Lenahan</strong>, the co-founder of
                  DisneyMovieRatings.com. With a deep-rooted passion for Disney
                  and a talent for web development, Patrick's vision transformed
                  this website into a beloved hub for Disney enthusiasts of all
                  ages. His mission? To provide a space for fans to explore,
                  critique, and relish the enchanting world of Disney movies.
                  Patrick is not just a co-founder; he's a devoted Disney
                  aficionado on a mission to share the joy and nostalgia of
                  Disney movies with fans worldwide.
                </p>
                <p class="card-text">
                  Contact at:{" "}
                  <a href="mailto: plenahan@iastate.edu">
                    plenahan@iastate.edu
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );



  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return mainPage;
      case "marvel":
        return marvelPage;
      case "pixar":
        return pixarPage;
      case "starwars":
        return starWarsPage;
      case "yourMovies":
        return yourMoviesPage;
      case "showPage":
        return showPage;
      case "addMovie":
        return addMovie;
      case "updateMovie":
        return updateMovie;
      case "about":
        return aboutPage;
    }
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Disney Flick Picks
        </a>
        {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button> */}
        <div id="navbarNav">
          <ul className="navbar-nav">
            
            <li className="nav-item active">
              <a
                className="nav-link select"
                href="#"
                onClick={() => setCurrentPage("home")}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={() => setCurrentPage("marvel")}
              >
                Marvel
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={() => setCurrentPage("pixar")}
              >
                Pixar
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={() => setCurrentPage("starwars")}
              >
                Star Wars
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={() => setCurrentPage("yourMovies")}
              >
                Your Movies
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={() => setCurrentPage("about")}
              >
                About
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {getMethod()}
      {renderPage()}
    </div>
  );
}

export default App;
