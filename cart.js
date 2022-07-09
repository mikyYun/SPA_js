// declare global variables
let addToCartBtn = document.getElementsByClassName("addToCart"); // querySelectorAll
let cartCOntainer = document.getElementById("cart-container");
let cartCol = document.getElementById("cart-col");
let product;
let cartObj = {
  items: [],
  total: 0
};

// add eventListener to all Btns
for (let i = 0; i < addToCartBtn.length; i++) {
  addToCartBtn[i].addEventListener("click", () => {
    let btn = addToCartBtn[i];
    // console.log("CLICKED")
    cart(btn);
  });
}

function cart(item) {
  // console.log("function cart", item)
  let parent = item.parentElement;
  // console.log(parent)
  product = parent.children;
  // for (let i = 0; i < product.length; i ++) {
  // console.log(product[i].innerHTML)
  // }
  buildCartObj(product);
} // end cart function

function buildCartObj(product) {
  let productObj = {};
  productObj.productName = product[0].innerHTML;
  productObj.productPrice = product[4].innerHTML;
  productObj.productImg = product[1].src;
  productObj.productId = Math.floor(Math.random() * 101);

  // console.log(productObj)
  cartObj.items.push(productObj);
  // console.log(cartObj)
  let result = cartObj.items.filter((item, index) => {
    return cartObj.items.findIndex(x => {
      return x.productName === item.productName && x.productPrice === item.productPrice;
    }) == index;
  });
  cartObj.items = result;
  buildDOM();
  // console.log("cartObject length check",cartObj.items.length, result)
} // end buildCartObj function

function buildDOM() {
  let cartItems = cartObj.items;
  while (cartCol.children.length) {
    cartCol.removeChild(cartCol.children[0]);
  }
  // console.log(cartObj.items)


  for (let i = 0; i < cartItems.length; i++) {
    let div = document.createElement("div");
    let productTitle = document.createElement("h5");
    let image = document.createElement("img");
    let productPrice = document.createElement("p");
    let productId = document.createElement("p");
    let removeBtn = document.createElement("button");
    div.setAttribute("class", "col-sm-8 d-flex justify-content-between cart-div");
    productTitle.innerHTML = cartItems[i].productName;
    image.src = cartItems[i].productImg;
    image.class = "cart-image"; // img-fluid
    image.style.width = "20%";
    productPrice.iNNerHTML = cartItems[i].productPrice;
    productId.innerHTML = cartItems[i].productId;
    removeBtn.setAttribute("class", "btn btn-danger");
    removeBtn.innerHTML = "remove";
    removeBtn.setAttribute("onclick", "remove(this)");
    div.appendChild(productTitle);
    div.appendChild(image);
    div.appendChild(productPrice);
    div.appendChild(productId);
    div.appendChild(removeBtn);
    cartCol.appendChild(div);
    total(cartObj);
  }
  // console.log(div)
  cartCOntainer.style.display = "block";

} // end buildDOM function

function remove(button) {
  // console.log(button, button.parentElement, button.previousElementSibling)
  let itemId = parseInt(button.previousElementSibling.innerHTML);
  // console.log(itemId);
  for (let i = 0; i < cartObj.items.length; i++) {
    if (cartObj.items[i].productId === itemId) {
      cartObj.items.splice(i, 1);
    }
  }
  buildDOM();
  total(cartObj);
} // end remove function

function total(cartObj) {
  let sum = 0;
  cartObj.items.forEach((item) => {
    let itemPrice = parseFloat(item.productPrice.substring(1));
    // console.log(itemPrice)
    sum += itemPrice;
  });
  cartObj.total = sum;
  document.getElementById("totalP").innerHTML = `Cart total is $${sum}`;
  paypal();
} // end total function

function paypal() { // paypal.html <form>
  if (cartObj.total > 0) {
    let paypalBtn = document.createElement("button");
    paypalBtn.setAttribute("class", "btn btn-primary btn-lg");
    let anchor = document.createElement("a");
    anchor.id = "anchor";
    anchor.href = "paypal.html";
    anchor.innerHTML = "Paypal";
    paypalBtn.appendChild(anchor);
    document.getElementById("totalP").appendChild(paypalBtn);
    sessionStorage.setItem("paypalTotal", JSON.stringify(cartObj.total));
  }
} // end paypal function