import { Link } from "react-router";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { useState } from "react";
import singup from "../utils/signup";
import signin from "../utils/signin";
import { validateInput } from "../utils/validateInput";
import useAutoHideError from "../hooks/useAutoHideError";

export default function SignUpPage() {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const inputNameErr = validateInput("name", inputName);
  const inputEmailErr = validateInput("email", inputEmail);
  const inputPasswordErr = validateInput("password", inputPassword);

  const { autoHideError, setAutoHideError } = useAutoHideError({ time: 5 });

  async function signUpHandler() {
    // check for not providing any inputs while submitting
    if (
      inputName.length === 0 ||
      inputEmail.length === 0 ||
      inputPassword.length === 0
    ) {
      setAutoHideError("Provide all the details");
      return;
    }

    // check for any input error and proceed if not
    if (!inputNameErr && !inputEmailErr && !inputPasswordErr) {
      const userDetails = {
        name: inputName,
        email: inputEmail,
        password: inputPassword,
      };
      const signup_url = "http://127.0.0.1:3000/signup";
      const { res, data } = await singup(signup_url, userDetails);

      if (res.ok) {
        // if singup well then do sign in
        const signin_url = "http://127.0.0.1:3000/signin";
        const { res, data } = await signin(signin_url, userDetails);

        if (!res.ok) {
          // if sign in problem
          setAutoHideError("Something wrong happened");
        } else {
          // succefull sign up (with sign in)
          localStorage.setItem("auth-token", JSON.stringify(data.message));
          setAutoHideError(null);
        }
      }
      // if singup problem
      else {
        // if sign up problem
        // console.log(res);
        setAutoHideError(data.message);
      }
    }
  }

  return (
    <div className="flex flex-col mt-30 w-[500px] mx-auto gap-5">
      <Input
        id="input-name"
        placeholder={"Enter your name"}
        onChangeInputSetter={setInputName}
        inputErr={inputNameErr}
      />
      <Input
        id="input-email"
        placeholder={"Enter your email"}
        onChangeInputSetter={setInputEmail}
        inputErr={inputEmailErr}
      />
      <Input
        id="input-password"
        placeholder={"Enter your password"}
        onChangeInputSetter={setInputPassword}
        inputErr={inputPasswordErr}
      />
      <Button text={"Sign Up"} onClickHandler={signUpHandler} />
      {autoHideError && <p className="mx-auto text-red-400">{autoHideError}</p>}
      <Link to={"/signin"} className="mx-auto cursor-pointer hover:underline">
        I already have an account
      </Link>
    </div>
  );
}
