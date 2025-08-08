const authComponent = (isSignup) => {
  const body = document.body;
  // console.log("auth component", isSignup); // debug

  // create the element which is gonna append in body
  const sectionEl = document.createElement("section");
  sectionEl.classList.add("authform-container");

  // creating structure
  const divEl = document.createElement("div");

  let nameInputEl = document.createElement("input");
  if (isSignup) {
    nameInputEl.type = "text";
    nameInputEl.id = "inputName";
    nameInputEl.placeholder = "Enter your name";
  }

  const emailInputEl = document.createElement("input");
  emailInputEl.type = "text";
  emailInputEl.id = "inputEmail";
  emailInputEl.placeholder = "Enter your email";

  const passwordInputEl = document.createElement("input");
  passwordInputEl.type = "text";
  passwordInputEl.id = "inputPassword";
  passwordInputEl.placeholder = "Enter your password";

  if (isSignup) {
    divEl.append(nameInputEl, emailInputEl, passwordInputEl);
  } else {
    divEl.append(emailInputEl, passwordInputEl);
  }

  const btnEl = document.createElement("button");
  btnEl.classList.add("btn");

  const divParentSpanEl = document.createElement("div")
  const spanEl = document.createElement("span");
  divParentSpanEl.appendChild(spanEl)

  // Dynamically render the span element and btn text
  if (isSignup) {
    btnEl.id = "signupBtn";
    btnEl.innerText = "Sign Up";
    spanEl.innerText = "Already have an account?";
  } else {
    btnEl.id = "signinBtn";
    btnEl.innerText = "Sign In";
    spanEl.innerText = "Create a new account!";
  }

  // append all the pieces
  sectionEl.append(divEl, btnEl, divParentSpanEl);
  body.appendChild(sectionEl);

  // toggle is signup mode in between this element only
  // no global state change required
  spanEl.addEventListener("click", () => {
    if (isSignup === true) {
      isSignup = false;
    } else {
      isSignup = true;
    }

    // remove the old section and rerender the whole 
    // component with new state (in component state)
    body.removeChild(sectionEl);
    authComponent(isSignup);
  });
};

export default authComponent;
