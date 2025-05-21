import { calculateTotalPrice, getCartItems } from "./cart.js";
import { products } from "./products.js";

export const renderProducts = () => {
  const productList = document.getElementById("productList");

  products.forEach((product) => {
    const productCard = document.createElement("article");
    productCard.classList.add("product");
    productCard.setAttribute("data-id", product.id);

    productCard.innerHTML = `
      <div>
        <img class="product__image" src="${product.image}" alt="${
      product.title
    }" />
      </div>
      <div>
        <h5 class="product__title">${product.title}</h5>
        <p class="product__price">${product.price.toFixed(2)}</p>
      </div>
      <button class="product__add">Agregar</button>
    `;

    productList.append(productCard);
  });
};

export const updateCartUi = () => {
  const cartItemsContainer = document.querySelector(".cart__items");
  const totalPriceContainer = document.querySelector(".cart__totalPrice");
  const checkoutButton = document.querySelector(".cart__checkout");

  cartItemsContainer.innerHTML = "";
  const cartItems = getCartItems();

  cartItems.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart__item");
    cartItem.setAttribute("data-id", item.id);
    const partialTotal = item.price * item.quantity;

    cartItem.innerHTML = `
        <div class="cart__item-title">${item.title}</div>
        <div>${item.price} x ${item.quantity} = $${partialTotal}</div>
        <div>
          <button class="cart__increase">+</button>
          <button class="cart__decrease">-</button>
          <button class="cart__remove">Eliminar</button>     
      </div>  
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  totalPriceContainer.innerText = `Total: $${calculateTotalPrice()}`;

  // Mostrar/ocultar botón checkout
  if (cartItems.length > 0) {
    checkoutButton.style.display = "inline-block";
  } else {
    checkoutButton.style.display = "none";
  }

  // Actualizar contador de productos
  updateCartCount();
};

export const updateCartCount = () => {
  const itemCountElement = document.querySelector(".cart__item-count");
  const cartItems = getCartItems();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  if (totalItems > 0) {
    itemCountElement.innerText = totalItems;
    itemCountElement.style.display = "flex";
  } else {
    itemCountElement.style.display = "none";
  }
};

export const renderCheckout = () => {
  const cart = JSON.parse(localStorage.getItem("checkoutCart")) || [];
  const itemsContainer = document.querySelector(".checkout__items");
  const totalContainer = document.querySelector(".checkout__total");
  let total = 0;

  if (!itemsContainer || !totalContainer) return;

  itemsContainer.innerHTML = "";

  if (cart.length === 0) {
    itemsContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
    totalContainer.innerHTML = "";
  } else {
    cart.forEach((item) => {
      const subtotal = Number(item.price) * Number(item.quantity);
      total += subtotal;
      const div = document.createElement("div");
      div.className = "checkout__item";
      div.innerHTML = `
        <div class="cart__item-title">${item.title}</div>
        <div>${item.price} x ${item.quantity} = $${subtotal}</div>
      `;
      itemsContainer.appendChild(div);
    });
    totalContainer.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
  }
};
