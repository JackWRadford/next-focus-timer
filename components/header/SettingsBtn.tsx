import { useState } from "react";
import SettingsModal from "../settingsModal/SettingsModal";
import Button from "../ui/Button";

const SettingsBtn = () => {
  const [showModalState, setShowModal] = useState(false);

  const clickHandler = () => {
    setShowModal(true);
  };

  const closeHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModalState && <SettingsModal onClose={closeHandler} />}
      <Button onClick={clickHandler} label="Settings" />
    </>
  );
};

export default SettingsBtn;
