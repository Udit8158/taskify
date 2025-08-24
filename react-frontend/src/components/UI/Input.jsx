import { useState } from "react";
import { validateInput } from "../../utils/validateInput";

export default function Input({
  id,
  placeholder,
  onChangeInputSetter,
  ref,
  type,
  inputErr,
}) {
  const [showErr, setShowErr] = useState(false);

  return (
    <>
      <input
        id={id}
        placeholder={placeholder}
        onChange={(e) => {
          onChangeInputSetter(e.target.value);
        }}
        onBlur={(e) => {
          setShowErr(true);
        }}
        ref={ref}
        type={type}
        required
        className="outline-none bg-white text-black  p-6 rounded-md"
      />
      {showErr && inputErr && <p className="text-red-400">{inputErr}</p>}
    </>
  );
}
