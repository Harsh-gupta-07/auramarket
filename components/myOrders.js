import React from "react";
import { FaTrash, FaHeart } from "react-icons/fa";

function MyOrders() {
  const orders = [
    {
      id: 1,
      name: "Nike Air Force 1 Mid '07",
      category: "Men's Shoes",
      size: 10,
      quantity: 2,
      price: 98.3,
      status: "Estimated arrival 24 Sep 2025",
      statusColor: "text-warning",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp", // Placeholder
    },
    {
      id: 2,
      name: "Air Max 1 '86 Original",
      category: "Men's Shoes",
      size: 10,
      quantity: 2,
      price: 104.26,
      status: "Delivered on 04 August",
      statusColor: "text-success",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp", // Placeholder
    },
    {
      id: 3,
      name: "Nike Air Force 1 Low Retro",
      category: "Men's Shoes",
      size: 8,
      quantity: 1,
      price: 185.67,
      status: "Delivered on 04 August",
      statusColor: "text-success",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp", // Placeholder
    },
  ];

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex flex-col md:flex-row gap-6 p-4 bg-white rounded-lg"
        >
          <div className="w-32 h-32 bg-base-200 rounded-lg flex-shrink-0 overflow-hidden">
            <img
              src={order.image}
              alt={order.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <p className={`text-sm font-medium mb-1 ${order.statusColor}`}>
                {order.status}
              </p>
              <h3 className="text-lg font-bold mb-1">{order.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{order.category}</p>
              <div className="flex gap-4 text-sm">
                <p>
                  <span className="text-gray-500">Size</span>{" "}
                  <span className="font-bold">{order.size}</span>
                </p>
                <p>
                  <span className="text-gray-500">Quantity</span>{" "}
                  <span className="font-bold">{order.quantity}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-row md:flex-col justify-between items-end md:items-end">
              <p className="text-lg font-bold">${order.price.toFixed(2)}</p>
              <button className="btn btn-neutral btn-sm text-neutral bg-white gap-2 normal-case font-medium hover:bg-neutral/10">
                <FaTrash size={14} /> Cancel Order
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
