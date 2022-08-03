import Timer from "./Timer";
import TimerOptions from "./TimerOptions";
import TimerSelect from "./TimerSelect";
import styles from "../../styles/TimerArea.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import TimerType from "../../enums/timerType";

const TimerArea = () => {
  const { timerType, isPaused } = useSelector(
    (state: RootState) => state.timer
  );

  const getAreaClass = (): string => {
    let classes = `${styles.timerArea} `;
    if (!isPaused) classes += `${styles.timerAreaActive} `;
    switch (timerType) {
      case TimerType.focus:
        break;
      case TimerType.shortBreak:
        classes += `${styles.shortBreak}`;
        break;
      case TimerType.longBreak:
        classes += `${styles.longBreak}`;
        break;
      default:
        break;
    }
    return classes;
  };

  return (
    <div className={styles.wrapper}>
      <div className={getAreaClass()}>
        <TimerSelect />
        <Timer />
        <TimerOptions />
      </div>
    </div>
  );
};

export default TimerArea;
