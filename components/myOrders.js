import React from "react";
import { FaTrash, FaHeart } from "react-icons/fa";

function MyOrders({ orders }) {
  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex flex-col md:flex-row gap-6 p-4 bg-white rounded-lg"
        >
          <div className="w-32 h-32 bg-base-200 rounded-lg flex-shrink-0 overflow-hidden">
            <img
              src={order.product.image}
              alt={order.product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <p className={`text-sm font-medium mb-1 ${order.status == "Pending" ? "text-yellow-400" : order.status == "Delivered" ? "text-green-400" : "text-red-400"}`}>
                {order.status}
              </p>
              <h3 className="text-lg font-bold mb-1">{order.product.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{order.product.category}</p>
              <div className="flex gap-4 text-sm">
                <p>
                  <span className="text-gray-500">Quantity</span>{" "}
                  <span className="font-bold">{order.quantity}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-row md:flex-col justify-between items-end md:items-end">
              <p className="text-lg font-bold">${order.product.price.toFixed(2)}</p>
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
