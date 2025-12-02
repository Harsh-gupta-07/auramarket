export async function placeOrder(addressID) {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            return { success: false, message: "Please login to continue" };
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ addressID }),
        });
        const data = await res.json();
        return data;
    } catch (err) {
        return { success: false, message: err.message };
    }
}

export async function cancelOrder(orderId) {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            return { success: false, message: "Please login to continue" };
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/cancel`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ orderId }),
        });
        const data = await res.json();
        return data;
    } catch (err) {
        return { success: false, message: err.message };
    }
}
