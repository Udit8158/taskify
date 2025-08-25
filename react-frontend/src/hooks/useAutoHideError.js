import { useEffect, useState } from "react";

function useAutoHideError({ time }) {
  const [autoHideError, setAutoHideError] = useState(null);

  useEffect(() => {
    if (autoHideError) {
      let timer = setTimeout(() => {
        setAutoHideError(null);
      }, time * 1000);
      return () => clearTimeout(timer);
    }
  }, [autoHideError]);

  return { autoHideError, setAutoHideError };
}

export default useAutoHideError;
