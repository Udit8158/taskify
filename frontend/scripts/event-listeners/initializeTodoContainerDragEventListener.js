// Toggle 'dragging' class in the each todo container (element actually)
// with drag start and drag end

const initializeTodoContainerDragEventListener = (todoContainers) => {
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

export default initializeTodoContainerDragEventListener;
