import { useParams } from "react-router";
import { api } from "../../../../../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { msgError, msgInfo, msgSuccess } from "../../../../../alerts";

function EditUser() {
  const { idUser } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    user: "",
    isActive: false,
    positionId: "",
  });
  const [positions, setPositions] = useState([]);
  const navigate = useNavigate();

  const infoUser = async () => {
    try {
      const response = await api.get(`user/list/${idUser}`);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const listPositions = async () => {
    try {
      const response = await api.get("/positions/list");
      setPositions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  async function atualizarUser() {
    try {
      await api.put(`/user/edit/${idUser}`, {
        name: user.name,
        email: user.email,
        user: user.user,
        isActive: user.isActive,
        positionId: user.positionId,
      });
      navigate("/home/user");
    } catch (error) {
      alert("Erro ao atualizar usuário!");
    }
  }

  useEffect(() => {
    listPositions();
    infoUser();
  }, []);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [senhaNova1, setSenhaNova1] = useState("");
  const [senhaNova2, setSenhaNova2] = useState("");

  async function handleChangePassword() {
    if (!senhaAtual || !senhaNova1 || !senhaNova2) {
      msgInfo("Preencha todos os campos de senha.");
      return;
    }
    if (senhaNova1 !== senhaNova2) {
      msgError("As novas senhas não coincidem.");
      return;
    }

    try {
      const response = await api.put(`/user/edit/password/${user.id}`, {
        passwordOld: senhaAtual,
        passwordNew: senhaNova1,
      });
      setSenhaAtual("");
      setSenhaNova1("");
      setSenhaNova2("");
      setShowPasswordModal(false);
    } catch (error) {
      console.log(error);
      msgError("Senha incorreta!");
    }
  }

  return (
    <div className="py-10 px-10 sm:py-10 sm:px-32">
      <div className="flex flex-col gap-5 w-96">
        <div className="flex flex-row items-center gap-5">
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
            value={user.positionId}
            onChange={(e) => setUser({ ...user, positionId: e.target.value })}
            className="px-2 py-1 border border-gray-300 focus:border-primary-scooter_500 focus:ring-primary-scooter_500 focus:outline-none"
          >
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

        <div className="flex items-center gap-2">
          <label>Senha de login:</label>
          <button
            className="text-blue-600 text-sm underline"
            onClick={() => setShowPasswordModal(true)}
          >
            Mudar a senha?
          </button>
        </div>

        <button
          onClick={atualizarUser}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Atualizar Usuário
        </button>
      </div>
      {showPasswordModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center">
          <ToastContainer autoClose={5000} />

          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-3 w-96">
            <h2 className="text-lg font-bold">Alterar Senha</h2>
            <div className="flex flex-col">
              <label htmlFor="senhaAtual">Senha atual:</label>
              <input
                id="senhaAtual"
                type="text"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                className="py-1 px-2   border border-gray-300 focus:border-primary-scooter_500 focus:ring-primary-scooter_500 focus:outline-none"
              />
              <label htmlFor="senhaNova1">Nova senha:</label>
              <input
                id="senhaNova1"
                type="text"
                value={senhaNova1}
                onChange={(e) => setSenhaNova1(e.target.value)}
                className="py-1 px-2   border border-gray-300 focus:border-primary-scooter_500 focus:ring-primary-scooter_500 focus:outline-none"
              />
              <label htmlFor="senhaNova2">Confirmar nova senha:</label>
              <input
                id="senhaNova2"
                type="text"
                value={senhaNova2}
                onChange={(e) => setSenhaNova2(e.target.value)}
                className="py-1 px-2   border border-gray-300 focus:border-primary-scooter_500 focus:ring-primary-scooter_500 focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-500 hover:underline"
              >
                Cancelar
              </button>
              <button
                onClick={handleChangePassword}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditUser;
