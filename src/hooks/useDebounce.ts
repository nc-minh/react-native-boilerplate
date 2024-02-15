import {DELAY_TIME_DEBOUNCE} from "@/constants/common";
import {useEffect, useState} from "react";

const useDebounce = (
  value: string,
  delay: number = DELAY_TIME_DEBOUNCE,
  func?: () => void,
) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      setDebouncedValue(value);
      if (value) func?.();
    }, delay);

    // Cancel the timeout if value changes (also on delay change or unmount)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, func]);

  return debouncedValue;
};

export default useDebounce;
