import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductStore {
  CartProducts: Product[]; // Products added to the cart
  AddProductToCart: (product: any) => void; // Add product to cart
  removeProductFromCart: (productId: number) => void; // Remove product from cart
}

export const ProductsStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      CartProducts: [],
      isProductsLoading: false,

      // Add a product to the cart
      AddProductToCart: (product: any) => {
        set((state) => ({
          CartProducts: [...state.CartProducts, product],
        }));
        toast.success("Product added to cart");
      },

      // Remove a product from the cart
      removeProductFromCart: (productId: number) => {
        const { CartProducts } = get();
        const updatedCart = CartProducts.filter((p) => p.id !== productId);
        set({ CartProducts: updatedCart });
        toast.success("Product removed from cart");
      },
    }),
    {
      name: "product-store", // Key for localStorage
      partialize: (state) => ({ CartProducts: state.CartProducts }), // Only persist CartProducts
    }
  )
);
