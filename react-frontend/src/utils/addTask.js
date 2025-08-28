async function addTask({ title, difficulty, state }) {
  const reqBody = {
    title,
    description: "Add some description for your task",
    state,
    difficulty,
  };
  try {
    const url = import.meta.env.VITE_API_URL + "/tasks";
    const res = await fetch(
      url,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": JSON.parse(localStorage.getItem("auth-token")),
        },
        body: JSON.stringify(reqBody),
      }
    );

    console.log(res);
    if (res.ok) {
      const data = await res.json();
    }
  } catch (error) {
    console.log(error);
  }
}

export { addTask };
