import { updateCartCount } from "./ui.js";

// Cargar carrito desde localStorage al iniciar
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

export const createProduct = (id, title, price) => ({ id, title, price });

export function getCartItems() {
  return cartItems;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

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

export const increaseQuantity = (id) => {
  const product = cartItems.find((item) => item.id === id);
  if (product) {
    product.quantity += 1;
    saveCart();
    updateCartCount();
  }
};

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

export const removeFromCart = (id) => {
  cartItems = cartItems.filter((item) => item.id !== id);
  saveCart();
  updateCartCount();
};

export const calculateTotalPrice = () => {
  return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
};
