import {
  addToCart,
  createProduct,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  getCartItems,
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
      /* Confirmar eliminación del producto */
      const productId = event.target
        .closest(".cart__item")
        .getAttribute("data-id");

      Swal.fire({
        title: "¿Estás seguro?",
        text: "Este producto será eliminado del carrito.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          removeFromCart(productId);
          updateCartUi();

          // Mostrar un mensaje de éxito
          Toast.fire({
            icon: "success",
            title: "Producto eliminado del carrito",
          });
        }
      });
    } else if (event.target.classList.contains("cart__increase")) {
      /* Incrementrar la cantidad en 1 */
      const productId = event.target
        .closest(".cart__item")
        .getAttribute("data-id");

      increaseQuantity(productId);
      updateCartUi();
    } else if (event.target.classList.contains("cart__decrease")) {
      /* Disminuir la cantidad en 1 */
      const productId = event.target
        .closest(".cart__item")
        .getAttribute("data-id");

      decreaseQuantity(productId);
      updateCartUi();
    }
  });

// Evento para el botón Checkout
document.querySelector(".cart__checkout").addEventListener("click", () => {
  // Asegúrate de guardar el carrito actual en localStorage antes de copiarlo
  localStorage.setItem("cart", JSON.stringify(getCartItems()));
  const cartItems = JSON.stringify(getCartItems());
  localStorage.setItem("checkoutCart", cartItems);
  window.location.href = "checkout.html";
});
