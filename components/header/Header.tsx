import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "../../styles/Header.module.css";
import SettingsBtn from "./SettingsBtn";

const Header = () => {
  const isPaused = useSelector((state: RootState) => state.timer.isPaused);

  return (
    <header className={styles.header}>
      <h1>{isPaused ? "Pomodoro Timer" : " "}</h1>
      <span>{isPaused && <SettingsBtn />}</span>
    </header>
  );
};

export default Header;
