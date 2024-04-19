import { cart,removeProductFromCart } from '../data/cart.js'
import { products } from '../data/products.js'

let cartProductHtml="";

cart.forEach((cartItem) => {
    const productId = cartItem.productid
    let matchingProduct;

    products.forEach((product) => {

        if (product.id === productId) {
            matchingProduct = product
        }

    })

    cartProductHtml += `
<div class="ordered-product-container   ordered-product-container-${matchingProduct.id}">
     <p class="delivery-date-final">Delivery date: Tuesday,April 24</p>
   <div class="cart-item-details">
     <img class="cart-item" src="${matchingProduct.image}">
     <div class="cart-item-name-price">
       <div class="cart-item-name">${matchingProduct.name}</div>
       <div class="cart-item-price">
         <i class="fa-solid fa-indian-rupee-sign"></i>
         <p class="price">${matchingProduct.price}</p>
       </div>
       <div class="cart-item-quantity">
         <div class="quantity">Quantity:${cartItem.quantity}</div>
         <button class="update-btn">Update</button>
         <button class="delete-btn js-delete-btn" data-product-id="${matchingProduct.id}">Delete</button>
       </div>
     </div>
     <div class="delivery-option">
       <div class="delivery-option-heading">Choose Delivery Option:</div>
       <div class="delivery-charge-container">
         <input class="delivery-charge-radio-btn" type="radio" name="delivery-date-${matchingProduct.id}" value="Sunday,April 14">
         <div>
           <p class="delivery-date">Sunday,April 14</p>
           <div class="delivery-charge">
             <i class="fa-solid fa-indian-rupee-sign"></i>
             <p class="delivery-charge-para">100-Shipping</p>
           </div>
         </div>
       </div>

       <div class="delivery-charge-container">
         <input class="delivery-charge-radio-btn" type="radio" name="delivery-date-${matchingProduct.id}" value="Sunday,April 14">
         <div>
           <p class="delivery-date">Sunday,April 14</p>
           <div class="delivery-charge">
             <i class="fa-solid fa-indian-rupee-sign"></i>
             <p class="delivery-charge-para">100-Shipping</p>
           </div>
         </div>
       </div>

       <div class="delivery-charge-container">
         <input class="delivery-charge-radio-btn" type="radio" name="delivery-date-${matchingProduct.id}" value="Sunday,April 14">
         <div>
           <p class="delivery-date">Sunday,April 14</p>
           <div class="delivery-charge">
             <i class="fa-solid fa-indian-rupee-sign"></i>
             <p class="delivery-charge-para">100-Shipping</p>
           </div>
         </div>
       </div>

     </div>
   </div>
 </div>
 `

})

console.log(cartProductHtml)

let orderSummaryContainer = document.querySelector(".order-summary-container")

console.log(orderSummaryContainer)
orderSummaryContainer.innerHTML = cartProductHtml

document.querySelectorAll(".js-delete-btn").forEach((link)=>{

  link.addEventListener("click",()=>{
    let productId=link.dataset.productId
    removeProductFromCart(productId)
    let container=document.querySelector(`.ordered-product-container-${productId}`)
    console.log(container)
    container.remove()
  })
})

