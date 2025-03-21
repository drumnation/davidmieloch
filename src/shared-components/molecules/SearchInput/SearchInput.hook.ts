import { useState, useCallback, useEffect } from 'react';

export const useSearchInput = (
  initialValue: string = '',
  onChange: (value: string) => void,
  debounceMs: number = 300
) => {
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const debouncedOnChange = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;

      return (value: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          onChange(value);
        }, debounceMs);
      };
    })(),
    [onChange, debounceMs]
  );

  const handleChange = useCallback(
    (value: string) => {
      setInputValue(value);
      debouncedOnChange(value);
    },
    [debouncedOnChange]
  );

  return {
    inputValue,
    handleChange,
  };
}; 