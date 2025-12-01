export async function userInfo() {
  try {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined") {
      return { success: false, login: false, message: "Please login to view your profile" };
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (
      data?.message === "Authorization header missing" ||
      data?.message === "Invalid or expired token" ||
      data?.message === "User record not found"
    ) {
      localStorage.removeItem("token");
      return { success: false, login: false, message: data.message };
    }
    const { token: returnedToken, ...rest } = data;
    if (returnedToken) {
      localStorage.setItem("token", returnedToken);
    }
    return { ...rest, login: true };
  } catch (err) {
    return { success: false, login: true, message: err.message }
  }
}

export async function changeDefaultAddress(id) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, message: "Please login to continue" };
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address/default`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ addressId: id }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return { success: false, message: err.message };
  }
}


export async function updateProfile(data) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, message: "Please login to continue" };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { success: false, message: "Invalid email address" };
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: data.name, email: data.email }),
    });
    const raw = await res.json();
    return raw;
  } catch (err) {
    return { success: false, message: err.message };
  }
}

export async function addAddress(data) {
  console.log(data)
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, message: "Please login to continue" };
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const raw = await res.json();
    return raw;
  } catch (err) {
    return { success: false, message: err.message };
  }
}

export async function removeAddress(id) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, message: "Please login to continue" };
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address/remove`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ addressId: id }),
    });
    const raw = await res.json();
    return raw;
  } catch (err) {
    return { success: false, message: err.message };
  }
}

export async function editAddress(data) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, message: "Please login to continue" };
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const raw = await res.json();
    return raw;
  } catch (err) {
    return { success: false, message: err.message };
  }
}