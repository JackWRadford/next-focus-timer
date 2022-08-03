import { configureStore } from "@reduxjs/toolkit";
import timerSlice from "./timerSlice";

export const store = configureStore({
  reducer: {
    timer: timerSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
