import { useContext } from "react";
import { AuthContext } from "./../../context/AuthContext";
import { useNavigate } from "react-router-dom";

 function ScreenHome() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>ScreenHome</h2>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default ScreenHome;
