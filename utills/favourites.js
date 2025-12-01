export async function addToFavourites(productId) {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            return { success: false, message: "Please login to continue" };
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ productId }),
        });
        const data = await res.json();
        return data;
    } catch (err) {
        return { success: false, message: err.message };
    }
}

export async function removeFromFavourites(productId) {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            return { success: false, message: "Please login to continue" };
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/remove`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ productId }),
        });
        const data = await res.json();
        return data;
    } catch (err) {
        return { success: false, message: err.message };
    }
}

export async function checkFavouriteStatus(productId) {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            return { success: false, message: "Please login to continue" };
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/check/${productId}`, {
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
