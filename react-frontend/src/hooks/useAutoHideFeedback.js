import { useEffect, useState } from "react";

function useAutoHideFeedback({ time }) {
  // pass time in seconds

  const [autoHideFeedback, setAutoHideFeedback] = useState(null);

  useEffect(() => {
    if (autoHideFeedback) {
      let timer = setTimeout(() => {
        setAutoHideFeedback(null);
      }, time * 1000);
      return () => clearTimeout(timer);
    }
  }, [autoHideFeedback]);

  return { autoHideFeedback, setAutoHideFeedback };
}

export default useAutoHideFeedback;
