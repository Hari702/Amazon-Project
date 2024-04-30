import { products } from '../data/products.js'
import { cart, addToCart,updateCartQuantity} from '../data/cart.js'

// generaing HTML code 
let product_html = ""

products.forEach((product) => {
    product_html += ` <div class="product-container">
   <div class="product-image-container">
       <img  class="product-image" src="${product.image}">
   </div>
   <p class="product-name limit-text-to-2-lines">
       ${product.name}
   </p>
   <div class="product-rating-container">
       <img class="product-rating-stars" src="${product.getStarsUrl()}">
       <p class="product-rating-num">${product.rating.count}</p>
   </div>
   <div class="product-price">
       <i class="fa-solid fa-indian-rupee-sign"></i>
       <p>${product.price}</p>
   </div>
   <div class="product-quantity">
       <select class="js-quantity-selector-${product.id}">
           <option selected value="1">1</option>
           <option value="2">2</option>
           <option value="3">3</option>
           <option value="4">4</option>
           <option value="5">5</option>
           <option value="6">6</option>
           <option value="7">7</option>
           <option value="8">8</option>
           <option value="9">9</option>
           <option value="10">10</option>
       </select>
   </div>
   ${product.getSizeChartLink()}
   <div class="spacer"></div>
   <div class="added-to-cart js-added-to-cart-${product.id}">
     <img src="images/icons/checkmark.png">
      Added
    </div>
   
    <button class="Add-to-Cart-btn js-add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
   
</div>`


})

console.log(product_html)

// console.log(product_html)

// to insert the html code using DOM

document.querySelector(".products-container").innerHTML = product_html;

// console.log(products_container)



let js_cart_btn = document.querySelectorAll(".js-add-to-cart-btn")

let cartQuantity=updateCartQuantity();
document.querySelector(".order-num").innerHTML = cartQuantity


js_cart_btn.forEach((button) => {

    let addedMessageTimeout;
    button.addEventListener("click", () => {
        console.log(button.dataset.productId)
        let productid = button.dataset.productId
        addToCart(productid);
        let cartQuantity=updateCartQuantity();
document.querySelector(".order-num").innerHTML = cartQuantity

        
        // when we click add cart button added with color green will display and when click add cart button within 3 sec continuously added popup will display 3 sec and display,will not  continue to previous timeout it will start with new timeout
        if (addedMessageTimeout) {
            console.log("hello")
            clearInterval(addedMessageTimeout)
        }
        let addedmessage = document.querySelector(`.js-added-to-cart-${productid}`)
        addedmessage.classList.add("added-to-cart-visible")

        const closure_id = setTimeout(() => {
            addedmessage.classList.remove("added-to-cart-visible")
        }, 3000)


        addedMessageTimeout=closure_id

        // displayAdded(productid);

        console.log(button)

    })


    // console.log(addedMessageTimeout)
    // })

})






