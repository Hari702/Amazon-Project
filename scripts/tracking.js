import { getOrders } from "../data/orders.js"
import { getProduct } from "../data/products.js"
import { loadProductsFetch } from "../data/products.js"
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

const url=new URL(window.location.href)
console.log(url.searchParams.get("orderId"))
console.log(url.searchParams.get("productId"))

async function loadPage(){
   await loadProductsFetch()
let order=getOrders(url.searchParams.get("orderId"))
let product=getProduct(url.searchParams.get("productId"))
let getProductFromOrders
order.products.forEach((productInner)=>{
   if(productInner.productid===product.id){
      getProductFromOrders=productInner
   }
})

console.log(getProductFromOrders)

console.log(order)
console.log(product)

dayjs.extend(dayjsPluginUTC.default)
console.log(getProductFromOrders.estimatedDeliveryTime)
let arrivingDate = dayjs(getProductFromOrders.estimatedDeliveryTime).format
("dddd, MMMM D")
console.log(arrivingDate)

const today = dayjs().utcOffset('+05:30');
console.log(`today ${today.format('ddd, DD MMM YYYY HH:mm:ss [GMT]')}`);
const orderTime = dayjs(order.orderTime).utcOffset('+05:30'); 
console.log(`orderTime ${orderTime.format('ddd, DD MMM YYYY HH:mm:ss [GMT]')}`);
const deliveryTime = dayjs(getProductFromOrders.estimatedDeliveryTime).utcOffset('+05:30');
console.log(`deliverytime ${deliveryTime.format('ddd, DD MMM YYYY HH:mm:ss [GMT]')}`)


const timeElapsed = today.diff(orderTime, 'hour'); 
console.log(timeElapsed)
const totalDeliveryTime = deliveryTime.diff(orderTime, 'hour');
console.log(totalDeliveryTime)
const percentProgressClamped = (timeElapsed / totalDeliveryTime) * 100;
console.log(percentProgressClamped)


const trackingHtml=`<a class="tracking-orders-link" href="orders.html">view all orders</a>
    <div class="tracking-arriving-date">Arriving on ${arrivingDate}</div>
    <div class="tracking-product-name">${product.name}</div>
    <div class="tracking-product-quantity">Quantity: ${getProductFromOrders.quantity}</div>
    <img class="tracking-product-image" src="${product.image}"></img>
    <div class="tracking-details-container">
      <div class="progress-label-${percentProgressClamped<50 ? "current-status":" "}">Preparing</div>
      <div class="progress-label-${percentProgressClamped>50 && percentProgressClamped <=99 ? "current-status":" "}">Shipped</div>
      <div class="progress-label-${percentProgressClamped>100 ? "current-status":" "}">Delivered</div>
    </div>
    <div class="delivery-progress">
      <div class="delivery-progress-inner" style="width:${percentProgressClamped}%"></div>
    </div>`

    document.querySelector(".tracking-main").innerHTML=trackingHtml
}

loadPage()

