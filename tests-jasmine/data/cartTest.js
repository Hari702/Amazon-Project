import { cart, addToCart } from "../../data/cart.js";
import { loadFromStorage } from "../../data/cart.js";



describe("test suite: add to cart", () => {
    it("add a existing product to cart", () => {
        spyOn(localStorage, "setItem")

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

    })

    it("add a new product to cart", () => {

        spyOn(localStorage, "setItem")

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
    })
})



