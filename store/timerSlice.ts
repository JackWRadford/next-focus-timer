import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import TimerType from "../enums/timerType";
import toMinSec from "../helper/ToMinSec";

import { Howl } from "howler";

const setBodyBGColor = (isPaused: boolean, timerType: TimerType) => {
  if (isPaused) {
    document.body.style.backgroundColor = "var(--light-red)";
  } else {
    let bgColor = "var(--light-red)";
    switch (timerType) {
      case TimerType.focus:
        bgColor = "var(--main-red)";
        break;
      case TimerType.shortBreak:
        bgColor = "var(--short-blue)";
        break;
      case TimerType.longBreak:
        bgColor = "var(--long-green)";
        break;
      default:
        break;
    }
    document.body.style.backgroundColor = bgColor;
  }
};

const setHeadTitle = (time: number, timerType: TimerType) => {
  let timeStr = toMinSec(time);
  let message = "";
  switch (timerType) {
    case TimerType.focus:
      message = "Focus Time";
      break;
    case TimerType.shortBreak:
      message = "Short Break";
      break;
    case TimerType.longBreak:
      message = "Long Break";
      break;
    default:
      break;
  }
  document.title = `${timeStr} | ${message}`;
};

// Ask user for confirmation when changing timerType (timer will be reset)
const confirmChangeTimer = (): boolean => {
  return !window.confirm("The current timer will be lost!");
};

export interface TimerState {
  timerLengths: number[];
  shortBreakDone: number;
  intervalLength: number;
  timerType: TimerType;
  isPaused: boolean;
  timeRemaining: number;
  autoBreak: boolean;
  autoFocus: boolean;
}

const initialState: TimerState = {
  // MUST keep this order for enum
  timerLengths: [1500, 300, 600],
  shortBreakDone: 0,
  intervalLength: 1,
  timerType: TimerType.focus,
  isPaused: true,
  timeRemaining: 1500,
  autoBreak: true,
  autoFocus: false,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTimerType: (state, action: PayloadAction<TimerType>) => {
      if (
        (!state.isPaused ||
          state.timeRemaining < state.timerLengths[state.timerType]) &&
        confirmChangeTimer()
      )
        return;
      state.timerType = action.payload;
      state.isPaused = true;
      state.timeRemaining = state.timerLengths[state.timerType];
      setBodyBGColor(state.isPaused, state.timerType);
      setHeadTitle(state.timeRemaining, state.timerType);
    },
    toggleIsPaused: (state) => {
      state.isPaused = !state.isPaused;
      setBodyBGColor(state.isPaused, state.timerType);
    },
    timerFinished: (state, action: PayloadAction<boolean>) => {
      // Only play sound if timer finished, not skipped
      if (action.payload) {
        const gong = new Howl({ src: "/gong.mp3" });
        gong.play();
      }
      if (state.timerType === TimerType.focus) {
        if (state.shortBreakDone < state.intervalLength) {
          state.timerType = TimerType.shortBreak;
          state.shortBreakDone++;
        } else {
          state.timerType = TimerType.longBreak;
          state.shortBreakDone = 0;
        }
        state.isPaused = !state.autoBreak;
      } else {
        state.timerType = TimerType.focus;
        state.isPaused = !state.autoFocus;
      }
      state.timeRemaining = state.timerLengths[state.timerType];
      setBodyBGColor(state.isPaused, state.timerType);
      setHeadTitle(state.timeRemaining, state.timerType);
    },
    resetTimer: (state) => {
      state.isPaused = true;
      state.timeRemaining = state.timerLengths[state.timerType];
      setBodyBGColor(state.isPaused, state.timerType);
      setHeadTitle(state.timeRemaining, state.timerType);
    },
    decrementTimeRemaining: (state) => {
      state.timeRemaining -= 1;
      setHeadTitle(state.timeRemaining, state.timerType);
    },
    updateSettings: (
      state,
      action: PayloadAction<{
        timerLengths: number[];
        intervalLength: number;
        autoBreak: boolean;
        autoFocus: boolean;
      }>
    ) => {
      state.timerLengths = action.payload.timerLengths;
      state.intervalLength = action.payload.intervalLength;
      state.timeRemaining = state.timerLengths[state.timerType];
      state.autoBreak = action.payload.autoBreak;
      state.autoFocus = action.payload.autoFocus;
      localStorage.setItem(
        "intervalLength",
        JSON.stringify(state.intervalLength)
      );
      localStorage.setItem("timerLengths", JSON.stringify(state.timerLengths));
      localStorage.setItem("autoBreak", JSON.stringify(state.autoBreak));
      localStorage.setItem("autoFocus", JSON.stringify(state.autoFocus));
      setHeadTitle(state.timeRemaining, state.timerType);
    },
    setSettingsFromLocal: (
      state,
      action: PayloadAction<{
        timerLengths: number[];
        intervalLength: number;
        autoBreak: boolean;
        autoFocus: boolean;
      }>
    ) => {
      state.timerLengths = action.payload.timerLengths;
      state.intervalLength = action.payload.intervalLength;
      state.timeRemaining = action.payload.timerLengths[TimerType.focus];
      state.autoBreak = action.payload.autoBreak;
      state.autoFocus = action.payload.autoFocus;
    },
  },
});

export const {
  toggleIsPaused,
  resetTimer,
  decrementTimeRemaining,
  setTimerType,
  timerFinished,
  updateSettings,
  setSettingsFromLocal,
} = timerSlice.actions;

export default timerSlice.reducer;
