import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('divishopping_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart data', error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('divishopping_cart', JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const increaseQuantity = (productId) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = cart.reduce((total, item) => {
    const price = Number(item.price || 0);
    return total + (price * item.quantity);
  }, 0);

  // Simple mock calculations
  const discount = subtotal > 100 ? subtotal * 0.1 : 0; // 10% off over $100
  const shipping = subtotal > 50 ? 0 : 15; // Free shipping over $50
  const total = subtotal - discount + shipping;

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      cartCount,
      subtotal,
      discount,
      shipping,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
};
