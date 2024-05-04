import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart } from "../../data/cart-class.js";
import { renderPaymentSummary } from "../../scripts/checkout/paymentSummary.js";
import { loadProducts } from "../../data/products.js";



describe("test suite: display Order summary", () => {

    beforeAll((done)=>{
        loadProducts(done);
        
    })


    beforeEach(()=>{

        document.querySelector(".js-test-ordersummary-container").innerHTML = `<div class="order-summary-container"></div>`

        spyOn(localStorage,"setItem")

        cart.cartItems=[
            {
                productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: "1"

            },
            {
                productid: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 2,
                deliveryOptionId: "1"


            }
        ]
        

        renderOrderSummary()
    })

    afterEach(()=>{
        document.querySelector(".js-test-ordersummary-container").innerHTML=" "

        document.querySelector(".payment-summary-container").innerHTML=" "

        document.querySelector(".items").innerHTML=""
    })

    it("display cart", () => {

        expect(document.querySelectorAll(".ordered-product-container").length).toEqual(2)

        console.log(cart.cartItems[0].quantity)

        expect(document.querySelector(`.quantity-${cart.cartItems[0].productid}`).innerHTML).toContain("Quantity:1")

        expect(document.querySelector(`.quantity-${cart.cartItems[1].productid}`).innerHTML).toContain("Quantity:2")

       

        expect(document.querySelector(`.js-cart-item-name-${cart.cartItems[0].productid}`).innerHTML).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs")

        expect(document.querySelector(`.js-cart-item-name-${cart.cartItems[1].productid}`).innerHTML).toEqual("Intermediate Size Basketball")


        expect(document.querySelector(`.js-price-${cart.cartItems[0].productid}`).innerHTML).toEqual("100")

        expect(document.querySelector(`.js-price-${cart.cartItems[1].productid}`).innerHTML).toEqual("500")
        
    })

    it("remove a product",()=>{

        document.querySelector(`.js-delete-btn-${cart.cartItems[0].productid}`).click()

        expect(document.querySelectorAll(".ordered-product-container").length).toEqual(1)

        expect(document.querySelector(".ordered-product-container-e43638ce-6aa0-4b85-b27f-e1d07eb678c6")).toEqual(null)

        expect(document.querySelector(`.ordered-product-container-${cart.cartItems[0].productid}`)).not.toEqual(null)

        expect(cart.cartItems.length).toEqual(1)
        expect(cart.cartItems[0].productid).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d")
        
        expect(document.querySelector(`.js-cart-item-name-${cart.cartItems[0].productid}`).innerHTML).toEqual("Intermediate Size Basketball")
        expect(document.querySelector(`.js-price-${cart.cartItems[0].productid}`).innerHTML).toEqual("500")

    })

    it("updating delivery option",()=>{
        console.log(document.querySelector(".order-summary-container"))

        document.querySelector(`.js-delivery-option-${cart.cartItems[0].productid}-3`).click()

        expect(document.querySelector(`.js-delivery-option-${cart.cartItems[0].productid}-3`).checked).toEqual(true)

        renderPaymentSummary()
        expect(cart.cartItems[0].deliveryOptionId).toEqual("3")

        expect(document.querySelector(".js-payment-summary-delivery-price").innerHTML).toEqual("90")
        expect(document.querySelector(".js-total-price").innerHTML).toEqual("1,309")
    })
})


