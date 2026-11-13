// Tiny toast hook — holds a transient message with auto-dismiss.
import { useState, useCallback, useRef } from "react";

export function useToast(duration = 2600) {
  const [toast, setToast] = useState(null); // { type, text }
  const timer = useRef(null);

  const show = useCallback(
    (type, text) => {
      clearTimeout(timer.current);
      setToast({ type, text });
      timer.current = setTimeout(() => setToast(null), duration);
    },
    [duration]
  );

  return {
    toast,
    success: (text) => show("success", text),
    error: (text) => show("error", text),
  };
}
