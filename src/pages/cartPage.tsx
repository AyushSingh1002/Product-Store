import React from "react";
import { ProductsStore } from "@/store/productStore";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
}

const CartPage = () => {
  const { removeProductFromCart, CartProducts, AddProductToCart} = ProductsStore()


  const handleRemove = (id: number) => {
    removeProductFromCart(id)
  };

  const subtotal = CartProducts.reduce((sum, product) => sum + product.price, 0);
  const tax = subtotal * 0.1; // Example tax
  const shipping = 5; // Flat shipping fee
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

        {CartProducts.length > 0 ? (
          CartProducts.map((product: Product) => (
            <div
              key={product.id}
              className="w-full h-auto mb-6 rounded-2xl bg-gray-50 shadow-md flex flex-col md:flex-row items-center gap-4 p-4"
            >
              <img
                className="h-24 w-auto rounded-lg border-2 border-gray-200"
                src={product.image}
                alt={product.title}
              />
              <div className="flex-1 text-center md:text-left">
                <div className="text-lg font-semibold text-gray-800">{product.title}</div>
                <div className="text-xl font-medium text-gray-600">${product.price.toFixed(2)}</div>
              </div>
              <Button
                onClick={() => AddProductToCart(product)}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-xl shadow-lg"
              >
                Add More
              </Button>
              <Button
                onClick={() => handleRemove(product.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-xl shadow-lg"
              >
                Remove
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 text-lg font-medium">
            Your cart is empty. Start adding products!
          </div>
        )}

        {CartProducts.length > 0 && (
          <div className="bg-gray-50 rounded-2xl shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Cart Totals</h2>
            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-gray-800 font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-600">Tax:</span>
              <span className="text-gray-800 font-semibold">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-600">Shipping:</span>
              <span className="text-gray-800 font-semibold">${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-xl font-bold">
              <span className="text-gray-800">Total:</span>
              <span className="text-gray-800">${total.toFixed(2)}</span>
            </div>
            <Button
              onClick={() => alert("Proceeding to checkout...")}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl shadow-lg"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
