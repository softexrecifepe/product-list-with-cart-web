// importar data.json
// importar entities/product.ts
// Criar os objetos de produto utilizando os
// dados de data.json

import { Product } from "./entities/product";
import data from "../data.json";
import { Cart } from "./entities/cart";

const product1 = new Product("Banana", "Fruta", 10, "http://example.com");
const product2 = new Product("Mamão", "Fruta", 5, "http://example.com");

const cart = new Cart();

cart.addToCart(product1);
cart.addToCart(product1);
console.log(cart);
console.log(cart.products.length);
console.log(cart.total);
