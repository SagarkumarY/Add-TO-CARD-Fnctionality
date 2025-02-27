import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [],
  
  addToCart: (product) => set((state) => {
    const existingItem = state.cart.find((item) => item.id === product.id);
    if (existingItem) {
      return {
        cart: state.cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),

  updateQuantity: (id, amount) => set((state) => {
    return {
      cart: state.cart
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + amount } : item))
        .filter((item) => item.quantity > 0),
    };
  }),

  removeItem: (id) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== id),
  })),

  clearCart: () => set({ cart: [] }), // Clears the entire cart
}));

export default useCartStore;
