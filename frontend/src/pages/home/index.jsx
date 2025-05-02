import { useContext } from "react";
import { AuthContext } from './../../context/AuthContext';

function ScreenHome() {
  const { userData } = useContext(AuthContext);

  const getSaudacao = () => {
    if (!userData) return "Carregando...";

    switch (userData.cargo) {
      case "Gerente":
        return "Olá, gerente!";
      case "Almoxarife":
        return "Olá, almoxarife!";
      case "Usuario padrão":
      case "Usuário padrão":
        return "Olá, usuário!";
      default:
        return "Olá!";
    }
  };

  return (
    <div className="py-10 px-32">
      <h2>{getSaudacao()}</h2>
    </div>
  );
}

export default ScreenHome;
