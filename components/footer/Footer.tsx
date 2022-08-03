import { VerticalSmall } from "../helper/SpacingHelper";
import styles from "../../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Icon by{" "}
        <a href="https://twemoji.twitter.com/" target="_blank" rel="noreferrer">
          Twemoji
        </a>{" "}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noreferrer"
        >
          (CC BY 4.0)
        </a>
        , Sounds from{" "}
        <a href="https://www.zapsplat.com" target="_blank" rel="noreferrer">
          Zapsplat
        </a>
      </p>
      <VerticalSmall />
      <p className={styles.rights}>
        All rights reserved. &copy;
        <a href="https://jackradford.dev/" target="_blank" rel="noreferrer">
          Jack Radford
        </a>{" "}
        2022
      </p>
    </footer>
  );
};

export default Footer;
