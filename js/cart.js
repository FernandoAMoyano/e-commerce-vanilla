import { updateCartCount } from "./ui.js";

// Cargar carrito desde localStorage al iniciar
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

export const createProduct = (id, title, price) => ({ id, title, price });

/* Funcion que obtiene los elementos del local storage */
export function getCartItems() {
  return cartItems;
}

/* Funcion que guarda el carrito en local storage */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

/* Funcion para agregar un producto al carrito */
export const addToCart = (product, quantity) => {
  const existsInTheCart = cartItems.find((item) => item.id === product.id);
  if (existsInTheCart) {
    existsInTheCart.quantity += 1;
  } else {
    cartItems.push({ ...product, quantity });
  }
  saveCart();
  updateCartCount();
};

/* Funcion para incrementar la cantidad del producto */
export const increaseQuantity = (id) => {
  const product = cartItems.find((item) => item.id === id);
  if (product) {
    product.quantity += 1;
    saveCart();
    updateCartCount();
  }
};

/* Funcion para disminuir la cantidad del producto */
export const decreaseQuantity = (id) => {
  const product = cartItems.find((item) => item.id === id);
  if (product) {
    if (product.quantity > 1) {
      product.quantity -= 1;
    } else {
      removeFromCart(id);
      return;
    }
    saveCart();
    updateCartCount();
  }
};

/* Funcion para eliminar el producto del carrito */
export const removeFromCart = (id) => {
  cartItems = cartItems.filter((item) => item.id !== id);
  saveCart();
  updateCartCount();
};

export const calculateTotalPrice = () => {
  return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
};
