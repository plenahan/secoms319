import './App.css';

function App() {

  const [currentPage, setCurrentPage] = useState('home');  

  const mainPage = (
    <div>
      <div class="album py-5 bg-body-tertiary">
          <h1>Disney Flick Picks</h1>
          <div class="container">
              <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-3">
                <a href="marvel.html">
                  <div class="col">
                      <div id="card1" class="card collapse show shadow-sm">
                          <div id="imgMovie1"></div>
                          <div class="card-body">
                              <p id="txtMovie1" class="card-text"></p>
                              <div class="d-flex justify-content-between align-items-center">
                          </div>
                          </div>
                      </div>
                  </div></a>
                  <a href="pixar.html">
                  <div class="col">
                      <div id="card2" class="card collapse show shadow-sm">
                      <div id="imgMovie2"></div>
                      <div class="card-body">
                          <p id="txtMovie2" class="card-text"></p>
                          <div class="d-flex justify-content-between align-items-center">
                      
                      </div>
                      </div>
                  </div>
                  </div>
                </a>
                <a href="starwars.html">
                  <div class="col">
                      <div id="card3" class="card collapse show shadow-sm">
                      <div id="imgMovie3"></div>
                      <div class="card-body">
                          <p id="txtMovie3" class="card-text"></p>
                          <div class="d-flex justify-content-between align-items-center">
                      
                      </div>
                      </div>
                  </div>
                  </div>
                  </a>
          
                  
            </div>
          </div>
        </div>
        <h2></h2>
        </div>
  );
  
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
          return mainPage;
    }
  };
  

  return (

    <div className="App">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">Disney Flick Picks</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link select" href="index.html">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="marvel.html">Marvel</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="pixar.html">Pixar</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="starwars.html">Star Wars</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
            </ul>
          </div>
        </nav>
      <p>Hello</p>
      {renderPage()}
    </div>
  );



}

export default App;

