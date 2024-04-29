import { cart, addToCart, updateDeliveryOption } from "../../data/cart.js";
import { loadFromStorage } from "../../data/cart.js";
import { removeProductFromCart } from "../../data/cart.js"




describe("test suite: add to cart", () => {

    beforeEach(() => {
        spyOn(localStorage, "setItem")
    })

    it("add a existing product to cart", () => {


        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([{
                productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: "1"

            }])
        })

        loadFromStorage()

        console.log(cart[0])

        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        expect(cart[0].quantity).toEqual(2)

        expect(localStorage.setItem).toHaveBeenCalledWith("cartproduct", JSON.stringify([{
            productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: "1"

        }]))


    })

    it("add a new product to cart", () => {

        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([])
        })

        loadFromStorage()
        console.log(localStorage.getItem("cart"))

        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d")

        expect(cart[0].productid).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        expect(cart[1].productid).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d")
        expect(localStorage.setItem).toHaveBeenCalledTimes(2)
        expect(cart.length).toEqual(2)

        expect(localStorage.setItem).toHaveBeenCalledWith("cartproduct", JSON.stringify([{
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
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([
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
            ])
        })
        loadFromStorage()

    })
    it("remove the product in the cart", () => {

        removeProductFromCart(cart[0].productid)

        console.log(cart)

        expect(cart.length).toEqual(1)
        expect(cart[0].productid).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d")

        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith("cartproduct", JSON.stringify([{
            productid: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: "1"

        }]))


    })

    it("does nothing if product not in cart", () => {

        removeProductFromCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e")

        expect(cart.length).toEqual(2)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith("cartproduct", JSON.stringify([
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
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([
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
            ])
        })
        loadFromStorage()
    })


    it("update delivery option for product in the cart", () => {

        updateDeliveryOption(cart[0].productid, "3")
        expect(cart[0].deliveryOptionId).toEqual("3")
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith("cartproduct", JSON.stringify([{
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


    it("does nothing if the product is not in the cart",()=>{
        updateDeliveryOption("83d4ca15-0f35-48f5-b7a3-1ea210004f2e", "3")

        expect(cart[0].deliveryOptionId).toEqual("1")
        expect(cart[1].deliveryOptionId).toEqual("1")
        

        expect(localStorage.setItem).toHaveBeenCalledTimes(0)
    })


    it("does nothing if the delivery option does not exist",()=>{
        updateDeliveryOption("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", "4")

        expect(cart[0].deliveryOptionId).toEqual("1")
        expect(cart[1].deliveryOptionId).toEqual("1")
        

        expect(localStorage.setItem).toHaveBeenCalledTimes(0)
    })
})