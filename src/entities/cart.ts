import { Product } from "./product";

export class Cart {
  private static _products: Product[] = [];
  private static _orderTotal: number = 0;
  private static _totalQuantity: number = 0;

  static calculateTotal() {
    this._orderTotal = 0;
    this._totalQuantity = 0;

    for (const product of this.products) {
      this._orderTotal += product.total;
      this._totalQuantity += product.quantity;
    }
  }

  static removeProduct(product: Product) {
    // Remove um produto do carrinho, filtrando pelo produto em questão
    this._products = this._products.filter((item) => item.id !== product.id);
    this.calculateTotal();
  }

  static addToCart(product: Product) {
    const productInCart = this._products.includes(product);

    if (!productInCart) {
      this._products.push(product);
    }

    this.calculateTotal();

    // Atualiza o carrinho de compras no HTML
    this.toHTML();
    // console.log(Cart._products);
  }

  static toHTML() {
    const cartContainerHTML = document.getElementById("cart-container");

    if (!cartContainerHTML) return;

    const totalQuantityHTML = cartContainerHTML.querySelector(
      "#total-quantity-text"
    );

    if (!totalQuantityHTML) return;
    totalQuantityHTML.textContent = this._totalQuantity.toString();

    let ulProductsHTML = cartContainerHTML.querySelector("ul");
    let orderTotalContainerHTML = cartContainerHTML.querySelector(
      "#order-total-container"
    );

    if (ulProductsHTML && orderTotalContainerHTML) {
      ulProductsHTML.innerHTML = "";
      orderTotalContainerHTML.innerHTML = "";
    } else {
      ulProductsHTML = document.createElement("ul");
      orderTotalContainerHTML = document.createElement("div");
    }

    for (const product of this._products) {
      const liProductHTML = document.createElement("li");

      const productHTML = `
        <li class="border-b py-2 flex flex-col gap-1">
          <span class="product-name">${product.name}</span>
          <div class="flex gap-2">
            <span class="product-price text-sm">${product.quantity}x</span>
            <span class="product-category">@$${product.price}</span>
            <span class="product-name">$${product.total}</span>
          </div>
        </li>
      `;

      liProductHTML.innerHTML = productHTML;
      ulProductsHTML.appendChild(liProductHTML);
    }

    orderTotalContainerHTML.classList.add("mt-6");
    orderTotalContainerHTML.innerHTML = `
      <span class="product-name !font-normal">Order Total</span>
      <span class="product-name text-2xl font-bold">$${this._orderTotal}</span>
    `;

    cartContainerHTML.appendChild(ulProductsHTML);
    cartContainerHTML.appendChild(orderTotalContainerHTML);
  }

  static get products() {
    return this._products;
  }

  static get total() {
    return this._orderTotal;
  }
}
