import React, { useState, useEffect } from "react";
import items from "./selected_products.json";


const Shop = () => {

    const [currentPage, setCurrentPage] = useState('home');    
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    
    useEffect(() => {
        total();

    }, [cart]);
    useEffect(() => {
        if(currentPage == "cart"){



//Add your code under this line
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const form = document.getElementById('checkout-form')
const inputCard = document.querySelector('#inputCard')
const alertTrigger = document.getElementById('submit-btn')
const summaryCard = document.querySelector('.card')
const summaryList = document.querySelector('.card > ul')

console.log(summaryList)

var order = { name: '',
    email: '',
    card: '' 
}

const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    ` <div>${message}</div>`,
    ' <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
    ].join('')
    alertPlaceholder.append(wrapper)
}

function isNumeric (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
    }
    inputCard.addEventListener('input', event => {
    if (!inputCard.value) {
    return event.preventDefault() // stops modal from being shown
    } else {
    inputCard.value = inputCard.value.replace(/-/g, '')
    let newVal = ''
    for (var i = 0, nums = 0; i < inputCard.value.length; i++) {
    if (nums != 0 && nums % 4 == 0) {
    newVal += '-'
    }
    newVal += inputCard.value[i]
    if (isNumeric(inputCard.value[i])) {
    nums++
    }
    }
    inputCard.value = newVal
    }
})

form.addEventListener('submit', event => {
    //if (!form.checkValidity()) {
    if (!validate()) {
    alertPlaceholder.innerHTML = ''
    alert('<i class="bi-exclamation-circle"></i> Something went wrong!','danger')
    }
    event.preventDefault()
    event.stopPropagation()
    //form.classList.add('was-validated')
}, false )


let validate = function(){
  let val = true;
  let email = document.getElementById('inputEmail4')
  let name = document.getElementById('inputName')
  let card = document.getElementById('inputCard')
  
  if (!email.value.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )){
    email.setAttribute("class", "form-control is-invalid");
    val = false;
  }
  else{
      email.setAttribute("class", "form-control is-valid");
      order.email = email.value
  }

  if (name.value.length == 0)
  {
    name.setAttribute("class","form-control is-invalid")
    val = false
  }
  else{
    name.setAttribute("class", "form-control is-valid");
    order.name = name.value
  }

  if (!card.value.match(/^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/))
  {
    card.setAttribute("class","form-control is-invalid")
    val = false
  }
  else{
    card.setAttribute("class", "form-control is-valid");
    order.card = card.value
  }

  if (val){
    form.classList.add("collapse")

    for (const [key, value] of Object.entries(order)) {
        summaryList.innerHTML += '<li class="list-group-item"> <b>' + `${key}` + ': </b>' + `${value}` +'</li>'
    }
    summaryCard.classList.remove("collapse")
    alertPlaceholder.innerHTML = ""
    alert('<i class="bi-cart-check-fill"></i> You have made an order!', 'success')
  }
  return val;
}
    }
}
    , [currentPage])
    
    const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
        totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
    };
    const addToCart = (el) => {
        setCart([...cart, el]);
    };
    
    // function getCart(){
    //     return cart;
    // }
    const removeFromCart = (el) => {
        const hardCopy = [...cart];
        const index = cart.findIndex((cartItem) => cartItem.id === el.id);
        if (index !== -1) {
          hardCopy.splice(index, 1); 
          setCart(hardCopy);
        }
      };
      function howManyofThis(id) {
        let hmot = cart.filter((cartItem) => cartItem.id === id);
        return hmot.length;
    }
    const cartItems = cart.map((el) => (
        <div key={el.id}>
        <img class="img-fluid" src={el.image} width={150} />
        <div>{howManyofThis(el.id)}</div>
        {el.title}
        ${el.price}
        </div>
        ));
        const uniqueCartItems = Array.from(new Set(cart.map((el) => el.id))).map((id) => {
            const item = cart.find((el) => el.id === id);
            return (
              <div key={item.id}>
                {/* <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3"> */}

              <div class="col">
                        <div class="card shadow-sm">
                          {/* <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> */}
                          <img className="img-fluid" src={item.image} width={150} />
                          <div class="card-body">
                            <p class="card-text">Quantity: {howManyofThis(item.id)}</p>
                            <div class="d-flex justify-content-between align-items-center">
                              {/* <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                              </div> */}
                              <small class="text-body-secondary">${item.price}</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                // </div>
            );
          });
    
        
        const filteredItems = items.filter((el) =>
            el.title.toLowerCase().includes(searchValue)
        );
        const listItems = filteredItems.map((el) => (
            // PRODUCT
            <div class="row border-top border-bottom" key={el.id}>
            <div class="row main align-items-center">
            <div class="col-2">
            <img class="img-fluid" src={el.image} />
            </div>
            <div class="col">
            <div class="row text-muted">{el.title}</div>
            <div class="row">{el.category}</div>
            </div>
            <div class="col">
            <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
            <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
            </div>
            <div class="col">
            ${el.price} <span class="close">&#10005;</span>{howManyofThis(el.id)}
            </div>
            </div>
            </div>
            ));
            function handleSearch(event) {
                setSearchValue((event.target.value).toLowerCase());
            }      

            const renderPage = () => {
                switch (currentPage) {
                  case 'home':
                      return shop;
                  //   return <Shop />;
                  case 'cart':
                    return myCart;
                  //   return <Cart />;
                  default:
                  //   return <Shop />;
                    return shop;
                }
              };

