import React from "react";

export default function Alert({
  type = "error",
  message = "This is an alert message",
}) {
  // we will have 2 types - error and success
  const errorClass = `w-fit absolute bottom-4 right-4 p-4 bg-red-300 rounded-md text-black/70 font-bold`;
  const successClass = `w-fit absolute bottom-4 right-4 p-4 bg-green-300 rounded-md text-black/70 font-bold`;
  return (
    <div className={type === "success" ? successClass : errorClass}>
      {message}
    </div>
  );
}
