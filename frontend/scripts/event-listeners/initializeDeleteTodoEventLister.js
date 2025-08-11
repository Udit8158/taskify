// grabbing the delete btn and send a delete request with the task id
// then fetch back all the todos
// and the fetch back func - getAllTodos - we are rendering all the todos again

const initializeDeleteTodoEventLister = (
  targetedBtns,
  apiUrl,
  authToken,
  getAllTodos
) => {
  targetedBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", async (e) => {
      console.log("delete trigger");
      const parentTodoContainer = e.target.closest(".todo-container"); // give directly the todo-container of this image
      // console.log(parentTodoContainer)
      // change state

      // Delete todo in server
      const response = await fetch(
        `${apiUrl}/task/${parentTodoContainer.id}`,

        {
          method: "DELETE",
          headers: {
            "auth-token": authToken,
          },
        }
      );

      const data = await response.json();

      console.log(data);

      // Fetch all the todos and re-render
      getAllTodos();
    });
  });
};

export default initializeDeleteTodoEventLister;
