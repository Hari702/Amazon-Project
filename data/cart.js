
export let cart =JSON.parse(localStorage.getItem("cartproduct"))
console.log(cart)


if(!cart){
    cart=[{
        productid:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:1
    }]
}




function addCartToLocalStorage(){

    localStorage.setItem("cartproduct",JSON.stringify(cart))
}

export function addToCart(productid) {
    //   adding product to the cart

    let quantity = parseInt(document.querySelector(`.js-quantity-selector-${productid}`).value)
    let matchingitem;
    cart.forEach((cartItem) => {
        // console.log(`${productname}===${item.productname}`)
        if (productid === cartItem.productid) {
            matchingitem = cartItem
        }
    })

    if (matchingitem) {
        matchingitem.quantity += quantity
    }

    else {
        cart.push({
            // productid:productid
            productid,
            // quantity:quantity
            quantity
        })

    }
    addCartToLocalStorage()
  
}



export function removeProductFromCart(productId){
    const newCart=[]
    console.log(newCart)
    cart.forEach((cartItem)=>{

        if(cartItem.productid!==productId){

            newCart.push(cartItem)

        }
    })
   console.log(cart)
    cart=newCart
    console.log(cart)


    addCartToLocalStorage()
   

}

export var num_quantity=0;
export function updateCartQuantity() {
    num_quantity = 0;
    cart.forEach((cartItem) => {
        num_quantity += cartItem.quantity
        // addNumQuantityToLocalStorage()
        localStorage.setItem("num_quantity",JSON.stringify(num_quantity))
        
    })

    return num_quantity    
}

export function updateQuantity(productId, newQuantity) {
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if (productId === cartItem.productid) {
        matchingItem = cartItem;
      }
    });
  
    matchingItem.quantity = newQuantity;
  
    addCartToLocalStorage()
}
