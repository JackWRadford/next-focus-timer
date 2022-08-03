import React from "react";
import styles from "../../styles/Input.module.css";

const Input: React.FC<{
  label: string;
  labelIsAbove: boolean;
  hasError: boolean;
  errorMessage?: string;
  [input: string]: any;
}> = (props) => {
  let inputStyles = props.labelIsAbove ? styles.inputAbove : styles.inputSide;

  if (props.hasError) {
    inputStyles += ` ${styles.error}`;
  }

  return (
    <div className={inputStyles}>
      <label className={styles.label} htmlFor={props.input.id}>
        {props.label}
      </label>
      <input className={styles.input} {...props.input}></input>
      {props.hasError && props.errorMessage && (
        <p className={styles.p}>{props.errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
