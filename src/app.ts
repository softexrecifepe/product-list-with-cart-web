import data from "../data.json";

import { Product } from "./entities/product";

for (const product of data) {
  new Product(
    product.name,
    product.category,
    product.price,
    product.image.desktop
  ).toHTML();
}

/*
const product1 = new Product("Banana", "Fruta", 10, "http://example.com");
product1.incrementQuantity();
product1.incrementQuantity();
product1.incrementQuantity();

const product2 = new Product("Maçã", "Fruta", 5, "http://example.com");
product2.incrementQuantity();
product2.incrementQuantity();
console.log(Cart);

Cart.removeProduct(product2);
console.log(Cart);
*/
