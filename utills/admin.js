export async function fetchAdminOrders(page) {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            return { success: false, message: "Please login to continue" };
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/orders?page=${page}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        return data;
    } catch (err) {
        return { success: false, message: err.message };
    }
}

export async function updateOrderStatus(orderId, status) {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            return { success: false, message: "Please login to continue" };
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/order/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ orderId, status }),
        });
        const data = await res.json();
        return data;
    } catch (err) {
        return { success: false, message: err.message };
    }
}
