import { useDispatch, useSelector } from "react-redux";
import TimerType from "../../enums/timerType";
import { RootState } from "../../store/store";
import {
  resetTimer,
  timerFinished,
  toggleIsPaused,
} from "../../store/timerSlice";
import Button from "../ui/Button";
import styles from "../../styles/TimerOptions.module.css";

const getAreaClass = (type: TimerType): string => {
  let classes = `${styles.startBtn} `;
  switch (type) {
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

const TimerOptions = () => {
  const isPaused = useSelector((state: RootState) => state.timer.isPaused);
  const timerType = useSelector((state: RootState) => state.timer.timerType);
  const dispatch = useDispatch();

  return (
    <div className={styles.timerOptions}>
      <Button
        className={styles.timerOptionsBtn}
        onClick={() => dispatch(resetTimer())}
        label="Reset"
      />
      <Button
        className={getAreaClass(timerType)}
        onClick={() => dispatch(toggleIsPaused())}
        label={isPaused ? "Start" : "Pause"}
      />
      <Button
        className={styles.timerOptionsBtn}
        onClick={() => dispatch(timerFinished(false))}
        label="Skip"
      />
    </div>
  );
};

export default TimerOptions;
