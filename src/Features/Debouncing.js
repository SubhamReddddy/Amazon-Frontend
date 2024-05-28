import { useEffect, useState } from "react";

export const UseDebounce = (value, time = 500) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, time);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, time]);
  return debounceValue;
};
