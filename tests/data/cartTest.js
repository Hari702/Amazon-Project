import { cart } from "../../data/cart-class.js";
import { loadFromStorage } from "../../data/cart.js";
import { removeProductFromCart } from "../../data/cart.js"




describe("test suite: add to cart", () => {

    beforeEach(() => {
        spyOn(localStorage, "setItem")
        document.querySelector(".select-class").innerHTML = `<select class="js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6">
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
      <select class="js-quantity-selector-15b6fc6f-327a-4ec4-896f-486349e85a3d">
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
      </select>`
    })

    afterEach(() => {
        document.querySelector(".js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6").remove()
        document.querySelector(".js-quantity-selector-15b6fc6f-327a-4ec4-896f-486349e85a3d").remove()
    })

    it("add a existing product to cart", () => {


        cart.cartItems = [{
            productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 1,
            deliveryOptionId: "1"

        }]

        loadFromStorage()

    console.log(cart[0])

    cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
    expect(cart.cartItems[0].quantity).toEqual(2)

    expect(localStorage.setItem).toHaveBeenCalledWith("cartproduct-oop", JSON.stringify([{
        productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1"

    }]))
    })

    


    it("add a new product to cart", () => {


        cart.cartItems = []



        console.log(localStorage.getItem("cart"))

        cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        cart.addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d")

        expect(cart.cartItems[0].productid).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        expect(cart.cartItems[1].productid).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d")
        expect(localStorage.setItem).toHaveBeenCalledTimes(2)
        expect(cart.cartItems.length).toEqual(2)

        expect(localStorage.setItem).toHaveBeenCalledWith("cartproduct-oop", JSON.stringify([{
            productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 1,
            deliveryOptionId: "1"
        },
        {
            productid: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: "1"


        }]))
    })


})


describe("test suite: remove from the cart", () => {

    beforeEach(() => {

        spyOn(localStorage, "setItem")
        cart.cartItems = [
            {
                productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: "1"
            },
            {
                productid: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: "1"


            }
        ]
    })
    it("remove the product in the cart", () => {

        cart.removeProductFromCart(cart.cartItems[0].productid)

        console.log(cart)

        expect(cart.cartItems.length).toEqual(1)
        expect(cart.cartItems[0].productid).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d")

        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith("cartproduct-oop", JSON.stringify([{
            productid: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: "1"

        }]))


    })

    it("does nothing if product not in cart", () => {

        cart.removeProductFromCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e")

        expect(cart.cartItems.length).toEqual(2)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith("cartproduct-oop", JSON.stringify([
            {
                productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: "1"
            },
            {
                productid: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: "1"


            }
        ]))

    })
})

describe("test suite: update delivery option", () => {


    beforeEach(() => {

        spyOn(localStorage, "setItem")
        cart.cartItems = [
            {
                productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: "1"
            },
            {
                productid: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: "1"

            }
        ]

    })

    it("update delivery option for product in the cart", () => {

        cart.updateDeliveryOption(cart.cartItems[0].productid, "3")
        expect(cart.cartItems[0].deliveryOptionId).toEqual("3")
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith("cartproduct-oop", JSON.stringify([{
            productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 1,
            deliveryOptionId: "3"

        },
        {

            productid: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: "1"


        }
        ]))
    })


    it("does nothing if the product is not in the cart", () => {
        cart.updateDeliveryOption("83d4ca15-0f35-48f5-b7a3-1ea210004f2e", "3")

        expect(cart.cartItems[0].deliveryOptionId).toEqual("1")
        expect(cart.cartItems[1].deliveryOptionId).toEqual("1")


        expect(localStorage.setItem).toHaveBeenCalledTimes(0)
    })


    it("does nothing if the delivery option does not exist", () => {
        cart.updateDeliveryOption("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", "4")

        expect(cart.cartItems[0].deliveryOptionId).toEqual("1")
        expect(cart.cartItems[1].deliveryOptionId).toEqual("1")


        expect(localStorage.setItem).toHaveBeenCalledTimes(0)
    })


})


