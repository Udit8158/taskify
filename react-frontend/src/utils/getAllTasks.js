async function getAllTasks() {
  try {
    const res = await fetch("http://127.0.0.1:3000/tasks", {
      method: "GET",
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("auth-token")),
      },
    });

    const data = await res.json();
    if (res.ok) return { tasks: data.tasks, error: false };
    else return { error: true };
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}

export default getAllTasks;
