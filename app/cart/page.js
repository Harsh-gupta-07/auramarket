"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  fetchCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../utills/cart";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [arrivalDate, setArrivalDate] = useState(null);

  const showMessage = (type, msg) => {
    if (type === "error") {
      setError(msg);
      setTimeout(() => setError(""), 3000);
    } else {
      setSuccess(msg);
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  const loadCart = async () => {
    setLoading(true);
    const data = await fetchCart();
    // console.log(data)
    if (data?.success) {
      setCartItems(data.cart);
      setArrivalDate(data.arrival);
      calculateTotals(data.cart);
    } else {
      showMessage("error", data?.message || "Failed to load cart");
    }
    setLoading(false);
  };

  const calculateTotals = (items) => {
    const sub = items.reduce((acc, item) => {
      const price = item.product.price || 0;
      return acc + (price * item.quantity);
    }, 0);
    setSubtotal(sub);
    setTotal(sub + 2);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = async (productId) => {
    const res = await removeFromCart(productId);
    if (res?.success) {
      showMessage("success", "Item removed from cart");
      loadCart();
    } else {
      showMessage("error", res?.message || "Failed to remove item");
    }
  };

  const handleIncrease = async (productId) => {
    // console.log(productId)
    const res = await increaseQuantity(productId);
    if (res?.success) {
      loadCart();
    } else {
      showMessage("error", res?.message || "Failed to increase quantity");
    }
  };

  const handleDecrease = async (productId) => {
    const res = await decreaseQuantity(productId);
    if (res?.success) {
      loadCart();
    } else {
      showMessage("error", res?.message || "Failed to decrease quantity");
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="w-full pt-25 px-6 py-10 max-w-7xl mx-auto relative">
      <div className="toast toast-top toast-end z-50">
        {error && (
          <div className="alert alert-error text-white">
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="alert alert-success text-white">
            <span>{success}</span>
          </div>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-8">Cart</h1>
          <p className="text-lg text-gray-500">Your cart is empty.</p>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-8">Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              {cartItems.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row gap-6 pb-6 border-b"
                >
                  <div className="w-40 h-40 bg-base-200 rounded-xl overflow-hidden">
                    <img
                      src={
                        item.product.image
                      }
                      className="w-full h-full object-cover"
                      alt={item.product.name}
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-orange-500 font-semibold">
                      Estimated arrival {arrivalDate ? new Date(arrivalDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "Loading..."}
                    </p>

                    <h2 className="text-xl font-semibold mt-1">
                      {item.product.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {item.product.category}
                    </p>

                    <div className="mt-3 flex items-center gap-10">
                      <div>
                        <p className="text-sm font-medium">Quantity</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            className="btn btn-xs btn-outline rounded-full"
                            onClick={() => handleDecrease(item.id)}
                          >
                            −
                          </button>
                          <span className="text-lg">{item.quantity}</span>
                          <button
                            className="btn btn-xs btn-outline rounded-full"
                            onClick={() => handleIncrease(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <p className="text-lg font-semibold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      className="btn btn-ghost hover:bg-white btn-sm btn-circle hover:scale-110 transition-all duration-200"
                      onClick={() => handleRemove(item.id)}
                    >
                      <Image
                        src="/trash.svg"
                        width={20}
                        height={20}
                        alt="delete"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border rounded-xl p-6 h-fit space-y-5 bg-white">
              <h2 className="text-xl font-semibold">Summary</h2>

              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Estimated Delivery &amp; Handling</span>
                <span className="font-medium">$2.00</span>
              </div>

              <div className="divider m-0"></div>

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button className="btn btn-neutral w-full text-white mt-4 rounded-full">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}