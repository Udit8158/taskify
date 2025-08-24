import { Link } from "react-router";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { useEffect, useRef, useState } from "react";
import { validateInput } from "../utils/validateInput";
import signin from "../utils/signin";
import useOnSubmitErr from "../hooks/useOnSubmitErr";

export default function SignInPage() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const inputEmailErr = validateInput("email", inputEmail);
  const inputPasswordErr = validateInput("password", inputPassword);

  const { onSubmitErr, setonSubmitErr } = useOnSubmitErr();

  async function signInHandler() {
    // check for not providing any inputs while submitting
    if (inputEmail.length === 0 || inputPassword.length === 0) {
      setonSubmitErr("Provide all the details");
      return;
    }

    // check for input errors and procedd if allright
    if (!inputEmailErr && !inputPasswordErr) {
      const userDetails = {
        email: inputEmail,
        password: inputPassword,
      };
      const signin_url = "http://127.0.0.1:3000/signin";
      const { res, data } = await signin(signin_url, userDetails);

      if (!res.ok) {
        // if sing in server error
        setonSubmitErr(data.message);
      } else {
        // successful sign in
        localStorage.setItem("auth-token", JSON.stringify(data.message));
        setonSubmitErr(null);
      }
    }
  }

  return (
    <div className="flex flex-col mt-30 w-[500px] mx-auto gap-5">
      <Input
        id="email"
        placeholder={"Enter your email"}
        onChangeInputSetter={setInputEmail}
        type={"email"}
        inputErr={inputEmailErr}
      />
      <Input
        id="password"
        placeholder={"Enter your password"}
        onChangeInputSetter={setInputPassword}
        type={"text"}
        inputErr={inputPasswordErr}
      />
      <Button text={"Sign In"} onClickHandler={signInHandler} />
      {onSubmitErr && <p className="mx-auto text-red-400">{onSubmitErr}</p>}
      <Link to="/signup" className="mx-auto cursor-pointer hover:underline">
        Create a new account
      </Link>
    </div>
  );
}
