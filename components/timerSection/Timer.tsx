import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toMinSec from "../../helper/ToMinSec";
import { RootState } from "../../store/store";
import { decrementTimeRemaining, timerFinished } from "../../store/timerSlice";
import styles from "../../styles/TimerArea.module.css";

const Timer = () => {
  const isPaused = useSelector((state: RootState) => state.timer.isPaused);
  const timeRemaining = useSelector(
    (state: RootState) => state.timer.timeRemaining
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("---Timer useEffect---");
    let myInterval: NodeJS.Timer;
    if (!isPaused) {
      myInterval = setInterval(() => {
        if (timeRemaining > 0) {
          dispatch(decrementTimeRemaining());
        } else {
          dispatch(timerFinished(true));
        }
      }, 1000);
    }

    return () => {
      clearInterval(myInterval);
    };
  }, [dispatch, isPaused, timeRemaining]);

  return <h1 className={styles.timer}>{toMinSec(timeRemaining)}</h1>;
};

export default Timer;
