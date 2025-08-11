import { showAlert } from "../components/alert.js";

const initializeAddTodoEventListener = (apiUrl, authToken, getAllTodos) => {
  try {
    const todoForm = document.getElementById("todoForm");
    todoForm.addEventListener("submit", async (e) => {
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

      // create a todo and post in server
      const todo = {
        title: todoTitle,
        description: todoDescription,
        difficulty: todoDifficulty,
        state: "todo",
      };
      const response = await fetch(`${apiUrl}/tasks`, {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "auth-token": authToken,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data, response);

      // fetch from server
      getAllTodos(); // it will re-render

      form.reset(); // clear the form
    });
  } catch (error) {
    console.log("In error");
    showAlert("Error occurred");
    console.log(error);
  }
};

export default initializeAddTodoEventListener;
