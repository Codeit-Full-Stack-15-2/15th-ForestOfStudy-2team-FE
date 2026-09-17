import { useState, useRef, useEffect } from 'react';

export function useEditableValue(initialValue, { disabled = false } = {}) {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const startEditing = () => {
    if (disabled) {
      return;
    }
    setIsEditing(true);
  };

  const stopEditing = () => {
    setIsEditing(false);
  };

  const handleKeyDownEnter = (e) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    }
  };

  return {
    value,
    setValue,
    isEditing,
    inputRef,
    startEditing,
    stopEditing,
    handleKeyDownEnter,
  };
}
