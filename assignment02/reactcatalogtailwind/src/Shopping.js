import React, { useState, useEffect } from "react";
import items from "./selected_products.json";


const Shop = () => {

    //used to set current page
    const [currentPage, setCurrentPage] = useState('home');    
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    //used for search bar
    const [searchValue, setSearchValue] = useState("");

    //all used for validation
    const [nameValue, setNameValue] = useState("");
    const [nameValidated, setNameValidated] = useState(false);
    const [emailValue, setEmailValue] = useState("");
    const [emailValidated, setEmailValidated] = useState(false);
    const [creditValue, setCreditValue] = useState('');
    const [creditValidated, setCreditValidated] = useState(false);
    const [addressValue, setAddressValue] = useState('');
    const [addressValidated, setAddressValidated] = useState(false);
    const [cityValue, setCityValue] = useState('');
    const [cityValidated, setCityValidated] = useState(false);
    const [stateValue, setStateValue] = useState('');
    const [stateValidated, setStateValidated] = useState(false);
    const [zipValue, setZipValue] = useState('');
    const [zipValidated, setZipValidated] = useState(false);
    
    //Set Initial Form Data
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      creditNumber: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
    });
    
    //used to create the state drop down menue
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

    //Checks when field values are changed and then does the validation check
    //I found that when just doing this inside of the function that is called by onChange it updates one input too slowly
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
    
    //Updates Cart items and total
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
    
    //This finds the index of the given element if it exists and removes it from the array of cart items
    const removeFromCart = (el) => {
        const hardCopy = [...cart];
        const index = cart.findIndex((cartItem) => cartItem.id === el.id);
        if (index !== -1) {
          hardCopy.splice(index, 1); 
          setCart(hardCopy);
        }
      };
      //Finds the number of one item ordered
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

        //turning cart items into a set in order to put them in the checkout view correctly
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
          //Form validation
          function validate(){
    
            //if length exists it's valid
            function validateName(event){
              if (event.target.value.length === 0)
             {
              setNameValidated(false)
             } else {
              setNameValue(event.target.value)
              setNameValidated(true)
             }
            }
            //this just changes the email value which is then checked in the useEffect
            function validateEmail(event){
              setEmailValue(event.target.value);
            }    

              function isNumeric (n) {
                return !isNaN(parseFloat(n)) && isFinite(n)
              }
              //this is the formatter used previously just formatted for react
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
              //same as email, just changes value to be checked above
              function validateCredit(event){
                setCreditValue(handleCreditChange(event.target.value));
              }
              //same ^
              function validateAddress(event){
                setAddressValue(event.target.value);
              }
              //this works same as name since I have no way of knowing every single city in the US
              function validateCity(event){
                
                if (event.target.value.length === 0)
               {
                setCityValidated(false)
               } else {
                setCityValue(event.target.value)
                setCityValidated(true)
               }
              }
              //since the state is a drop down, as long as the value isnt the default instruction one, it is a state and therefore valid
              function validateState(event){
                setStateValue(event.target.value)
                setStateValidated(event.target.value !== "Choose...");
              }
              //works same as email and address
              function validateZip(event){
                setZipValue(event.target.value); 
              }
              //Resets form values
              function resetValidation(){
                setNameValidated(false);
                setNameValue("");
                setEmailValidated(false);
                setEmailValue("");
                setCreditValidated(false);
                setCreditValue("");
                setAddressValidated(false);
                setAddressValue("");
                setCityValidated(false);
                setStateValidated(false);
                setZipValidated(false);
                setZipValue("");

              }
              function setInformation(){
                setFormData({
                  name: nameValue,
                  email: emailValue,
                  creditNumber: creditValue,
                  address: addressValue,
                  city: cityValue,
                  state: stateValue,
                  zipcode: zipValue,
                });
              }
              //if everything is valid move to the confirmation page and reset the validation for the cart items
              function cartValidated(){
                if(zipValidated && stateValidated && cityValidated && addressValidated && creditValidated && emailValidated && nameValidated ){
                  setCurrentPage('confirmation')
                  setInformation();
                  resetValidation();
                }
              }
              
              
                //just the outputted JSX, there are messages embedded that show validation for the user based on the values of the respective validated variable
                return(
                  <div>
    <div>
      
        <div>

<div class="row" >
  <div class="col-2"></div>


  <div class="col-8 card shadow-sm" style={{backgroundColor: 'white', justifyContent: 'center'}}>

    <h1>Payment information</h1>

    <div id="liveAlertPlaceholder"></div>

    <form class="row g-3" id="checkout-form"/>

      <div class="col-md-6">
        <label for="inputName" class="form-label">Full Name</label>
        <input type="text" class="form-control" id="inputName"  onChange={validateName}/>
        {nameValidated && <div>Looks good!</div>}
        {!nameValidated && <div>Must be like, "John Doe"</div>}
        <br/>
      </div>

      <div class="col-md-6">
        <label for="inputEmail4" class="form-label">Email</label>
        <input type="email" class="form-control" id="inputEmail" value={emailValue} onChange={validateEmail}/>
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
        <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" value={addressValue} onChange={validateAddress}/>
        {addressValidated ? (<div>Looks good!</div>) : (<div>Must be like, "1234 Main St"</div>)}
        <br/>
      </div>
      <div class="col-12">
        <label for="inputAddress2" class="form-label">Address 2</label>
        <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
      </div>
      <div class="col-md-6">
        <label for="inputCity" class="form-label">City</label>
        <input type="text" class="form-control" id="inputCity" placeholder = "Ames"  onChange={validateCity}/>
        {cityValidated ? (<div>Looks good!</div>) : (<div>Must be like, "Ames"</div>)}
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
  <input type="text" className="form-control" id="inputZip" value={zipValue} onChange={validateZip} />
  {zipValidated ? <div>Looks good!</div> : <div>Must be like, "50265"</div>}
  <br/>
</div>
      </div>
      <div>Order Total: {cartTotal}</div>
      <div class="col-12">
        <button type="submit" id="order" class="btn btn-success" onClick={() => cartValidated()}> <i class="bi-bag-check" ></i> Order</button>
      </div></div>
    </div>
    </div>
    </div>
    </div>
    );
    }

    //check out is whats returned above, the validated form
    const checkOut = validate();
    //filters the json file based on whats inputted in the search field
    const filteredItems = items.filter((el) =>
            el.title.toLowerCase().includes(searchValue)
        );
    //whats left is then put into the list items to be shown
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
            //just sets the the search value to whatever is inputted in all lower case
            function handleSearch(event) {
                setSearchValue((event.target.value).toLowerCase());
            }      

            //based on input renders the correct page
            const renderPage = () => {
                switch (currentPage) {
                  case 'home':
                      return shop;
                  //   return <Shop />;
                  case 'cart':
                    return myCart;
                  //   return <Cart />;
                  case 'confirmation':
                    return confirmation
                  default:
                  //   return <Shop />;
                    return shop;
                }
              };
              //cart items + checkout form validation
              const myCart = (
                <div  style={{backgroundColor: "ghostwhite"}}>
                  <div class="row row-cols-1 row-cols-sm-4 row-cols-md-9 g-9" style={{justifyContent:'center'}}>
        
                    {uniqueCartItems}
                  </div>
                    <div>{checkOut}</div>
            
                </div>
            
            );
            const myInfo = (
              <div class="col">
                <div class="card shadow-sm">
                  <div class="card-body">
                    <p class="card-text">Name: {formData.name}</p>
                    <p class="card-text">Email: {formData.email}</p>
                    <p class="card-text">Card Number: {formData.creditNumber}</p>
                    <p class="card-text">Address: {formData.address}</p>
                    <p class="card-text">City: {formData.city}</p>
                    <p class="card-text">State: {formData.state}</p>
                    <p class="card-text">Zipcode: {formData.zipcode}</p>
                  </div>
                </div>
              </div>
            )
            //confirmation menue
            const confirmation = (
              <div>
                <h1>Thank You!</h1>
                <h3>Your Order has been placed.</h3>
                <p>Your Total is: {cartTotal}</p>
                <p>Your Information: </p>
                {myInfo}
                <p>Items: </p>
                {uniqueCartItems}
              </div>
            );

const shop = (
    <div>
    {/* STORE SE/ComS319 */}
    <div class="card">
    <div class="row">
    {/* HERE, IT IS THE SHOPING CART */}
    <div class="col-md-8 cart">
    <div class="title">
    <div class="row">
    <div class="col">
    <h4>
    {/* <b>319 Shopping Cart</b> */}
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
  {currentPage != 'home' && <button class="btn btn-primary rounded-pill px-3" onClick={() => { if(currentPage === 'confirmation'){
    setCart([]);
  }
    setSearchValue("");setCurrentPage('home');}}>Return</button>}
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
  </button>
  
  <div class="collapse navbar-collapse" id="navbarsExample02">
  <ul class="navbar-nav me-auto">
  <li class="nav-item">
  {/* <a class="nav-link active" aria-current="page" href="#">Browse</a> */}
  </li>
  <li class="nav-item">
  {currentPage != 'cart' && currentPage != 'confirmation' &&<button class="btn btn-success rounded-pill px-3" onClick={() => setCurrentPage('cart')}>CheckOut</button>}
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