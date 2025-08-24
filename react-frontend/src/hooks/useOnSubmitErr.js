import { useEffect, useState } from "react";

function useOnSubmitErr() {
  const [onSubmitErr, setonSubmitErr] = useState(null);

  useEffect(() => {
    if (onSubmitErr) {
      let timer = setTimeout(() => {
        setonSubmitErr(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [onSubmitErr]);

  return { onSubmitErr, setonSubmitErr };
}

export default useOnSubmitErr;
