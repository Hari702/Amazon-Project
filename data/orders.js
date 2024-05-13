
export const orders = JSON.parse(localStorage.getItem("orders")) || []


export function addOrders(order) {
    orders.unshift(order)
    saveToStorage()
}

console.log(orders)

function saveToStorage() {
    localStorage.setItem("orders", JSON.stringify(orders))
}



console.log(orders)


export function getOrders(orderId){
    let matchingOrder

    orders.forEach((order)=>{
        if(order.id===orderId){
             matchingOrder=order
        }
    })

    return matchingOrder

}

export function getProductFromOrders(order,cartId){
    let matchingProductFromCart
  order.products.forEach((productDetails)=>{
    if(cartId==productDetails.id){
        matchingProductFromCart=productDetails
    }

  })
  return matchingProductFromCart
}

