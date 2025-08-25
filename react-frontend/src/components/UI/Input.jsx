import { useState } from "react";
import { validateInput } from "../../utils/validateInput";

export default function Input({
  id,
  placeholder,
  onChangeInputSetter,
  ref,
  type,
  inputErr,
  pad,
  customClass,
}) {
  const [showErr, setShowErr] = useState(false);
  return (
    <div className="flex flex-col">
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
        className={
          "outline-none bg-white text-black  p-6 rounded-md " + customClass
        }
      />
      {showErr && inputErr && (
        <p className={"text-sm text-red-400 " + customClass}>{inputErr}</p>
      )}
    </div>
  );
}
