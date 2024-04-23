import { cart,removeProductFromCart,updateCartQuantity,num_quantity,updateQuantity} from '../data/cart.js'
import { products } from '../data/products.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'



console.log(dayjs().format('dddd,MMM D'))

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
         <div class="quantity quantity-${matchingProduct.id}">Quantity:${cartItem.quantity}</div>
         <button class="update-btn js-update-btn js-update-btn-${matchingProduct.id}" data-product-id="${matchingProduct.id}">Update</button>
         <input class="quantity-input js-quantity-input-${matchingProduct.id}" type="number">
         <button class="save-quantity-input js-save-quantity link-primary js-save-quantity-${matchingProduct.id}" data-product-id="${matchingProduct.id}">Save</button> 
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


function updationCartQuantity(){
  let cartQuantity=updateCartQuantity();
    document.querySelector(".items").innerHTML=`${cartQuantity} items`

}
 
document.querySelectorAll(".js-delete-btn").forEach((link)=>{

  link.addEventListener("click",()=>{
    let productId=link.dataset.productId
    removeProductFromCart(productId)
    let container=document.querySelector(`.ordered-product-container-${productId}`)
    console.log(container)
    container.remove()
    console.log(productId)
    updationCartQuantity()

  })
})
 
updationCartQuantity()
    


document.querySelectorAll(".js-update-btn").forEach((link)=>{
  link.addEventListener("click",()=>{
    let productId=link.dataset.productId
    let updateBtn=document.querySelector(`.js-update-btn-${productId}`)

    
      let quantityInput=document.querySelector(`.js-quantity-input-${productId}`)
      let saveQuantityInput=document.querySelector(`.js-save-quantity-${productId}`)
      quantityInput.style.display="inline"
      saveQuantityInput.style.display="inline" 

      document.querySelector(`.quantity-${productId}`).innerHTML="Quantity:"
      updateBtn.style.display="none"
   
  })

})

document.querySelectorAll(".js-save-quantity").forEach((link)=>{

  link.addEventListener("click",()=>{
    console.log(link);
    let productId=link.dataset.productId;
    console.log(productId)
    let savequantity=document.querySelector(`.js-quantity-input-${productId}`)
    let newQuantity=Number(savequantity.value)

    document.querySelector(`.quantity-${productId}`).innerHTML=`Quantity:${newQuantity}`
    let quantityInput=document.querySelector(`.js-quantity-input-${productId}`)
    let saveQuantityInput=document.querySelector(`.js-save-quantity-${productId}`)
    let updateBtn=document.querySelector(`.js-update-btn-${productId}`)
     quantityInput.style.display="none"
     saveQuantityInput.style.display="none" 
     updateBtn.style.display="inline"
     updateQuantity(productId,newQuantity);
     updationCartQuantity()

     

  })

})


