'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface Product {
  id: number;
  name: string;
  weight: string;
  price: number;
  image: string;
  description: string;
  ingridient: string;
  kkall: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface ProductStore {
  // Products state
  products: Product[];
  setProducts: (products: Product[]) => void;
  getProductById: (id: number) => Product | undefined;

  // Cart state
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalCount: () => number;
  getProductQuantity: (productId: number) => number;
}

export const useProductStore = create<ProductStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Products state
        products: [],
        setProducts: (products) => set({ products }),
        getProductById: (id) => get().products.find((product) => product.id === id),

        // Cart state
        cart: [],
        addToCart: (product) => {
          const { cart } = get();
          const existingItem = cart.find((item) => item.product.id === product.id);

          if (existingItem) {
            set({
              cart: cart.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            });
          } else {
            set({ cart: [...cart, { product, quantity: 1 }] });
          }
        },
        removeFromCart: (productId) => {
          const { cart } = get();
          const existingItem = cart.find((item) => item.product.id === productId);

          if (existingItem) {
            if (existingItem.quantity > 1) {
              set({
                cart: cart.map((item) =>
                  item.product.id === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                ),
              });
            } else {
              set({
                cart: cart.filter((item) => item.product.id !== productId),
              });
            }
          }
        },
        clearCart: () => set({ cart: [] }),
        getTotalPrice: () => {
          const { cart } = get();
          return cart.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
          );
        },
        getTotalCount: () => {
          const { cart } = get();
          return cart.reduce((total, item) => total + item.quantity, 0);
        },
        getProductQuantity: (productId) => {
          const { cart } = get();
          const item = cart.find((item) => item.product.id === productId);
          return item ? item.quantity : 0;
        },
      }),
      {
        name: 'product-store',
      }
    )
  )
); 