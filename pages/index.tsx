import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { VerticalMedium } from "../components/helper/SpacingHelper";
import InfoArea from "../components/infoArea/InfoArea";
import InfoSection from "../components/infoArea/InfoSection";
import TimerArea from "../components/timerSection/TimerArea";
import { RootState } from "../store/store";
import { setSettingsFromLocal } from "../store/timerSlice";

const HomePage = () => {
  const isPaused = useSelector((state: RootState) => state.timer.isPaused);
  const dispatch = useDispatch();

  useEffect(() => {
    // document.body.style.backgroundColor = "var(--light-red)";

    console.log("---App-useEffect---");
    const persistedTimerLengths = localStorage.getItem("timerLengths");
    const timerLengths = persistedTimerLengths
      ? JSON.parse(persistedTimerLengths)
      : [1500, 300, 600];
    const persistedIntervalLength = localStorage.getItem("intervalLength");
    const intervalLength = persistedIntervalLength
      ? JSON.parse(persistedIntervalLength)
      : 2;
    const persistedAutoBreak = localStorage.getItem("autoBreak");
    const autoBreak = persistedAutoBreak
      ? JSON.parse(persistedAutoBreak)
      : true;
    const persistedAutoFocus = localStorage.getItem("autoFocus");
    const autoFocus = persistedAutoFocus
      ? JSON.parse(persistedAutoFocus)
      : false;
    dispatch(
      setSettingsFromLocal({
        timerLengths: timerLengths,
        intervalLength: intervalLength,
        autoBreak: autoBreak,
        autoFocus: autoFocus,
      })
    );
  }, [dispatch]);

  return (
    <>
      <Header />
      <TimerArea />
      {isPaused && (
        <>
          <InfoArea />
          <VerticalMedium />
          <Footer />
        </>
      )}
    </>
  );
};

export default HomePage;
