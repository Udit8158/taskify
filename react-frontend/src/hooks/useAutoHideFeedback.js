import { useEffect, useState } from "react";

function useAutoHideFeedback({ time }) {
  // pass time in seconds

  const [autoHideFeedback, setAutoHideFeedback] = useState(null);
  console.log("Autohidefeedback", autoHideFeedback);

  useEffect(() => {
    console.log("triggered");
    if (autoHideFeedback) {
      console.log("inside if");
      let timer = setTimeout(() => {
        setAutoHideFeedback(null);
      }, time * 1000);
      return () => clearTimeout(timer);
    }
  }, [autoHideFeedback]);

  return { autoHideFeedback, setAutoHideFeedback };
}

export default useAutoHideFeedback;
