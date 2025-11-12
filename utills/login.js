export async function login(email, password) {
  try {
    const res = await fetch("http://localhost:10000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.toLowerCase() ,
        password: password,
      }),
    });
    const data = await res.json()
    return data;
  } catch (err) {
    console.log(err);
  }
}
