import { useState, useCallback, useEffect } from 'react';

export const useSearchInput = (
  initialValue: string = '',
  onChange: (value: string) => void,
  debounceMs: number = 300
) => {
  const [inputValue, setInputValue] = useState(initialValue);
  
  // Store the timeout ID outside of the callback to persist between renders
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const debouncedOnChange = useCallback((value: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    const newTimeoutId = setTimeout(() => {
      onChange(value);
    }, debounceMs);
    
    setTimeoutId(newTimeoutId);
  }, [onChange, debounceMs, timeoutId]);

  const handleChange = useCallback(
    (value: string) => {
      setInputValue(value);
      debouncedOnChange(value);
    },
    [debouncedOnChange]
  );

  // Clean up the timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return {
    inputValue,
    handleChange,
  };
}; 