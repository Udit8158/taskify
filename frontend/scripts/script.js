import todoComponent from "./components/todoComponent.js";
import { showAlert } from "./components/alert.js";
import authComponent from "./components/authComponent.js";
import initializeTodoContainerDragEventListener from "./event-listeners/initializeTodoContainerDragEventListener.js";
import initializeDeleteTodoEventLister from "./event-listeners/initializeDeleteTodoEventLister.js";
import initializeCategoryDropEventListener from "./event-listeners/initializeCategoryDropEventListener.js";
import initializeToggleTodosEventListener from "./event-listeners/initializeToggleTodosEventListener.js";
import initializeAddTodoEventListener from "./event-listeners/initializeAddTodoEventListener.js";

// Global variables
let todosState = [];
const apiUrl = "http://127.0.0.1:3000";

const getAllTodos = async () => {
  const response = await fetch("http://127.0.0.1:3000/tasks", {
    method: "GET",
    headers: {
      "auth-token": authToken,
    },
  });
  const data = await response.json();
  console.log(data);
  todosState = data.tasks;
  console.log(todosState);

  renderTodos(todosState);
};

window.onload = getAllTodos;

const renderTodos = (state) => {
  console.log("rendering", state); // just to confirm

  // grabbign the different category containers
  const todosContainer = document.getElementById("todos");
  const progressTasksContainer = document.getElementById("progressTasks");
  const reviewTaskContainer = document.getElementById("reviewTasks");
  const finishedTaskContainer = document.getElementById("finishedTasks");

  // removing the innerhtml of those containers while rendering
  todosContainer.innerHTML = "";
  progressTasksContainer.innerHTML = "";
  reviewTaskContainer.innerHTML = "";
  finishedTaskContainer.innerHTML = "";

  // now rendering the each todo component with the todos
  state.forEach((element) => {
    todoComponent(element);
  });

  // For drag and drop
  const todoContainers = document.querySelectorAll(".todo-container"); // dynamic
  initializeTodoContainerDragEventListener(todoContainers);
  // we have to initialize event listeners on the new items.
  // (basically multiple time as the elements are changing)

  // for delete the specific todo
  const deleteTodoBtns = document.querySelectorAll(".deleteTodoIcon");
  todosState.length != 0 &&
    initializeDeleteTodoEventLister(
      deleteTodoBtns,
      apiUrl,
      authToken,
      getAllTodos
    );
};

// NOTE: This shouldn't be defined here, but I have to 
const updateCategoryContainer = (container, draggingElId) => {
  switch (container.id) {
    case "progressContainer":
      // update todo state (progress/todo etc)
      todosState.map(async (todo) => {
        if (todo._id == draggingElId) {
          const response = await fetch(`${apiUrl}/task/${todo._id}`, {
            method: "PUT",
            headers: {
              "auth-token": authToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: todo.title,
              description: todo.description,
              difficulty: todo.difficulty,
              state: "progress",
            }),
          });

          const data = await response.json();
          getAllTodos();
        }
      });
      break;
    case "todosContainer":
      // update todo state (progress/todo etc)
      todosState.map(async (todo) => {
        if (todo._id == draggingElId) {
          const response = await fetch(`${apiUrl}/task/${todo._id}`, {
            method: "PUT",
            headers: {
              "auth-token": authToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: todo.title,
              description: todo.description,
              difficulty: todo.difficulty,
              state: "todo",
            }),
          });

          const data = await response.json();
          getAllTodos();
        }
      });
      break;
    case "reviewContainer":
      // update todo state (progress/todo etc)
      todosState.map(async (todo) => {
        if (todo._id == draggingElId) {
          const response = await fetch(`${apiUrl}/task/${todo._id}`, {
            method: "PUT",
            headers: {
              "auth-token": authToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: todo.title,
              description: todo.description,
              difficulty: todo.difficulty,
              state: "review",
            }),
          });

          const data = await response.json();
          getAllTodos();
        }
      });

      break;
    case "finishedTaskContainer":
      // update todo state (progress/todo etc)
      todosState.map(async (todo) => {
        if (todo._id == draggingElId) {
          const response = await fetch(`${apiUrl}/task/${todo._id}`, {
            method: "PUT",
            headers: {
              "auth-token": authToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: todo.title,
              description: todo.description,
              difficulty: todo.difficulty,
              state: "finished",
            }),
          });

          const data = await response.json();
          getAllTodos();
        }
      });

      break;

    default:
      break;
  }
};

// if auth token is not there means not signed in
// so display only the auth component
// means signup signin pages only
const authToken = localStorage.getItem("auth-token");
const todoFormContainer = document.querySelector(".todo-form-container");
const appContainer = document.querySelector(".app-container");

if (!authToken) {
  const isSignupMode = false; // my choice first show signup

  todoFormContainer.classList.add("hide");
  appContainer.classList.add("hide");
  authComponent(isSignupMode);
} else {
  todoFormContainer.classList.remove("hide");
  appContainer.classList.remove("hide");
  // if user have the auth token then only display todos
  renderTodos(todosState);

  // All the event listeners related to todos and main app section
  initializeAddTodoEventListener(apiUrl, authToken, getAllTodos);

  // in a static element
  initializeCategoryDropEventListener(updateCategoryContainer); // in a static element
  initializeToggleTodosEventListener();
}

