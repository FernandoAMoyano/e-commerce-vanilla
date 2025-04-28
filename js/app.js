import {
  addToCart,
  createProduct,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "./cart.js";
import { renderProducts, updateCartUi } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartUi();
});

//BOTÓN Abrir y cerrar Sidebar
const cartOpenButton = document.querySelector(".cart__openButton");
const cartSidebar = document.querySelector(".cart__sidebar");
const cartCloseButton = document.querySelector(".cart__close");

cartOpenButton.addEventListener("click", () => {
  cartSidebar.classList.add("cart__sidebar--open");
});

cartCloseButton.addEventListener("click", () => {
  cartSidebar.classList.remove("cart__sidebar--open");
});

// Configuración de SweetAlert2 para las alertas de éxito
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

document.getElementById("productList").addEventListener("click", (event) => {
  if (event.target.classList.contains("product__add")) {
    const card = event.target.closest(".product");
    const productTitle = card.querySelector(".product__title").innerText;
    const productPrice = parseFloat(
      card.querySelector(".product__price").innerText
    );
    const productId = card.getAttribute("data-id");

    const product = createProduct(productId, productTitle, productPrice);

    addToCart(product, 1);
    updateCartUi();

    // Mostrar el SweetAlert cuando se agrega el producto al carrito
    Toast.fire({
      icon: "success",
      title: `${productTitle} agregado al carrito`,
    });
  }
});

//BOTONES DENTRO DEL CARRITO
document
  .querySelector(".cart__container")
  .addEventListener("click", (event) => {
    if (event.target.classList.contains("cart__remove")) {
      const productId = event.target
        .closest(".cart__item")
        .getAttribute("data-id");

      removeFromCart(productId);
      updateCartUi();
    } else if (event.target.classList.contains("cart__increase")) {
      const productId = event.target
        .closest(".cart__item")
        .getAttribute("data-id");

      increaseQuantity(productId);
      updateCartUi();
    } else if (event.target.classList.contains("cart__decrease")) {
      const productId = event.target
        .closest(".cart__item")
        .getAttribute("data-id");

      decreaseQuantity(productId);
      updateCartUi();
    }
  });
