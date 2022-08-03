import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

const LoginBtn = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("login");
  };

  return <Button label={"Login"} onClick={clickHandler} />;
};

export default LoginBtn;
