// hooks/useDebouncedAtom.ts
import { useEffect, useState } from "react";

export const useDebouncedAtom = <T>(
  value: T,
  setValue: (val: T) => void,
  delay: number = 400
) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(internalValue);
    }, delay);

    return () => clearTimeout(handler);
  }, [internalValue, setValue, delay]);

  return [internalValue, setInternalValue] as const;
};