const myCart = (
    <div style={{backgroundColor: "ghostwhite"}}>
      <div class="row row-cols-1 row-cols-sm-4 row-cols-md-9 g-9" style={{justifyContent: 'center'}}>
        {uniqueCartItems}
        </div>
        <div>

<div class="row" >
  <div class="col-2"></div>


  <div class="col-8 card shadow-sm" style={{backgroundColor: 'white', justifyContent: 'center'}}>

    <h1>Payment information</h1>

    <div id="liveAlertPlaceholder"></div>

    <form class="row g-3" id="checkout-form"/>

      <div class="col-md-6">
        <label for="inputName" class="form-label">Full Name</label>
        <input type="text" class="form-control" id="inputName"/>
        <div class="valid-feedback">
          Looks good!
        </div>
        <div class="invalid-feedback">
          Must be like, "John Doe"
        </div>
      </div>

      <div class="col-md-6">
        <label for="inputEmail4" class="form-label">Email</label>
        <input type="email" class="form-control" id="inputEmail4"/>
        <div class="valid-feedback">
          Looks good!
        </div>
        <div class="invalid-feedback">
          Must be like, "abc@xyz.efg"
        </div>
      </div>

      <div class="col-12">
        <label for="inputCard" class="form-label">Card</label>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1"><i class="bi-credit-card-fill"></i></span>
          <input type="text" id="inputCard" class="form-control" placeholder="XXXX-XXXX-XXXX-XXXX"
            aria-label="Username" aria-describedby="basic-addon1"/>
          <div class="valid-feedback">
            Looks good!
          </div>
          <div class="invalid-feedback">
            Must be like, "7777-7777-7777-7777"
          </div>
        </div>
      </div>

      <div class="col-12">
        <label for="inputAddress" class="form-label">Address</label>
        <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"/>
      </div>
      <div class="col-12">
        <label for="inputAddress2" class="form-label">Address 2</label>
        <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
      </div>
      <div class="col-md-6">
        <label for="inputCity" class="form-label">City</label>
        <input type="text" class="form-control" id="inputCity"/>
      </div>
      <div class="col-md-4">
        <label for="inputState" class="form-label">State</label>
        <select id="inputState" class="form-select">
          <option selected>Choose...</option>
          <option>...</option>
        </select>
      </div>
      <div class="col-md-2">
        <label for="inputZip" class="form-label">Zip</label>
        <input type="text" class="form-control" id="inputZip"/>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-success"> <i class="bi-bag-check"></i> Order</button>
      </div></div>
    </div>
    </div>
    </div>
    
);

const shop = (
    <div>
    STORE SE/ComS319
    <div class="card">
    <div class="row">
    {/* HERE, IT IS THE SHOPING CART */}
    <div class="col-md-8 cart">
    <div class="title">
    <div class="row">
    <div class="col">
    <h4>
    <b>319 Shopping Cart</b>
    </h4>
    <input type="text" id="search" placeholder="Search" onChange={handleSearch}/>
    </div>
    <div class="col align-self-center text-right text-muted">
    Products selected {cart.length}
    </div>
    </div>
    </div>
    <div>{listItems}</div>
    </div>
    <div class ="float-end">
    <p class ="mb-0 me-5 d-flex align-items-center">
    <span class ="small text-muted me-2">Order total:</span>
    <span class ="lead fw-normal">${cartTotal}</span>
    </p>
    </div>
    </div>
    </div>
    </div>
);
return (
    
<div>
{/* <div className="App"> */}
        <nav class="navbar navbar-expand navbar-dark bg-dark" id="nav" aria-label="Second navbar example">
  <div class="container-fluid">
  <button class="btn btn-primary rounded-pill px-3" onClick={() => setCurrentPage('home')}>Home</button>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
  </button>
  
  <div class="collapse navbar-collapse" id="navbarsExample02">
  <ul class="navbar-nav me-auto">
  <li class="nav-item">
  {/* <a class="nav-link active" aria-current="page" href="#">Browse</a> */}
  </li>
  <li class="nav-item">
  <button class="btn btn-success rounded-pill px-3" onClick={() => setCurrentPage('cart')}>Cart</button>
  </li>
  <li class="nav-item">
  {/* <a class="nav-link" href="#">Checkout</a> */}
  </li>
  </ul>
  
  </div>
  </div>
  </nav>
  
        {renderPage()}
      {/* </div> */}
</div>
);
}


export default Shop;