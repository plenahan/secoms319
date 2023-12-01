import "./App.css";
import React, { useState, useEffect } from "react";

var marvelMovies = [];
var pixarMovies = [];
var starWarsMovies = [];
function getMethod() {
  fetch("http://localhost:8080")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      marvelMovies = data[0].marvel.movies;
      pixarMovies = data[0].pixar.movies;
      starWarsMovies = data[0].starWars.movies;
    });
}

function App() {
  getMethod();
  const [currentPage, setCurrentPage] = useState("home");

  const marvel = marvelMovies.map((el, index) => (
    // PRODUCT
    <div key={index} className="col">
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
  ));

  const marvelPage = (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
        {marvel}
      </div>
    </div>
  );

  const pixar = pixarMovies.map((el, index) => (
    // PRODUCT
    <div key={index} className="col">
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
  ));

  const pixarPage = (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
        {pixar}
      </div>
    </div>
  );

  const starWars = starWarsMovies.map((el, index) => (
    // PRODUCT
    <div key={index} className="col">
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
  ));

  const starWarsPage = (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
        {starWars}
      </div>
    </div>
  );

  const mainPage = (
    <div>
      <div className="album py-5 bg-body-tertiary">
        <h1>Disney Flick Picks</h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3 justify-content-center">
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
