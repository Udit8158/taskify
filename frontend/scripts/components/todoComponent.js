import selectParentElementOfTodo from "../utils/selectParentElementOfTodo.js";
import selectSpanId from "../utils/selectSpanId.js";

const todoComponent = (todo) => {
  // grabbing the category containers
  const todosContainer = document.getElementById("todos");
  const progressTasksContainer = document.getElementById("progressTasks");
  const reviewTasksContainer = document.getElementById("reviewTasks");
  const finishedTaskContainer = document.getElementById("finishedTasks");

  // selecting the category container (parentEl) according to todo's state
  const parentEl = selectParentElementOfTodo(
    todo,
    todosContainer,
    progressTasksContainer,
    reviewTasksContainer,
    finishedTaskContainer
  );

  // selecting the todo difficulty span id according to todoDifficulty
  const spanId = selectSpanId(todo);

  parentEl.innerHTML += `
        <div class="todo-container" id="${todo._id}" draggable="true">
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
