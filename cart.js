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
  })
  cartObj.items = result;
  // buildDOM();
  console.log("cartObject length check",cartObj.items.length, result)
} // end buildCartObj function