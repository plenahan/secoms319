const express = require("express");
const app = express();

const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const dbName = "finalproject";
const client = new MongoClient(url);
const db = client.db(dbName);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });

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
})
 
app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});
 
const PORT = process.env.PORT || 8080;
 
app.listen(PORT, console.log(`Server started on port ${PORT}`));