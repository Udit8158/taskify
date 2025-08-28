import { Link, useNavigate } from "react-router";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { useState } from "react";
import singup from "../utils/signup";
import signin from "../utils/signin";
import { validateInput } from "../utils/validateInput";
import useAutoHideFeedback from "../hooks/useAutoHideFeedback";
import Alert from "../components/UI/Alert";

export default function SignUpPage() {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const inputNameErr = validateInput("name", inputName);
  const inputEmailErr = validateInput("email", inputEmail);
  const inputPasswordErr = validateInput("password", inputPassword);

  const navigate = useNavigate();

  const { autoHideFeedback, setAutoHideFeedback } = useAutoHideFeedback({
    time: 5,
  });

  async function signUpHandler() {
    // check for not providing any inputs while submitting
    if (
      inputName.length === 0 ||
      inputEmail.length === 0 ||
      inputPassword.length === 0
    ) {
      setAutoHideFeedback({
        type: "error",
        message: "Provide all the details",
      });
      return;
    }

    // check for any input error and proceed if not
    if (!inputNameErr && !inputEmailErr && !inputPasswordErr) {
      const userDetails = {
        name: inputName,
        email: inputEmail,
        password: inputPassword,
      };
      const { res, data } = await singup(userDetails);

      if (res.ok) {
        // if singup well then do sign in
        const { res, data } = await signin(userDetails);

        if (!res.ok) {
          // if sign in problem
          setAutoHideFeedback({
            type: "error",
            message: "Something wrong happened",
          });
        } else {
          // succefull sign up (with sign in)
          localStorage.setItem("auth-token", JSON.stringify(data.message));
          navigate("/app");
        }
      }
      // if singup problem
      else {
        // if sign up problem
        // console.log(res);
        setAutoHideFeedback({ type: "error", message: data.message });
      }
    }
  }

  return (
    <div className="flex flex-col mt-60 md:mt-30 w-[90%] md:w-[500px] mx-auto gap-5">
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
      {autoHideFeedback && (
        <Alert
          type={autoHideFeedback.type}
          message={autoHideFeedback.message}
        />
      )}
      <Link to={"/signin"} className="mx-auto cursor-pointer hover:underline">
        I already have an account
      </Link>
    </div>
  );
}
