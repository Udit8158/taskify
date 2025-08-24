export default function Button({ text, onClickHandler, data }) {
  return (
    <button
      className="bg-orange-2 py-5 text-[20px] text-black rounded-md hover:opacity-80 transition-all ease-in-out duration-300 cursor-pointer"
      onClick={onClickHandler}
    >
      {text}
    </button>
  );
}
