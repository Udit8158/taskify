export default function Button({
  text,
  onClickHandler,
  aditionalClasses,
  varient,
}) {
  let classes;
  if (varient === "small") {
    classes =
      "bg-orange-2 md:py-2 py-2 px-4 text-[14px] text-black rounded-md hover:opacity-80 transition-all ease-in-out duration-300 cursor-pointer";
  } else {
    classes =
      "bg-orange-2 md:py-4 py-2 text-[20px] text-black rounded-md hover:opacity-80 transition-all ease-in-out duration-300 cursor-pointer";
  }
  return (
    <button className={classes} onClick={onClickHandler}>
      {text}
    </button>
  );
}
