import "./App.css";
import React, { useState, useEffect } from "react";

var products = [];
function getMethod() {
  fetch("http://localhost:8080/get")
    .then((response) => response.json())
    .then((data) => {
      products = data;
    });
}
var oneProduct = {};
function getFromId(id) {
  fetch("http://localhost:8080/getFromId" + id)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      oneProduct = data;
    });
}

function App() {
  const [currentPage, setCurrentPage] = useState("post");
  const [price, setPrice] = useState(0.0);
  const [productId, setId] = useState(0);
  const [addNewProduct, setAddNewProduct] = useState({
    id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "http://127.0.0.1:8080/images/",
    rating: {
      rate: 0,
      count: 0,
    },
  });

  const [updateProduct, setUpdateProduct] = useState({
    id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "http://127.0.0.1:8080/images/",
    rating: {
      rate: 0,
      count: 0,
    },
  });
  getMethod();
  const [oneProduct, setOneProduct] = useState([]);
  const [index, setIndex] = useState(0);
  const [valid, setValid] = useState(0);

  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "id") {
      setAddNewProduct({ ...addNewProduct, id: parseInt(value, 10) });
    } else if (evt.target.name === "title") {
      setAddNewProduct({ ...addNewProduct, title: value });
    } else if (evt.target.name === "price") {
      setAddNewProduct({ ...addNewProduct, price: value });
    } else if (evt.target.name === "description") {
      setAddNewProduct({ ...addNewProduct, description: value });
    } else if (evt.target.name === "category") {
      setAddNewProduct({ ...addNewProduct, category: value });
    } else if (evt.target.name === "image") {
      setAddNewProduct({ ...addNewProduct, image: value });
    } else if (evt.target.name === "rating") {
      setAddNewProduct({
        ...addNewProduct,
        rating: { rate: value, ...addNewProduct.count },
      });
    } else if (evt.target.name === "num_rating") {
      setAddNewProduct({
        ...addNewProduct,
        rating: { ...addNewProduct.rating, count: value },
      });
    }
  }

  const showOneItem = oneProduct.map((el) => (
    <div key={el.id}>
      <img src={el.image} width={30} alt="images" /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rating: {el.rating} <br />
    </div>
  ));

  function deleteOneProduct(deleteid) {
    console.log("Product to delete :", deleteid);
    fetch("http://localhost:8080/deleteItem/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deleteid }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Delete a product completed : ", deleteid);
        console.log(data);
        if (data) {
          const key = Object.keys(data);
          const value = Object.values(data);
          alert(key + value);
        }
      });
    //setChecked4(!checked4);
    // getAllProducts();
  }

  async function updateSubmit(id) {
    console.log(price);
    try {
      const response = await fetch("http://localhost:8080/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ itemId: id, newPrice: parseInt(price) }),
      });

      const result = await response.text();
      alert(result);
    } catch (error) {
      console.error(error);
    }
  }

  function handleOnSubmit(e) {
    e.preventDefault();

    fetch("http://127.0.0.1:8080/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new product completed");
        console.log(addNewProduct);
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
  }

  const getProducts = products.map((el, index) => (
    // PRODUCT

    <div key={index} className="col">
      <div className="card collapse show shadow-sm">
        <div className="image">
          <img
            src={`http://localhost:8080/images/${el.image}.jpg`}
            className="card-img-top"
          />
        </div>
        <div className="card-body">
          <p className="card-text">{el.id}</p>
          <p className="card-text">{el.title}</p>
          <p className="card-text">{el.price}</p>
          <p className="card-text">{el.category}</p>
          <p className="card-text">{el.description}</p>
          <p className="card-text">Rating {el.rating.rate}</p>
          <p className="card-text">Number of ratings: {el.rating.count}</p>

          <div className="d-flex justify-content-between align-items-center"></div>
        </div>
      </div>
    </div>
  ));

  const getPage = (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
        {getProducts}
      </div>
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
              2023 that have made a MERN application with CRUD functionalities.
              Catalog information was taken from
              https://fakestoreapi.com/products and put into a mongoDB
              databaseThis project was finished on 12/9/2023 for Dr. Abraham
              Aldaco aalacdo@iastate.edu
            </p>
          </div>
        </div>
      </section>

      <div class="container">
        <div class="row justify-content-center">
          <div class="col-4">
            <div class="card shadow-sm">
              <div class="card-body">
                <p class="card-text">Jaden Burke</p>
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
                <p class="card-text">Patrick Lenahan</p>
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

  const postPage = (
    <div>
      <div>
        <h3>Add a new product :</h3>
        <form action="">
          <input
            type="number"
            placeholder="id?"
            name="id"
            value={addNewProduct.id}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="title?"
            name="title"
            value={addNewProduct.title}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="price?"
            name="price"
            value={addNewProduct.price}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="description?"
            name="description"
            value={addNewProduct.description}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="category?"
            name="category"
            value={addNewProduct.category}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="image?"
            name="image"
            value={addNewProduct.image}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="rate?"
            name="rating"
            value={addNewProduct.rating.rate}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="number of ratings?"
            name="num_rating"
            value={addNewProduct.rating.count}
            onChange={handleChange}
          />
          <button type="submit" onClick={handleOnSubmit}>
            submit
          </button>
        </form>
      </div>
    </div>
  );
  function getOneProduct(id) {
    console.log(parseInt(id));
    const foundProduct = products.find((product) => product.id === id);
    console.log(foundProduct);

    setId(id);
    if (foundProduct) {
      const productIndex = products.indexOf(foundProduct);
      setIndex(productIndex + 1);
      setValid(1);
    } else {
      console.log("Wrong number of Product id.");
      setValid(0);
    }
  }

  const putPage = (
    <div>
      <div>
        <h3>Show one Product by Id:</h3>
        <input
          type="number"
          id="id"
          name="id"
          placeholder="id"
          onChange={(e) => getOneProduct(parseInt(e.target.value))}
        />
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
          {valid && <div>Product: {getProducts[index - 1]}</div>}
        </div>
      </div>
      {valid && (
        <input
          type="number"
          placeholder="price?"
          name="price"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
        />
      )}
      <button type="submit" onClick={() => valid && updateSubmit(index)}>
        submit
      </button>
    </div>
  );

  const deletePage = (
    <div>
      <div>
        <h3>Delete one Product by Id:</h3>
        <input
          type="number"
          id="message"
          name="message"
          placeholder="id"
          onChange={(e) => getOneProduct(parseInt(e.target.value))}
        />
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
          {valid && <div>Product: {getProducts[index - 1]}</div>}
        </div>
      </div>
      <button onClick={() => deleteOneProduct(productId)}>Delete</button>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case "get":
        getMethod();
        return getPage;
      case "post":
        return postPage;
      case "update":
        return putPage;
      case "delete":
        return deletePage;
      case "about":
        return aboutPage;
    }
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Assignment 3
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
                onClick={() => setCurrentPage("post")}
              >
                Post
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={() => setCurrentPage("get")}
              >
                Get
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={() => setCurrentPage("update")}
              >
                Update
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={() => setCurrentPage("delete")}
              >
                Delete
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

      {renderPage()}
    </div>
  );
}

export default App;
