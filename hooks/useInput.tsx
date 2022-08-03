import React, { useState, FocusEvent } from "react";

const useInput = (
  validate: (value: string) => boolean,
  initialValue: string
): [
  string,
  boolean,
  boolean,
  (event: React.ChangeEvent<HTMLInputElement>) => void,
  (event: FocusEvent<HTMLInputElement>) => void
] => {
  const [enteredValue, setEnteredValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validate(enteredValue);
  const hasError = isTouched && !isValid;

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.currentTarget.value);
  };

  const blurHandler = (event: FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
  };

  return [enteredValue, isValid, hasError, changeHandler, blurHandler];
};

export default useInput;
