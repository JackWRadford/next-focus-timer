import react from "react";
import styles from "../../styles/InfoSection.module.css";
import { VerticalMedium, VerticalSmall } from "../helper/SpacingHelper";

const InfoSection: React.FC<{ title: string; content: string }> = (props) => {
  return (
    <div className={styles.infoSection}>
      <h1>{props.title}</h1>
      <VerticalMedium />
      <p>{props.content}</p>
    </div>
  );
};

export default InfoSection;
