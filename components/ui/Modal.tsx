import { MutableRefObject, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { IoMdClose } from "react-icons/io";

import styles from "../../styles/Modal.module.css";

const Backdrop: React.FC<{ onClick: () => void }> = (props) => {
  return <div className={styles.backdrop} onClick={props.onClick} />;
};

const ModalOverlay: React.FC<{
  content: React.ReactNode;
  title: string;
  onClose: () => void;
}> = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>{props.title}</h2>
        <IoMdClose color="gray" size={24} onClick={props.onClose} />
      </div>
      {props.content}
    </div>
  );
};

const Modal: React.FC<{
  content: React.ReactNode;
  onClose: () => void;
  title: string;
}> = (props) => {
  const ref = useRef<HTMLElement | null>();
  const [mounted, setIsMounted] = useState(false);

  useEffect(() => {
    ref.current = document.getElementById("overlays");
    setIsMounted(true);
  }, []);

  return (
    <>
      {mounted && ref.current
        ? ReactDOM.createPortal(
            <Backdrop onClick={props.onClose} />,
            ref.current
          )
        : null}
      {mounted && ref.current
        ? ReactDOM.createPortal(
            <ModalOverlay
              content={props.content}
              title={props.title}
              onClose={props.onClose}
            />,
            ref.current
          )
        : null}
    </>
  );
};

export default Modal;
