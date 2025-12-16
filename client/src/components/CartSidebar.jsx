import React from "react";
import { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import pizzaImg from "../assets/pizza.png";
const CartSidebar = ({ isOpen, onClose }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data);
    } catch (err) {
      console.error(err);
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      const res = await api.put(`/cart/item/${itemId}`, {
        quantity: newQuantity,
      });
      setCart(res.data); // Use fresh data from server
      toast.success("Quantity updated");
    } catch (err) {
      console.error("Update error:", err.response || err);
      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again");
        // Optional: navigate("/login")
      } else if (err.response?.status === 404) {
        toast.error("Item not found — refreshing cart");
        fetchCart(); // Refresh to sync
      } else {
        toast.error("Failed to update quantity");
      }
    }
  };

  const removeItem = async (itemId) => {
    try {
      const res = await api.delete(`/cart/item/${itemId}`);
      setCart(res.data);
      toast.success("Item removed");
    } catch (err) {
      console.error("Remove error:", err.response || err);
      if (err.response?.status === 404) {
        toast.error("Item already removed — refreshing");
        fetchCart();
      } else if (err.response?.status === 401) {
        toast.error("Please login again");
      } else {
        toast.error("Failed to remove item");
      }
    }
  };
  if (!isOpen) return null;

  const total =
    cart?.items?.reduce(
      (sum, item) => sum + item.quantity * Number(item.price_at_add),
      0
    ) || 0;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />

      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-2xl z-50 transform transition-transform">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-3xl font-bold text-white">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-4xl text-gray-400 hover:text-white transition"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <p className="text-center text-gray-400">Loading cart...</p>
          ) : !cart || cart.items?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-2xl text-gray-400 mb-6">Your cart is empty</p>
              <button
                onClick={onClose}
                className="px-8 py-4 bg-orange-500 rounded-full font-bold hover:bg-orange-600 transition"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-gray-800 rounded-2xl p-4"
                >
                  <img
                    src={item.product.image_url || pizzaImg}
                    alt={item.product.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">
                      {item.product.name}
                    </h3>
                    <p className="text-orange-500 font-semibold">
                      ${Number(item.price_at_add).toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-end">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-400 text-xl"
                    >
                      ×
                    </button>
                    <div className="flex items-center gap-3 text-white">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 bg-gray-700 rounded-full hover:bg-gray-600"
                      >
                        -
                      </button>
                      <span className="text-lg font-bold w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 bg-gray-700 rounded-full hover:bg-gray-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart && cart.items?.length > 0 && (
          <div className="border-t border-gray-800 p-6">
            <div className="flex justify-between text-2xl font-bold text-white mb-6">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="w-full py-4 bg-orange-500 rounded-full text-xl font-bold hover:bg-orange-600 transition">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default CartSidebar;
