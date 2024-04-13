
export const cart = []

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
}

