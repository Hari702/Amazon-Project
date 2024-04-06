// const products = [{
//     image: "images/products/athletic-cotton-socks-6-pairs.jpg",
//     name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//     rating: {
//         stars: 4.5,
//         count: 87
//     },
//     price: "100"
// },

// {
//     image: "images/products/intermediate-composite-basketball.jpg",
//     name: "Intermediate Size Basketball",
//     rating: {
//         stars: 4,
//         count: 147
//     },
//     price: "500"
// },

// {
//     image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
//     name: "Adults Plain Cotton T-Shirt - 2 Pack",
//     rating: {
//         stars: 4.5,
//         count: 56
//     },
//     price: "700"
// },

// {
//     image: "images/products/black-2-slot-toaster.jpg",
//     name: "2 Slot Toaster - Black",
//     rating: {
//         stars: 5,
//         count: 2197
//     },
//     price: "1,580"
// },

// {
//     image: "images/products/6-piece-white-dinner-plate-set.jpg",
//     name: "6 Piece White Dinner Plate Set",
//     rating: {
//         stars: 4,
//         count: 37
//     },
//     price: "1,799"
    
// },

// {
//     image:"images/products/6-piece-non-stick-baking-set.webp",
//     name:"6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set",
//     rating:{
//         stars:4.5,
//         count:175 
//     },
//     price:"2,899"
// }




// ]


let product_html = ""

products.forEach((product) => {
    product_html += ` <div class="product-container">
   <div class="product-image-container">
       <img  class="product-image" src=${product.image}>
   </div>
   <p class="product-name limit-text-to-2-lines">
       ${product.name}
   </p>
   <div class="product-rating-container">
       <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
       <p class="product-rating-num">${product.rating.count}</p>
   </div>
   <div class="product-price">
       <i class="fa-solid fa-indian-rupee-sign"></i>
       <p>${product.price}</p>
   </div>
   <div class="product-quantity">
       <select>
           <option>1</option>
           <option>2</option>
           <option>3</option>
           <option>4</option>
           <option>5</option>
           <option>6</option>
           <option>7</option>
           <option>8</option>
           <option>9</option>
           <option>10</option>
       </select>
   </div>
   <button class="Add-to-Cart-btn">Add to Cart</button>
</div>`


})

console.log(product_html)


let products_container = document.querySelector(".products-container")


products_container.innerHTML = product_html

console.log(products_container)