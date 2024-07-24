import { useEffect, useState } from "react";

export default function Debouncer<T>(value: T, delay: number = 500): T {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    let debounceTimeOutHandler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(debounceTimeOutHandler);
    };
  }, [value, delay]);

  return debounceValue;
}
