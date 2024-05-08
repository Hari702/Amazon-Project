import { updateCartQuantity } from "../../data/cart.js"


export function renderAmazonHeaderHtml(){

let amazonHeaderHtml=`<div class="amazon-header-left-section">

<a class="amazon-logo-link header-link" href="amazon.html">
    <img class="amazon-logo" src="images/amazon-logo-white.png">
    <img class="amazon-mobile-logo" src="images/amazon-mobile-logo-white.png">
</a>


</div>

<div class="amazon-header-middle-section">

<input class="header-input" type="text" placeholder="Search">
<button class="search-button">
    <i class="fa-solid fa-magnifying-glass"></i>
</button>

</div>

<div class="amazon-header-right-section">

<a class="header-order-link header-link">
    <p class="return">Return</p>
    <p class="order">& Orders </p>
</a>

<a class="header-cart-link header-link" href="checkout.html">

    <img class="cart-icon" src="images/icons/cart-icon.png">
    <span class="order-num">${updateCartQuantity()}</span>

    <div class="cart">Cart</div>
</a>

</div>`

document.querySelector(".amazon-header").innerHTML=amazonHeaderHtml
}

