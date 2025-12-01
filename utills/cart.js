export async function addToCart(productId, quantity = 1) {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            return { success: false, message: "Please login to continue" };
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ productId, quantity }),
        });
        const data = await res.json();
        return data;
    } catch (err) {
        return { success: false, message: err.message };
    }
}

export async function removeFromCart(cartID) {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            return { success: false, message: "Please login to continue" };
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/remove`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ cartID }),
        });
        const data = await res.json();
        return data;
    } catch (err) {
        return { success: false, message: err.message };
    }
}

export async function increaseQuantity(cartID) {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            return { success: false, message: "Please login to continue" };
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/increase`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ cartID }),
        });
        const data = await res.json();
        return data;
    } catch (err) {
        return { success: false, message: err.message };
    }
}

export async function decreaseQuantity(cartID) {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            return { success: false, message: "Please login to continue" };
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/decrease`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ cartID }),
        });
        const data = await res.json();
        return data;
    } catch (err) {
        return { success: false, message: err.message };
    }
}

export async function fetchCart() {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            return { success: false, message: "Please login to continue" };
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/get`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        // console.log(data);
        return data;
    } catch (err) {
        return { success: false, message: err.message };
    }
}
