const todoComponent = (todo) => {
  const todosContainer = document.getElementById("todos");
  const progressTasksContainer = document.getElementById("progressTasks");
  const reviewTasksContainer = document.getElementById("reviewTasks");
  const finishedTaskContainer = document.getElementById("finishedTasks");

  let parentEl = "";
  switch (todo.todoState) {
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

  // const todoTitleEl = document.createElement('span')
  // todoTitleEl.id = "todoTitle"
  // const todoBodyEl = document.createElement('span')
  // todoBodyEl.id = "todoBody"

  // const todoContainerBottomEl = document.createElement("div")
  // todoContainerBottomEl.id = "todoContainerBottom"
  parentEl.innerHTML += `
        <div class="todo-container" id="${todo.id}" draggable='true'>
          <div style="display: flex; justify-content: space-between; align-items: center;">
        <span id="todoTitle">${todo.todoTitle}</span>
        <img src="./png/x-mark.png" class="deleteTodoIcon" style="width: 15px; padding: 4px" /></div>
          <span id="todoBody">${todo.todoDescription}</span>
          <div id="todoContainerBottom">
            <div id="todoContainerBottomLeft">
              <span>${todo.todoDifficulty}</span>
              <img src="./png/clock.png" style="width: 18px" />
              <span>3 Aug</span>
            </div>
            <div>
              <span>1 hr ago</span>
            </div>
          </div>
        </div>
    `;
};

export default todoComponent;
