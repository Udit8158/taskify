async function addTask({ title, difficulty }) {
  const reqBody = {
    title,
    description: "Add some description for your task",
    state: "todo",
    difficulty,
  };
  try {
    const res = await fetch(
      "http://127.0.0.1:3000/tasks",

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
