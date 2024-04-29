import { cart,removeProductFromCart,updateCartQuantity,updateQuantity,updateDeliveryOption} from '../../data/cart.js'
import { products,getProduct } from '../../data/products.js'

import { deliveryOptions,getDeliveryOption } from '../../data/deliveryOptions.js'
import { renderPaymentSummary } from './paymentSummary.js'
import { calculateDeliveryDate } from '../../data/deliveryOptions.js'


export function renderOrderSummary(){
    let cartProductHtml="";
  cart.forEach((cartItem) => {
      const productId = cartItem.productid
     

     
     let matchingProduct=getProduct(productId)
     

     const deliveryOptionId=cartItem.deliveryOptionId
  
     let deliveryOption=getDeliveryOption(deliveryOptionId)

     let dataString=calculateDeliveryDate(deliveryOption)
     
  
  
      cartProductHtml += `
  <div class="ordered-product-container   ordered-product-container-${matchingProduct.id}">
       <p class="delivery-date-final">Delivery date: ${dataString}</p>
     <div class="cart-item-details">
       <img class="cart-item" src="${matchingProduct.image}">
       <div class="cart-item-name-price">
         <div class="cart-item-name js-cart-item-name-${matchingProduct.id}">${matchingProduct.name}</div>
         <div class="cart-item-price">
           <i class="fa-solid fa-indian-rupee-sign"></i>
           <p class="price js-price-${matchingProduct.id}">${matchingProduct.price}</p>
         </div>
         <div class="cart-item-quantity">
           <div class="quantity quantity-${matchingProduct.id}">Quantity:${cartItem.quantity}</div>
           <button class="update-btn js-update-btn js-update-btn-${matchingProduct.id}" data-product-id="${matchingProduct.id}">Update</button>
           <input class="quantity-input js-quantity-input-${matchingProduct.id}" type="number">
           <button class="save-quantity-input js-save-quantity link-primary js-save-quantity-${matchingProduct.id}" data-product-id="${matchingProduct.id}">Save</button> 
           <button class="delete-btn js-delete-btn js-delete-btn-${matchingProduct.id}" data-product-id="${matchingProduct.id}">Delete</button>
         </div>
       </div>
       <div class="delivery-option" >
         <div class="delivery-option-heading">Choose Delivery Option:</div>
         ${deliveryOptionHtml(matchingProduct,cartItem)}
       </div>
     </div>
   </div>

   `
  
  })
  
  
  function deliveryOptionHtml(matchingProduct,cartItem){
    let html=""
  deliveryOptions.forEach((deliveryOption)=>{
  
    let dateString=calculateDeliveryDate(deliveryOption)
     const price=deliveryOption.price===0?"Free":deliveryOption.price
    
     const isChecked=deliveryOption.id===cartItem.deliveryOptionId
  
     console.log(isChecked)
  
  
    if(price==="Free"){
    html+=`<div class="delivery-charge-container js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
    <input class="delivery-charge-radio-btn js-delivery-option-${matchingProduct.id}-${deliveryOption.id}" ${isChecked?"checked":" "} type="radio" name="delivery-date-${matchingProduct.id}" value="${dateString}">
    <div>
      <p class="delivery-date">${dateString}</p>
      <div class="delivery-charge">
      <p class="delivery-charge-para">${price} Shipping</p>
      </div>
    </div>
  </div>`
  }
  else{
    html+=`<div class="delivery-charge-container js-delivery-option"
    data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
    <input class="delivery-charge-radio-btn js-delivery-option-${matchingProduct.id}-${deliveryOption.id}" ${isChecked?"checked":" " } type="radio" name="delivery-date-${matchingProduct.id}" value="${dateString}">
    <div>
      <p class="delivery-date js-delivery-">${dateString}</p>
      <div class="delivery-charge">
      <i class="fa-solid fa-indian-rupee-sign"></i>
      <p class="delivery-charge-para">${price} - Shipping</p>
      </div>
    </div>
  </div>`
  }
  
  })
  
  return html
  console.log(html)
  }
  
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
      renderOrderSummary()
      console.log(productId)
      updationCartQuantity()
      renderPaymentSummary()
  
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
       renderPaymentSummary()
  
       
  
    })
  
  })
  
  
  
  document.querySelectorAll(".js-delivery-option").forEach((element)=>{
  
    element.addEventListener("click",()=>{
      console.log(element)
    const{productId,deliveryOptionId}=element.dataset
    console.log(productId,deliveryOptionId)
    updateDeliveryOption(productId,deliveryOptionId)
    
    renderOrderSummary()
    renderPaymentSummary()
   
    })
  })
  
  }