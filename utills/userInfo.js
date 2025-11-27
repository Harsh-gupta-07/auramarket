export  async function userInfo() {
  try {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined") {
      return { success: false, login: false, message: "Please login to view your profile" };
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    // console.log(data) 
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
    return {...rest, login: true};
  } catch (err) {
    return {success:false,login: true, message: err.message}
  }
}

export async function getOrders () {
  try {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined") {
      return { success: false, login: false, message: "Please login to view your orders" };
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data)
    if (data?.message === "Authorization header missing" ||
      data?.message === "Invalid or expired token" ||
      data?.message === "User record not found"
    ) {
      localStorage.removeItem("token");
      return { success: false, login: false, message: data.message };
    }
    return {success:true, login: true, data: data}
  } catch (err) {
    return {success:false,login: true, message: err.message}
  }
}
