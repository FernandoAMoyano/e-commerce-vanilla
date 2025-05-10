import { updateCartCount } from "./ui.js";

let cartItems = [];

export const createProduct = (id, title, price) => ({ id, title, price });

export const getCartItems = () => {
  return [...cartItems];
};

export const addToCart = (product, quantity) => {
  const existsInTheCart = cartItems.find((item) => item.id === product.id);
  if (existsInTheCart) {
    existsInTheCart.quantity += 1;
  } else {
    cartItems.push({ ...product, quantity });
  }
  updateCartCount();
};

export const increaseQuantity = (id) => {
  const product = cartItems.find((item) => item.id === id);
  if (product) {
    product.quantity += 1;
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
    }
    updateCartCount();
  }
};

export const removeFromCart = (id) => {
  cartItems = cartItems.filter((item) => item.id !== id);
  updateCartCount();
};

export const calculateTotalPrice = () => {
  return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
};
