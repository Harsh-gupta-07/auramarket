import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { cancelOrder } from "../utills/orders";

function MyOrders({ orders: initialOrders }) {
  const [orders, setOrders] = useState(initialOrders);
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState("");
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  const openCancelModal = (orderId) => {
    setOrderToCancel(orderId);
    setCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setCancelModalOpen(false);
    setOrderToCancel(null);
  };

  const handleConfirmCancel = async () => {
    if (!orderToCancel) return;

    setLoadingId(orderToCancel);
    setError("");
    closeCancelModal();

    try {
      const res = await cancelOrder(orderToCancel);
      if (res.success) {
        setOrders(orders.map(order =>
          order.id === orderToCancel ? { ...order, status: "Cancelled" } : order
        ));
      } else {
        setError(res.message || "Failed to cancel order");
        setTimeout(() => setError(""), 3000);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6 relative">
      {error && (
        <div className="alert alert-error text-white fixed top-20 right-4 z-50 w-auto">
          <span>{error}</span>
        </div>
      )}

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
              <p className={`text-sm font-medium mb-1 ${order.status === "Pending" ? "text-yellow-500" :
                order.status === "Delivered" ? "text-green-500" :
                  order.status === "Cancelled" ? "text-red-500" : "text-blue-500"
                }`}>
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

              {order.status !== "Cancelled" && order.status !== "Delivered" && (
                <button
                  onClick={() => openCancelModal(order.id)}
                  disabled={loadingId === order.id}
                  className="btn btn-neutral btn-sm text-neutral bg-white gap-2 normal-case font-medium hover:bg-neutral/10 border-gray-200"
                >
                  {loadingId === order.id ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <FaTrash size={14} />
                  )}
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {cancelModalOpen && (
        <dialog className="modal modal-open bg-white">
          <div className="modal-box bg-white">
            <h3 className="font-bold text-lg">Cancel Order</h3>
            <p className="py-4">Are you sure you want to cancel this order? This action cannot be undone.</p>
            <div className="modal-action">
              <button className="btn" onClick={closeCancelModal}>No, Keep it</button>
              <button className="btn btn-error text-white" onClick={handleConfirmCancel}>Yes, Cancel Order</button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={closeCancelModal}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}

export default MyOrders;
