const selectParentElementOfTodo = (
  todo,
  todosContainer,
  progressTasksContainer,
  reviewTasksContainer,
  finishedTaskContainer
) => {
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

  return parentEl;

  // basically settting the parentEl value by the todo's state
};

export default selectParentElementOfTodo;
