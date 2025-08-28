async function singup(payload) {
  try {
    const url = import.meta.env.VITE_API_URL + "/signup";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    return { res, data };
  } catch (error) {
    console.log(error);
  }
}

export default singup;
