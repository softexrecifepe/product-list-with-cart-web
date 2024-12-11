import { v4 as uuidv4 } from "uuid";
import { Cart } from "./cart";

export class Product {
  private _id: string = uuidv4();
  private _name: string;
  private _category: string;
  private _price: number;
  private _imageUrl: string;
  private _quantity: number = 0;
  private _total: number = 0;

  constructor(name: string, category: string, price: number, imageUrl: string) {
    this._name = name;
    this._category = category;
    this._price = price;
    this._imageUrl = imageUrl;
  }

  toHTML() {
    const productListHTML = document.getElementById("product-list");

    if (!productListHTML) return;

    const productHTML = document.createElement("li");
    productHTML.id = this._id;

    productHTML.innerHTML = `
        <div class="rounded-xl overflow-hidden flex flex-col w-[250px]">
          <div class="mb-10 relative h-full">
            <img src=${this._imageUrl} class="rounded-xl"/>
            <button id="button-add-to-cart" type="button" class="button rounded-full border font-semibold text-xs bg-white flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
              Add to Cart
            </button>
          </div>

          <div class="flex flex-col">
            <span class="product-category">${this._category}</span>
            <span class="product-name text-xl font-medium">${this._name}</span>
            <span class="product-price">$${this._price}</span>
          </div>
        </div>
    `;

    const buttonAddToCartHTML = productHTML.querySelector(
      "#button-add-to-cart"
    );
    buttonAddToCartHTML?.addEventListener("click", () =>
      this.incrementQuantity()
    );

    productListHTML.appendChild(productHTML);
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get quantity() {
    return this._quantity;
  }

  get total() {
    return this._total;
  }

  calculateTotal() {
    this._total = this._quantity * this._price;
  }

  incrementQuantity() {
    this._quantity++;
    this.calculateTotal();
    // console.log(`quantity:`, this._quantity);

    Cart.addToCart(this);
  }

  decrementQuantity() {
    this._quantity--;
    this.calculateTotal();
    // TODO: remover o produto do carrinho se a quantidade for 0
  }

  get price() {
    return this._price;
  }
}
