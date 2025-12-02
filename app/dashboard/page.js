"use client";
import React, { useEffect, useState } from "react";
import { fetchAdminOrders, updateOrderStatus } from "@/utills/admin";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [alertInfo, setAlertInfo] = useState({ show: false, message: "", type: "" });
    const router = useRouter();

    useEffect(() => {
        loadOrders();
    }, [page]);

    useEffect(() => {
        if (alertInfo.show) {
            const timer = setTimeout(() => {
                setAlertInfo({ ...alertInfo, show: false });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alertInfo.show]);

    const loadOrders = async () => {
        setLoading(true);
        const data = await fetchAdminOrders(page);
        if (data.status === "success") {
            setOrders(data.orders);
        } else {
            console.error(data.message);
            if (data.message === "Access denied" || data.message === "Please login to continue" || data.message === "Unauthorized") {
                setAlertInfo({ show: true, message: "Access Denied: You do not have permission to view this page.", type: "error" });
                setTimeout(() => router.push("/"), 1000);
            } else {
                setAlertInfo({ show: true, message: "Failed to fetch orders: " + data.message, type: "error" });
            }
        }
        setLoading(false);
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        const data = await updateOrderStatus(orderId, newStatus);
        if (data.status === "success") {
            setOrders(orders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
            setAlertInfo({ show: true, message: "Order status updated successfully!", type: "success" });
        } else {
            setAlertInfo({ show: true, message: "Failed to update status: " + data.message, type: "error" });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8 relative pt-24">
            {alertInfo.show && (
                <div className="toast toast-top toast-end z-50">
                    <div className={`alert ${alertInfo.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                        <span>{alertInfo.message}</span>
                    </div>
                </div>
            )}
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                #{order.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{order.user?.name || "N/A"}</div>
                                                <div className="text-sm text-gray-500">{order.user?.email || "N/A"}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                        order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                                                            order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                                                'bg-yellow-100 text-yellow-800'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <select
                                                    value={order.status}
                                                    disabled={order.status === "Delivered" || order.status === "Cancelled"}
                                                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                                    className={`block w-full pl-3 pr-10 py-2 text-base bg-gray-100 cursor-pointer border-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md ${order.status === "Delivered" || order.status === "Cancelled" ? "opacity-50 cursor-not-allowed" : ""}`}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="In Transit">In Transit</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="flex-1 flex justify-between sm:justify-end">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setPage(p => p + 1)}
                                    disabled={orders.length < 15}
                                    className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${orders.length < 15 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
