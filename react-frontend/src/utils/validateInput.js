function validateInput(inputField, inputValue) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  switch (inputField) {
    case "name":
      if (inputValue.length < 3) return "Name lenght should be 3 or more";
      break;
    case "email":
      if (inputValue.length < 5) return "Email length should be 5 or more";
      if (!emailRegex.test(inputValue)) return "Email is not valid";
      break;

    case "password":
      if (inputValue.length < 5) return "Password length should be 5 or more";
      break;

    default:
      return null;
  }
}

export { validateInput };
