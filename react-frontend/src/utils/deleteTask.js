async function deleteTask(id) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/task/${id}`;
    const authToken = JSON.parse(localStorage.getItem("auth-token"));
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });

    const data = await res.json();

    if (res.ok) return { data, error: false };
    else return { error: data };
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export { deleteTask };
