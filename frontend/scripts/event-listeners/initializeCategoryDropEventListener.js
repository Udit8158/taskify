const initializeCategoryDropEventListener = (updateCategoryContainer) => {
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

export default initializeCategoryDropEventListener;
