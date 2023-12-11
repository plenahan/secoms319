const express = require("express");
const app = express();

const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "finalproject";
const client = new MongoClient(url);
const db = client.db(dbName);
const path = require("path");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.json());
const cors = require('cors');
app.use(cors());

app.get("/", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  const results = await db
    .collection("movies")
    .find(query)
    .limit(100)
    .toArray();
  console.log(results);
  res.status(200);
  res.send(results);
});

app.post("/post", async (req, res) => {
  await client.connect();
  const movie = {
    title: req.body.movie.title,
    releaseDate: req.body.movie.releaseDate,
    director: req.body.movie.director,
    rottenTomatosScore: req.body.movie.rating,
    file: req.body.movie.file,
    rating: req.body.movie.rating
  };
  const query = {};
  const results = await db
    .collection("movies").updateOne({_id: new ObjectId('657685dc8aba22397e81a39f')}, {$push: {yourMovies: movie}});
  // const results = await db.collection("movies").find(0).yourMovies.movies.insertOne(movie);
  res.status(200);
  res.send(results);
});

app.put("/update", async (req, res) => {
  await client.connect();
    const index = parseInt(req.body.index);
    const newMovie = req.body.newMovie;
    
    const results = await db.collection("movies").updateOne(
      { _id: new ObjectId('657685dc8aba22397e81a39f'), "yourMovies": { $exists: true } },
      { $set: { [`yourMovies.${index}.title`]: newMovie.title,
       [`yourMovies.${index}.director`]: newMovie.director,
      [`yourMovies.${index}.releaseDate`]: newMovie.releaseDate, 
      [`yourMovies.${index}.rottenTomatosScore`]: newMovie.rating, 
      [`yourMovies.${index}.file`]: newMovie.file} }
    );
  res.status(200);
  res.send(results);
});

app.delete("/delete", async (req, res) => {
  await client.connect();
    const index = parseInt(req.body.index);

    // Step 1: Unset the specific array element
    const unsetResult = await db.collection("movies").updateOne(
      { _id: new ObjectId('657685dc8aba22397e81a39f') },
      { $unset: { [`yourMovies.${index}`]: 1 } }
    );

    // Step 2: Pull null values from the array
    const pullResult = await db.collection("movies").updateOne(
      { _id: new ObjectId('657685dc8aba22397e81a39f') },
      { $pull: { yourMovies: null } }
    );

    // Combine the results if needed
    const combinedResults = {
      unset: unsetResult,
      pull: pullResult,
    };


  res.status(200)
  res.send(combinedResults);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
