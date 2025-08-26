async function updateTask({ id, title, description, state, difficulty }) {
  try {
    const url = `http://127.0.0.1:3000/task/${id}`;
    const authToken = JSON.parse(localStorage.getItem("auth-token"));
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({ title, description, state, difficulty }),
    });

    const data = await res.json();

    if (res.ok) return { data, error: false };
    else return { error: data };
  } catch (error) {
    console.log(error);
  }
}

export { updateTask };
