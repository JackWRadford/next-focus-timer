import { useDispatch, useSelector } from "react-redux";
import TimerType from "../../enums/timerType";
import { RootState } from "../../store/store";
import { setTimerType } from "../../store/timerSlice";
import Button from "../ui/Button";
import styles from "../../styles/TimerTypeBtn.module.css";

const getAreaClass = (type: TimerType, isSelected: boolean): string => {
  let classes = `${styles.timerTypeBtn} ${isSelected ? styles.selected : ""} `;
  if (isSelected) {
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
  }
  return classes;
};

const TimerTypeBtn: React.FC<{ timerType: TimerType; label: string }> = (
  props
) => {
  const timerType = useSelector((state: RootState) => state.timer.timerType);
  const dispatch = useDispatch();

  return (
    <Button
      className={getAreaClass(timerType, props.timerType === timerType)}
      label={props.label}
      onClick={() => {
        dispatch(setTimerType(props.timerType));
      }}
    />
  );
};

export default TimerTypeBtn;
