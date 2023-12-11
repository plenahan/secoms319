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
    title: req.body.title,
    releaseDate: req.body.releaseDate,
    director: req.body.director,
    file: req.body.file,
    rating: req.body.rating
  };
  const query = {};
  const results = await db
    .collection("movies").updateOne({_id: new ObjectId('657685dc8aba22397e81a39f')}, {$push: {yourMovies: movie}});
  // const results = await db.collection("movies").find(0).yourMovies.movies.insertOne(movie);
  res.status(200);
  res.send(results);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
