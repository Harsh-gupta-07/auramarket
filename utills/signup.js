export async function signup(name, email, password) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email.toLowerCase(),
        password: password,
      }),
    });
    const data = await res.json()
    return data;
  } catch (err) {

    console.log(err);
    return {status:"failed", message: "Server Error"}
  }
}
