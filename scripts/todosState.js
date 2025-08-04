const todosState = localStorage.getItem("todosState")
  ? JSON.parse(localStorage.getItem("todosState"))
  : [];
console.log(todosState);

class Todo {
  constructor(title, description, difficulty, state) {
    this.id = String(Math.random());
    this.todoTitle = title;
    this.todoDescription = description;
    this.todoDifficulty = difficulty;
    this.todoState = state;
    this.createdTime = new Date();
  }
}

export { todosState, Todo };
