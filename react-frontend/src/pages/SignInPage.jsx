import { Link, useNavigate } from "react-router";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { useEffect, useRef, useState } from "react";
import { validateInput } from "../utils/validateInput";
import signin from "../utils/signin";
import useAutoHideFeedback from "../hooks/useAutoHideFeedback";
import Alert from "../components/UI/Alert";
import { CircularProgress } from "@mui/material";

export default function SignInPage() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const inputEmailErr = validateInput("email", inputEmail);
  const inputPasswordErr = validateInput("password", inputPassword);

  const { autoHideFeedback, setAutoHideFeedback } = useAutoHideFeedback({
    time: 5,
  });

  const navigate = useNavigate();

  async function signInHandler() {
    // check for not providing any inputs while submitting
    if (inputEmail.length === 0 || inputPassword.length === 0) {
      setAutoHideFeedback({
        type: "error",
        message: "Provide all the details first 😤",
      });
      return;
    }

    // check for input errors and procedd if allright
    if (!inputEmailErr && !inputPasswordErr) {
      const userDetails = {
        email: inputEmail,
        password: inputPassword,
      };

      setLoading(true);
      const { res, data } = await signin(userDetails);
      setLoading(false);
      if (!res.ok) {
        // if sing in server error
        setAutoHideFeedback({ type: "error", message: data.message + " 😔" });
      } else {
        // successful sign in
        localStorage.setItem("auth-token", JSON.stringify(data.message));
        setAutoHideFeedback({ type: "success", message: "Signed In 🥳" }); // this will not work as component will unmount
        navigate("/app");
      }
    }
  }

  return (
    <div className="flex flex-col mt-60 md:mt-30 w-[90%] mx-auto gap-5 md:w-[500px]">
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
      <Button
        text={loading ? <CircularProgress /> : "Sign In"}
        onClickHandler={signInHandler}
      />
      {autoHideFeedback && (
        <Alert
          type={autoHideFeedback.type}
          message={autoHideFeedback.message}
        />
      )}
      <Link to="/signup" className="mx-auto cursor-pointer hover:underline">
        Create a new account
      </Link>
    </div>
  );
}
