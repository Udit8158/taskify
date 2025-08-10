// const todosState = localStorage.getItem("todosState")
//   ? JSON.parse(localStorage.getItem("todosState"))
//   : [];
// console.log(todosState);

// class Todo {
//   constructor(title, description, difficulty, state) {
//     this.id = String(Math.random());
//     this.todoTitle = title;
//     this.todoDescription = description;
//     this.todoDifficulty = difficulty;
//     this.todoState = state;
//     this.createdTime = new Date();
//   }
// }

let todosState = [];

const fetchTodos = async () => {
  const response = await fetch("http://127.0.0.1:3000/tasks", {
    method: "GET",
    headers: {
      "auth-token": localStorage.getItem("auth-token"),
    },
  });
  const data = await response.json();
  console.log(data);
  todosState = data.tasks
  console.log(todosState)
};

window.onload = fetchTodos;

export { todosState };
