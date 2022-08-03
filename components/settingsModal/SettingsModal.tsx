import { useDispatch, useSelector } from "react-redux";
import { updateSettings } from "../../store/timerSlice";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import styles from "../../styles/SettingsModal.module.css";
import Input from "../ui/Input";
import useInput from "../../hooks/useInput";
import { RootState } from "../../store/store";
import Divider from "../ui/Divider";
import { VerticalSmall } from "../helper/SpacingHelper";
import { useState } from "react";

// Convert minutes to seconds
const MinsToSecs = (mins: string): number => {
  return Number(mins) * 60;
};

// Convert seconds to minutes
const SecsToMins = (secs: number): string => {
  return (secs / 60).toString();
};

const SettingsModal: React.FC<{ onClose: () => void }> = (props) => {
  const dispatch = useDispatch();

  const [focusLength, shortBeakLength, longBreakLength] = useSelector(
    (state: RootState) => state.timer.timerLengths
  );

  const { intervalLength, autoBreak, autoFocus } = useSelector(
    (state: RootState) => state.timer
  );

  // Focus Time input
  const [
    focusValue,
    focusIsValid,
    focusHasError,
    focusChangeHandler,
    focusBlurHandler,
  ] = useInput((value) => Number(value) > 0, SecsToMins(focusLength));

  // Short Break input
  const [
    shortBreakValue,
    shortBreakIsValid,
    shortBreakHasError,
    shortBreakChangeHandler,
    shortBreakBlurHandler,
  ] = useInput((value) => Number(value) > 0, SecsToMins(shortBeakLength));

  // Long Break input
  const [
    longBreakValue,
    longBreakIsValid,
    longBreakHasError,
    longBreakChangeHandler,
    longBreakBlurHandler,
  ] = useInput((value) => Number(value) > 0, SecsToMins(longBreakLength));

  // Long Break Interval
  const [
    intervalValue,
    intervalIsValid,
    intervalHasError,
    intervalChangeHandler,
    intervalBlurHandler,
  ] = useInput((value) => Number(value) > 0, intervalLength.toString());

  // Auto Break
  const [autoBreakValue, setAutoBreak] = useState(autoBreak);

  // Auto Focus
  const [autoFocusValue, setFocusBreak] = useState(autoFocus);

  const autoBreakChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAutoBreak((prev: boolean) => !prev);
  };

  const autoFocusChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFocusBreak((prev: boolean) => !prev);
  };

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (
      !focusIsValid ||
      !shortBreakIsValid ||
      !longBreakIsValid ||
      !intervalIsValid
    )
      return;
    dispatch(
      updateSettings({
        timerLengths: [
          MinsToSecs(focusValue),
          MinsToSecs(shortBreakValue),
          MinsToSecs(longBreakValue),
        ],
        intervalLength: Number(intervalValue),
        autoBreak: autoBreakValue,
        autoFocus: autoFocusValue,
      })
    );
    props.onClose();
  };

  return (
    <Modal
      onClose={props.onClose}
      title={"Settings"}
      content={
        <form onSubmit={submitHandler}>
          <Divider />
          <div className={styles.times}>
            <Input
              label={"Focus Time"}
              labelIsAbove={true}
              hasError={focusHasError}
              input={{
                id: "focusTime",
                name: "focusTime",
                type: "number",
                min: 1,
                value: focusValue,
                onChange: focusChangeHandler,
                onBlur: focusBlurHandler,
              }}
            />
            <Input
              label={"Short Break"}
              labelIsAbove={true}
              hasError={shortBreakHasError}
              input={{
                id: "shortBreak",
                name: "shortBreak",
                type: "number",
                min: 1,
                value: shortBreakValue,
                onChange: shortBreakChangeHandler,
                onBlur: shortBreakBlurHandler,
              }}
            />
            <Input
              label={"Long Break"}
              labelIsAbove={true}
              hasError={longBreakHasError}
              input={{
                id: "longBreak",
                name: "longBreak",
                type: "number",
                min: 1,
                value: longBreakValue,
                onChange: longBreakChangeHandler,
                onBlur: longBreakBlurHandler,
              }}
            />
          </div>
          <Input
            label={"Long Break Interval"}
            labelIsAbove={false}
            hasError={intervalHasError}
            input={{
              id: "longBreakInterval",
              name: "longBreakInterval",
              type: "number",
              min: 1,
              value: intervalValue,
              onChange: intervalChangeHandler,
              onBlur: intervalBlurHandler,
            }}
          />
          <Divider />
          <Input
            label={"Auto-start breaks"}
            labelIsAbove={false}
            hasError={false}
            input={{
              id: "autoBreaks",
              name: "autoBreaks",
              type: "checkbox",
              value: autoBreakValue,
              defaultChecked: autoBreakValue,
              onChange: autoBreakChangeHandler,
              onBlur: () => {},
            }}
          />
          <VerticalSmall />
          <Input
            label={"Auto-start focus"}
            labelIsAbove={false}
            hasError={false}
            input={{
              id: "autoFocus",
              name: "autoFocus",
              type: "checkbox",
              value: autoFocusValue,
              defaultChecked: autoFocusValue,
              onChange: autoFocusChangeHandler,
              onBlur: () => {},
            }}
          />
          <Divider />
          <div className={styles.actions}>
            <Button
              button={{ type: "button" }}
              label={"Cancel"}
              onClick={props.onClose}
            />
            <Button className={styles.doneBtn} label={"Done"} />
          </div>
        </form>
      }
    />
  );
};

export default SettingsModal;
