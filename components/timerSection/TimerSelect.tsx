import TimerType from "../../enums/timerType";

import styles from "../../styles/TimerSelect.module.css";
import TimerTypeBtn from "./TimerTypeBtn";

const TimerSelect = () => {
  return (
    <div className={styles.timerSelect}>
      <TimerTypeBtn timerType={TimerType.focus} label={"Focus Time"} />
      <TimerTypeBtn timerType={TimerType.shortBreak} label={"Short Break"} />
      <TimerTypeBtn timerType={TimerType.longBreak} label={"Long Break"} />
    </div>
  );
};

export default TimerSelect;
