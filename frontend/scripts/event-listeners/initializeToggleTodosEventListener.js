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

export default initializeToggleTodosEventListener