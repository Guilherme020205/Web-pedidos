import { Link, useParams } from "react-router";
import { api } from "../../../../../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { msgError, msgInfo } from "../../../../../alerts";

function EditUser() {
  const navigate = useNavigate();

  const [positions, setPositions] = useState([]);
  const listPositions = async () => {
    try {
      const response = await api.get("/positions/list");
      setPositions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    cargo: "",
    user: "",
    password: "",
    passwordConfirm: "",
    active: false,
  });

  async function newUser() {
    try {
      if (
        !user.name ||
        !user.email ||
        !user.user ||
        !user.cargo ||
        !user.password ||
        !user.passwordConfirm
      ) {
        msgInfo("Preencha todos os campos!");
        return;
      }

      if (user.password != user.passwordConfirm) {
        msgInfo("As senhas não coincidem!");
        return;
      }

      const response = await api.post(`/user/creat/`, {
        name: user.name,
        email: user.email,
        user: user.user,
        positionId: user.cargo,
        password: user.password,
        isActive: user.active,
      });

      navigate("/home/user");
    } catch (error) {
      msgInfo("Erro ao salvar usuário!");
    }
  }

  useEffect(() => {
    listPositions();
  }, []);

  return (
    <div className="py-10 px-10 sm:py-10 sm:px-32 select-none">
      <ToastContainer autoClose={5000} />
      <Link
        to={"/home/user"}
        className="bg-slate-400 flex items-center justify-center w-28 py-1 rounded-md 
            border-[2px] border-transparent 
            hover:bg-slate-100 hover:border-slate-400 hover:border-solid transition duration-700"
      >
        ← Voltar
      </Link>
      <p className="text-xl font-bold mt-8 mb-5">Novo usuario</p>
      <div className="flex flex-col gap-5 w-96">
        <div className="flex flex-row items-center gap-5">
          <label htmlFor="active">Usuário ativo/inativo:</label>
          <input
            id="active"
            type="checkbox"
            checked={user.active}
            onChange={(e) => setUser({ ...user, active: e.target.checked })}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="py-1 px-2 w-96 border border-gray-300 focus:border-primary-scooter_500 focus:ring-primary-scooter_500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="py-1 px-2 w-96 border border-gray-300 focus:border-primary-scooter_500 focus:ring-primary-scooter_500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="positions">Cargo no sistema:</label>
          <select
            id="positions"
            value={user.cargo}
            onChange={(e) => setUser({ ...user, cargo: e.target.value })}
            className="px-2 py-1 border border-gray-300 focus:border-primary-scooter_500 focus:ring-primary-scooter_500 focus:outline-none"
          >
            <option value="">--- Selecione um cargo</option>

            {positions.map((position) => (
              <option key={position.id} value={position.id}>
                {position.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="user">Usuário de login:</label>
          <input
            id="user"
            type="text"
            value={user.user}
            onChange={(e) => setUser({ ...user, user: e.target.value })}
            className="py-1 px-2 w-96 border border-gray-300 focus:border-primary-scooter_500 focus:ring-primary-scooter_500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="newPassword">Senha de login:</label>
          <input
            id="newPassword"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="py-1 px-2 w-96 border border-gray-300 focus:border-primary-scooter_500 focus:ring-primary-scooter_500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="newConfirmPassword">Confirmar senha de login:</label>
          <input
            id="newConfirmPassword"
            type="password"
            value={user.passwordConfirm}
            onChange={(e) =>
              setUser({ ...user, passwordConfirm: e.target.value })
            }
            className="py-1 px-2 w-96 border border-gray-300 focus:border-primary-scooter_500 focus:ring-primary-scooter_500 focus:outline-none"
          />
        </div>

        <button
          onClick={newUser}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Criar Usuário
        </button>
      </div>
    </div>
  );
}

export default EditUser;
