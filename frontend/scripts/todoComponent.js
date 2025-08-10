const todoComponent = (todo) => {
  const todosContainer = document.getElementById("todos");
  const progressTasksContainer = document.getElementById("progressTasks");
  const reviewTasksContainer = document.getElementById("reviewTasks");
  const finishedTaskContainer = document.getElementById("finishedTasks");

  // selecting the category container (parentEl) according to todoState
  let parentEl = "";
  switch (todo.state) {
    case "todo":
      parentEl = todosContainer;
      break;

    case "progress":
      parentEl = progressTasksContainer;
      break;
    case "review":
      parentEl = reviewTasksContainer;
      break;
    case "finished":
      parentEl = finishedTaskContainer;
      break;

    default:
      break;
  }

  // selecting the todo difficulty span id according to todoDifficulty
  let spanId = "";
  switch (todo.difficulty) {
    case "easy":
      spanId = "easyTodoSpan";
      break;
    case "medium":
      spanId = "mediumTodoSpan";
      break;
    case "hard":
      spanId = "hardTodoSpan";
      break;

    default:
      break;
  }

  // const todoTitleEl = document.createElement('span')
  // todoTitleEl.id = "todoTitle"
  // const todoBodyEl = document.createElement('span')
  // todoBodyEl.id = "todoBody"

  // const todoContainerBottomEl = document.createElement("div")
  // todoContainerBottomEl.id = "todoContainerBottom"
  parentEl.innerHTML += `
        <div class="todo-container" id="${todo.id}" draggable="true">
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <span id="todoTitle">${todo.title}</span>
              <img
                src="./png/x-mark.png"
                class="deleteTodoIcon"
                style="width: 15px; padding: 4px"
              />
            </div>
            <span id="todoBody">${todo.description}</span>
            <div id="todoContainerBottom">
              <div id="todoContainerBottomLeft">
                <span id=${spanId} class="todoDifficultySpan">${todo.difficulty}</span>
              </div>
              <div></div>
            </div>
          </div>
    `;
};

export default todoComponent;
