import React from "react";
import styles from "../../styles/InfoArea.module.css";
import Divider from "../ui/Divider";
import InfoSection from "./InfoSection";

const InfoArea = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.infoArea}>
        <InfoSection
          title={"What is the Pomodoro Technique ?"}
          content={
            "The Pomodoro Technique is a time management method developed by Francesco Cirillo. It uses a (tomato shaped) kitchen timer to break work into intervals, typically 25 minutes in length, separated by short breaks."
          }
        />
        <Divider />
        <InfoSection
          title={"What are the benefits of a Pomodoro Timer ?"}
          content={
            "Using a pomodoro timer can help to break up focus sessions into more manageable segments. Starting tasks should become less daunting and the quality and quantity of study or focus time should be improved."
          }
        />
        <Divider />
        <InfoSection
          title={"How to study effectively ?"}
          content={
            "The Pomodoro Technique can be a great way to increase study productivity. The Pomodoro Technique promotes short but focused study sessions followed by breaks. This prevents mental exhaustion and improves attention span."
          }
        />
      </div>
    </div>
  );
};

export default InfoArea;
