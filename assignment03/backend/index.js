const express = require("express");
const app = express();

const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const dbName = "assignment3";
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

app.get("/get", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  const results = await db
    .collection("products")
    .find(query)
    .limit(100)
    .toArray();
  console.log(results);
  res.status(200);
  res.send(results);
});

app.get("/getFromId/:id", async (req, res) => {
  await client.connect();
  const id = req.params.id;
  const result = await db.collection("products").findOne({ id: id });
  console.log(result);
  res.status(200);
  res.send(result);
});

app.post("/post", async (req, res) => {
  await client.connect();
  const item = {
    id: req.body.id,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
    rating: { rate: req.body.rating.rate, count: req.body.rating.count },
  };
  const results = await db.collection("products").insertOne(item);
  res.status(200);
  res.send(results);
});

app.put("/update/:id", async (req, res) => {
  await client.connect();
  const id = req.params.id;
  const query = { id: id };
  // query.price = req.body.price;
  const results = await db
    .collection("products")
    .updateOne({ id, id }, { $set: { price: req.body.price } });
  res.status(200);
  res.send(results);
});

app.delete("/deleteItem", async (req, res) => {
  await client.connect();
  const values = Object.values(req.body);
  const id = values[0];
  console.log("Item to delete :", id);
  const query = { id: id };
  const results = await db.collection("products").deleteOne(query);
  res.status(200);
  res.send(results);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
