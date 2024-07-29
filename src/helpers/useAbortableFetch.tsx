import { useRef, useEffect, useCallback } from "react";

const useAbortableFetch = (fetchFn: (signal: AbortSignal) => Promise<any>) => {
  const controllerRef = useRef<AbortController>(new AbortController());

  const executeFetch = useCallback(async () => {
    controllerRef.current.abort(); // Abort any ongoing request
    controllerRef.current = new AbortController(); // Create a new controller

    try {
      return await fetchFn(controllerRef.current.signal);
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Fetch error:", error);
      }
      throw error;
    }
  }, [fetchFn]);

  useEffect(() => {
    return () => {
      controllerRef.current.abort(); // Cleanup on unmount
    };
  }, []);

  return executeFetch;
};

export default useAbortableFetch;
