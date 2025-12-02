"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { userInfo } from "../../utills/user";
import { fetchCart } from "../../utills/cart";
import { placeOrder } from "../../utills/orders";
import { AddressCard } from "../../components/Address";
import Image from "next/image";

export default function CheckoutPage() {
    const router = useRouter();
    const [addresses, setAddresses] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [loading, setLoading] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
        async function init() {
            setLoading(true);
            try {
                const userRes = await userInfo();
                if (!userRes.success || !userRes.login) {
                    router.push("/signin?redirect=/checkout");
                    return;
                }
                setAddresses(userRes.user.addresses || []);

                const defaultAddr = userRes.user.addresses?.find(a => a.isPrimary);
                if (defaultAddr) {
                    setSelectedAddress(defaultAddr);
                } else if (userRes.user.addresses?.length > 0) {
                    setSelectedAddress(userRes.user.addresses[0]);
                }

                const cartRes = await fetchCart();
                if (cartRes.success) {
                    setCartItems(cartRes.cart);
                    calculateTotals(cartRes.cart);
                } else {
                    setError("Failed to load cart");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        init();
    }, [router]);

    const calculateTotals = (items) => {
        const sub = items.reduce((acc, item) => {
            const price = item.product.price || 0;
            return acc + (price * item.quantity);
        }, 0);
        setSubtotal(sub);
        setTotal(sub + 2);
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            setError("Please select a delivery address");
            return;
        }

        setPlacingOrder(true);
        try {
            const res = await placeOrder(selectedAddress.id);
            if (res.success) {
                router.push("/profile?tab=My%20Orders");
            } else {
                setError(res.message || "Failed to place order");
            }
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setPlacingOrder(false);
        }
    };

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
                <h1 className="text-2xl font-bold">Your cart is empty</h1>
                <button onClick={() => router.push("/browse")} className="btn btn-neutral">
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="w-full pt-25 px-6 py-10 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            {error && (
                <div className="alert alert-error text-white mb-6">
                    <span>{error}</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">

                    <section>
                        <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {addresses.map((addr) => (
                                <AddressCard
                                    key={addr.id}
                                    address={addr}
                                    isPrimary={addr.isPrimary}
                                    isSelected={selectedAddress?.id === addr.id}
                                    onSelect={setSelectedAddress}
                                    onSetPrimary={() => { }}
                                    onDelete={() => { }}
                                    onEdit={() => { }}
                                />
                            ))}
                            <button
                                onClick={() => router.push("/profile?tab=Address%20Book")}
                                className="btn btn-outline border-dashed h-auto min-h-[180px] flex flex-col gap-2"
                            >
                                <span className="text-2xl">+</span>
                                <span>Add New Address</span>
                            </button>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                        <div className="space-y-3">
                            <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-black ring-1 ring-black bg-gray-50' : 'border-gray-200'}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="card"
                                    checked={paymentMethod === 'card'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="radio radio-sm checked:bg-black"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold">Credit / Debit Card</p>
                                    <p className="text-sm text-gray-500">Pay securely with your card</p>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                </div>
                            </label>

                            <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-black ring-1 ring-black bg-gray-50' : 'border-gray-200'}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="radio radio-sm checked:bg-black"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold">Cash on Delivery</p>
                                    <p className="text-sm text-gray-500">Pay when your order arrives</p>
                                </div>
                            </label>
                        </div>
                    </section>
                </div>

                <div className="h-fit space-y-6">
                    <div className="border rounded-xl p-6 bg-white shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                        <div className="space-y-3 mb-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-3 text-sm">
                                    <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium line-clamp-1">{item.product.name}</p>
                                        <p className="text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2 text-sm border-t pt-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping & Handling</span>
                                <span className="font-medium">$2.00</span>
                            </div>
                        </div>

                        <div className="divider my-4"></div>

                        <div className="flex justify-between text-lg font-bold mb-6">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            disabled={placingOrder}
                            className="btn btn-neutral w-full rounded-full text-white"
                        >
                            {placingOrder ? <span className="loading loading-spinner"></span> : `Pay $${total.toFixed(2)}`}
                        </button>

                        <p className="text-xs text-center text-gray-500 mt-4">
                            By placing your order, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
