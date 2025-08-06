import todoComponent from "./todocomponent.js";
import { Todo, todosState } from "./todosState.js";
import { showAlert } from "./alert.js";

const render = (state) => {
  console.log("rendering", state); // just to confirm

  const todosContainer = document.getElementById("todos");
  const progressTasksContainer = document.getElementById("progressTasks");
  const reviewTaskContainer = document.getElementById("reviewTasks");
  const finishedTaskContainer = document.getElementById("finishedTasks");

  todosContainer.innerHTML = "";
  progressTasksContainer.innerHTML = "";
  reviewTaskContainer.innerHTML = "";
  finishedTaskContainer.innerHTML = "";

  state.forEach((element) => {
    todoComponent(element);
  });

  // For drag and drop
  const todoContainers = document.querySelectorAll(".todo-container"); // dynamic

  initializeTodoContainerDragEventListeners(todoContainers); // we have to initialize event listeners on the new items. (basically multiple time as the elements are changing)

  const deleteTodoBtns = document.querySelectorAll(".deleteTodoIcon");
  todosState.length != 0 && initializeDeleteTodoEventLister(deleteTodoBtns);
};

const initializeTodoContainerDragEventListeners = (todoContainers) => {
  todoContainers.forEach((element) => {
    element.addEventListener("dragstart", () => {
      element.classList.add("dragging");
      console.log("dragging", element);
    });

    element.addEventListener("dragend", (event) => {
      element.classList.remove("dragging");
      console.log("drag end", element);
    });
  });
};
const updateCategoryContainer = (container, draggingElId) => {
  switch (container.id) {
    case "progressContainer":
      // update todo state (progress/todo etc)
      todosState.map((todo) => {
        if (todo.id == draggingElId) {
          todo.todoState = "progress";
        }
      });
      console.log(todosState);
      render(todosState);
      break;
    case "todosContainer":
      // update todo state (progress/todo etc)
      todosState.map((todo) => {
        if (todo.id == draggingElId) {
          todo.todoState = "todo";
        }
      });
      console.log(todosState);
      render(todosState);
      break;
    case "reviewContainer":
      // update todo state (progress/todo etc)
      todosState.map((todo) => {
        if (todo.id == draggingElId) {
          todo.todoState = "review";
        }
      });
      console.log(todosState);
      render(todosState);
      break;
    case "finishedTaskContainer":
      // update todo state (progress/todo etc)
      todosState.map((todo) => {
        if (todo.id == draggingElId) {
          todo.todoState = "finished";
        }
      });
      console.log(todosState);
      render(todosState);
      break;

    default:
      break;
  }
  localStorage.setItem("todosState", JSON.stringify(todosState));
};

const initializeCategoryDropEventListeners = (updateCategoryContainer) => {
  const categoryContainers = document.querySelectorAll(".category-container");
  // Where we are gonna stop dragging (drop) - the container
  categoryContainers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      e.preventDefault(); // to allow drop only
      container.classList.add("dragging-over");
    });

    container.addEventListener("dragleave", () => {
      container.classList.remove("dragging-over");
    });

    container.addEventListener("drop", () => {
      console.log("dropped");
      container.classList.remove("dragging-over");
      const draggingEl = document.querySelector(".dragging");
      const draggingElId = draggingEl.id;

      updateCategoryContainer(container, draggingElId);
    });
  });
};

const initializeDeleteTodoEventLister = (targetedBtns) => {
  targetedBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (e) => {
      console.log("delete trigger");
      const parentTodoContainer = e.target.closest(".todo-container"); // give directly the todo-container of this image
      // console.log(parentTodoContainer)
      // change state
      const deleteIndex = todosState.findIndex(
        (todo) => todo.id == parentTodoContainer.id
      );
      todosState.splice(deleteIndex, 1);
      localStorage.setItem("todosState", JSON.stringify(todosState));
      // render
      render(todosState);
    });
  });
};

const initializeAddTodoEventListener = () => {
  const todoForm = document.getElementById("todoForm");
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent from submission

    // Get the form element
    const form = e.target;
    const formData = new FormData(form);

    // Extract form data
    const todoTitle = formData.get("todoTittleInput");
    const todoDescription = formData.get("todoDescriptionInput");
    const todoDifficulty = formData.get("todoDifficultyLevel");

    // checking the user input
    if (!todoTitle) {
      // alert("Please give a todo title");
      showAlert("Please give a todo title");
      return;
    }
    if (!todoDescription) {
      showAlert("Please give a todo description");
      return;
    }
    if (todoDifficulty === "null") {
      showAlert("Please select the todo difficulty");
      return;
    }

    const todo = new Todo(todoTitle, todoDescription, todoDifficulty, "todo");

    // add in state and render
    todosState.push(todo);
    localStorage.setItem("todosState", JSON.stringify(todosState));
    render(todosState);
    form.reset(); // clear the form
  });
};

const initializeToggleTodosEventListener = () => {
  const toggleBtns = document.querySelectorAll(".toggleTodos");
  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const mainParentEl = btn.parentElement.parentElement;
      const todoContainer = mainParentEl.children[1]; // hard coded (need to change if DOM changes)

      // check if this category has todos
      const isEmpty = todoContainer.children.length === 0;
      if (isEmpty) return; // pass this do nothing

      // if not empty then toggle the class
      if (!todoContainer.classList.contains("hide")) {
        todoContainer.classList.add("hide");
        btn.style.transform = "rotate(90deg)";
      } else {
        todoContainer.classList.remove("hide");
        btn.style.transform = "rotate(0)";
      }
    });
  });
};
render(todosState);
initializeAddTodoEventListener(); // in a static element
initializeCategoryDropEventListeners(updateCategoryContainer); // in a static element
initializeToggleTodosEventListener();
