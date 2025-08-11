const selectSpanId = (todo) => {
  let spanId = "";
  switch (todo.difficulty) {
    case "easy":
      spanId = "easyTodoSpan";
      break;
    case "medium":
      spanId = "mediumTodoSpan";
      break;
    case "hard":
      spanId = "hardTodoSpan";
      break;

    default:
      break;
  }
  return spanId;
};

export default selectSpanId;
