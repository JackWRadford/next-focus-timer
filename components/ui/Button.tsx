import styles from "../../styles/Button.module.css";

const Button: React.FC<{
  label: string;
  className?: string;
  [button: string]: any;
  onClick?: () => void;
}> = (props) => {
  const btnStyles = `${styles.button} ${props.className}`;

  return (
    <button {...props.button} className={btnStyles} onClick={props.onClick}>
      {props.label}
    </button>
  );
};

export default Button;
