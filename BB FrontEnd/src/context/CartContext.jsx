import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("bitebox-cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("bitebox-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (restaurantCart) => {
    console.log(
      "🛒 CartContext received:",
      JSON.stringify(restaurantCart, null, 2)
    );

    setCartItems((prev) => {
      // restaurantCart = {restaurantId: 1, restaurantName: "Spice Villa", items: [{id:101, name:"Biryani"}]}

      const existingRestaurantIndex = prev.findIndex(
        (cart) => cart.restaurantId === restaurantCart.restaurantId
      );

      if (existingRestaurantIndex !== -1) {
        // ✅ MERGE new items into existing restaurant
        const existingItems = [...prev[existingRestaurantIndex].items];
        
        restaurantCart.items.forEach((newItem) => {
          const existingItemIndex = existingItems.findIndex(
            (item) => item.id === newItem.id
          );
          
          if (existingItemIndex !== -1) {
            // Item already exists - increase quantity
            existingItems[existingItemIndex] = {
              ...existingItems[existingItemIndex],
              quantity: (existingItems[existingItemIndex].quantity || 1) + (newItem.quantity || 1),
            };
          } else {
            // New item - add to cart
            existingItems.push({ ...newItem, quantity: newItem.quantity || 1 });
          }
        });
        
        const updatedCarts = [...prev];
        updatedCarts[existingRestaurantIndex] = {
          ...prev[existingRestaurantIndex],
          items: existingItems,
        };
        return updatedCarts;
      } else {
        // ✅ Add new restaurant
        return [...prev, restaurantCart];
      }
    });
  };

  const removeFromCart = (restaurantId, itemId) => {
    setCartItems(
      (prev) =>
        prev
          .map((cart) => {
            if (cart.restaurantId === restaurantId) {
              const updatedItems = cart.items.filter(
                (item) => item.id !== itemId
              );
              return updatedItems.length > 0
                ? { ...cart, items: updatedItems }
                : null;
            }
            return cart;
          })
          .filter(Boolean) // Remove empty carts
    );
  };

  const updateQuantity = (restaurantId, itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(restaurantId, itemId);
      return;
    }

    setCartItems((prev) =>
      prev.map((cart) =>
        cart.restaurantId === restaurantId
          ? {
              ...cart,
              items: cart.items.map((item) =>
                item.id === itemId ? { ...item, quantity } : item
              ),
            }
          : cart
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("bitebox-cart");
  };

  // Calculate totals
  const totalItems = cartItems.reduce(
    (sum, cart) =>
      sum + cart.items.reduce((acc, item) => acc + item.quantity, 0),
    0
  );

  const totalPrice = cartItems.reduce(
    (sum, cart) =>
      sum +
      cart.items.reduce(
        (acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1),
        0
      ),
    0
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
