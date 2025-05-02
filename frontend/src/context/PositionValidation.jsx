// src/hooks/useUserPosition.ts
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useUserPosition() {
  const { userData } = useContext(AuthContext);

  if (!userData) return "Carregando...";

  switch (userData.cargo) {
    case "Gerente":
      return "g";
    case "Almoxarife":
      return "a";
    default:
      return "u";
  }
}
