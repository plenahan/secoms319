import React, { useState, useEffect } from "react";
import items from "./selected_products.json";


const Shop = () => {

    const [currentPage, setCurrentPage] = useState('home');    
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [nameValidated, setNameValidated] = useState(false);
    const [emailValue, setEmailValue] = useState("");
    const [emailValidated, setEmailValidated] = useState(false);
    const [creditValue, setCreditValue] = useState('');
    const [creditValidated, setCreditValidated] = useState(false);
    const [addressValue, setAddressValue] = useState('');
    const [addressValidated, setAddressValidated] = useState(false);
    const [cityValidated, setCityValidated] = useState(false);
    const [stateValidated, setStateValidated] = useState(false);
    const [zipValue, setZipValue] = useState('');
    const [zipValidated, setZipValidated] = useState(false);

    const usStates = [
      "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
      "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
      "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
      "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
      "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
      "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
      "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas",
      "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ];

    useEffect(() => {
        total();

    }, [cart]);
    useEffect(() => {
      const pattern = /^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/;
      setCreditValidated(creditValue.match(pattern));
    }, [creditValue]);
    useEffect(() => {
      const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    setEmailValidated(emailValue.match(pattern));
    }, [emailValue]);
    useEffect(() => {
      const pattern = /^\d{0,4}\s\w+\s\w+$/
    setAddressValidated(addressValue.match(pattern));
    }, [addressValue]);
    useEffect(() => {
      const pattern = /^\d{5}$/
    setZipValidated(zipValue.match(pattern));
    }, [zipValue]);

    
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
                <img className="img-fluid" src={item.image} width={150} />
                <div> Quantity: {howManyofThis(item.id)}</div>
                ${item.price}
              </div>
            );
          });
  
          
  function validate(){
    
  function validateName(event){
    if (event.target.value.length === 0)
   {
    //alert('Something went wrong!','danger')
    setNameValidated(false)
   } else {
    setNameValidated(true)
   }
  }
  function validateEmail(event){
    setEmailValue(event.target.value);

  }

  function isNumeric (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }
  
  function handleCreditChange(val){
    const formattedValue = val.replace(/-/g, '');
        let newVal = '';
        for (var i = 0, nums = 0; i < formattedValue.length; i++) {
          if (nums != 0 && nums % 4 == 0) {
            newVal += '-';
          }
          newVal += formattedValue[i]
          if (isNumeric(formattedValue[i])) {
          nums++;
          }
          }
    return newVal;

  }
  function validateCredit(event){
    setCreditValue(handleCreditChange(event.target.value));
  }
  function validateAddress(event){
    setAddressValue(event.target.value);
  }
  function validateCity(event){
    if (event.target.value.length === 0)
   {

    setCityValidated(false)
   } else {
    setCityValidated(true)
   }
  }
  function validateState(event){
    setStateValidated(event.target.value !== "Choose...");
  }
  function validateZip(event){
    setZipValue(event.target.value); 
  }
    return(
      <div class="container">

<div class="row">
  <div class="col-2"></div>


  <div class="col-8">

    <h1>Payment information</h1>
    <br/>

    <div id="liveAlertPlaceholder"></div>

    <form class="row g-3" id="checkout-form"/>

      <div class="col-md-6">
        <label for="inputName" class="form-label">Full Name</label>
        <input type="text" class="form-control" id="inputName" onChange={validateName}/>
        {nameValidated && <div>Looks good!</div>}
        {!nameValidated && <div>Must be like, "John Doe"</div>}
        <br/>
      </div>

      <div class="col-md-6">
        <label for="inputEmail4" class="form-label">Email</label>
        <input type="email" class="form-control" id="inputEmail" onChange={validateEmail}/>
        {emailValidated && <div>Looks good!</div>}
        {!emailValidated && <div>Must be like, "abc@xyz.efg"</div>}
        <br/>
      </div>

      <div class="col-12">
        <label for="inputCard" class="form-label">Card</label>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1"><i class="bi-credit-card-fill"></i></span>
          <input type="text" id="inputCard" class="form-control" placeholder="XXXX-XXXX-XXXX-XXXX"
            aria-label="Username" aria-describedby="basic-addon1" value = {creditValue} onChange={validateCredit}/>
          
        </div>
        {creditValidated ? (<div>Looks good!</div>) : (<div>Must be like, "7777-7777-7777-7777"</div>)}
        <br/>
      </div>

      <div class="col-12">
        <label for="inputAddress" class="form-label">Address</label>
        <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" onChange={validateAddress}/>
        {addressValidated ? (<div>Looks good!</div>) : (<div>Must be like, "1234 Main St"</div>)}
        <br/>
      </div>
      <div class="col-12">
        <label for="inputAddress2" class="form-label">Address 2</label>
        <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
      </div>
      <div class="col-md-6">
        <label for="inputCity" class="form-label">City</label>
        <input type="text" class="form-control" id="inputCity" placeholder = "Iowa" onChange={validateCity}/>
        {cityValidated ? (<div>Looks good!</div>) : (<div>Must be like, "Iowa"</div>)}
        <br/>
      </div>
      <div class="col-md-4">
        <label for="inputState" class="form-label">State</label>
        <select id="inputState" class="form-select" onChange={validateState}>
          <option selected>Choose...</option>
          {usStates.map((state, index) => (
          <option key={index} value={state}>{state}</option>
          ))}
        </select>
        {stateValidated ? (<div>Looks good!</div>) : (<div>Please pick a state</div>)}
        <br/>
      </div>
      <div class="col-md-4">
      <div>
  <label for="inputZip" className="form-label">Zip</label>
  <input type="text" className="form-control" id="inputZip" onChange={validateZip} />
  {zipValidated ? <div>Looks good!</div> : <div>Must be like, "50265"</div>}
  <br/>
</div>
        
        
      
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-success"> <i class="bi-bag-check"></i> Order</button>
      </div></div>
    </div>
    </div>
    );
  }
  

        const checkOut = validate();
        
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
    <div>
        <div>{uniqueCartItems}</div>
        <div>{checkOut}</div>
        
    </div>
    
);

const shop = (
    <div>
   
    <div class="card">
    <div class="row">
    {/* HERE, IT IS THE SHOPING CART */}
    <div class="col-md-8 cart">
    <div class="title">
    <div class="row">
    <div class="col">
    <h4>
    
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