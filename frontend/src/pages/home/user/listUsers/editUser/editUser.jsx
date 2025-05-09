import { useParams } from "react-router";
import { api } from "../../../../../services/api";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function EditUser() {
  const { idUser } = useParams();
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState([]);
  const [positions, setPositions] = useState([]);

  const infoUser = async () => {
    try {
      const response = await api.get(`user/list/${idUser}`);
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const listPositions = async () => {
    try {
      const response = await api.get("/positions/list");
      console.log(response.data);
      setPositions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  async function atualizarUser() {
    try {
      const response = await api.put(`user/list/${idUser}`, {
        // ...
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    return listPositions;
  }, []);

  useEffect(() => {
    return infoUser;
  }, []);

  return (
    <div
      className="py-10 px-10 select-none
      sm:py-10 sm:px-32
    "
    >
      <div className="flex flex-col gap-5 w-96">
        <div className="flex flex-col">
          <label htmlFor="active">Usuário ativo/inativo:</label>
          <input
            id="active"
            type="checkbox"
            checked={user.isActive}
            onChange={(e) => setUser({ ...user, isActive: e.target.checked })}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            type="text"
            value={user.name}
            onChange={(e) => setUser(e.target.value)}
            className="py-1 px-2 w-96
              border border-gray-300 focus:border-primary-scooter_500 focus:ring-primary-scooter_500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser(e.target.value)}
            className="py-1 px-2 w-96
              border border-gray-300 focus:border-primary-scooter_500 focus:ring-primary-scooter_500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="positions">Cargo no sistema:</label>
          <select
            name="cargos"
            id="positions"
            className="px-2 py-1 
              border border-gray-300 focus:border-primary-scooter_500 focus:ring-primary-scooter_500 focus:outline-none"
          >
            {positions.map((position) => (
              <option value={position.id}>{position.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="user">Usuario de login:</label>
          <input
            id="user"
            type="email"
            value={user.user}
            onChange={(e) => setUser(e.target.value)}
            className="py-1 px-2 w-96
              border border-gray-300 focus:border-primary-scooter_500 focus:ring-primary-scooter_500 focus:outline-none"
          />
        </div>
        <div className="flex flex-row gap-4">
          <label htmlFor="password">Senha de login:</label>
          <button
            id="password"
            className="font-bold text-primary-scooter_900 text-xs hover:underline hover:text-primary-scooter_600 transition duration-300 select-none hidden sm:block"
          >
            Mudar a senha?
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
