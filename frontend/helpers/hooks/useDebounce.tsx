import { useState, useEffect } from 'react';

const useDebounce =<Type, >(value: Type, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<Type>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;