import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../../../../services/api";

function EditOrder() {
  const { idOrder } = useParams();
  const [listStatus, setListStatus] = useState([]);

  const [newStatus, setNewStatus] = useState("");
  const [viewNewStatus, setViewNewStatus] = useState("");

  const listStatusFromAPI = async () => {
    try {
      const response = await api.get("/status/list");
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    async function fetchStatus() {
      const data = await listStatusFromAPI();
      setListStatus(data);
    }

    fetchStatus();
  }, []);

  async function saveEdit() {
    try {
      const response = await api.put(`/order/edit/${idOrder}`, {
        statusId: newStatus,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="py-10 px-3 flex flex-col select-none
      sm:px-32
      "
    >
      <Link
        to={"/home/order"}
        className="bg-slate-400 flex items-center justify-center w-28 py-1 rounded-md 
            border-[2px] border-transparent 
            hover:bg-slate-100 hover:border-slate-400 hover:border-solid transition duration-700"
      >
        ← Voltar
      </Link>

      <div
        className="bg-gray-700 px-5 w-80 ml-16 mt-5 rounded-xl 
        sm:w-96
        "
      >
        <div className="my-10">
          {listStatus.length > 0 ? (
            <div className="flex flex-col items-center gap-2">
              {listStatus.map((status) => (
                <ul key={status.id}>
                  <li>
                    <button
                      className={`font-serif py-1 px-3 rounded-md
                        ${status.name === "Novo" ? "bg-blue-300" : ""}
                        ${status.name === "Iniciado" ? "bg-yellow-300" : ""}
                        ${status.name === "Entregue" ? "bg-green-300" : ""}
                        ${status.name === "Não devolvido" ? "bg-red-300" : ""}
                        ${status.name === "Finalizado" ? "bg-purple-300" : ""}
                        ${status.name === "Cancelado" ? "bg-gray-300" : ""}
                        `}
                      onClick={() => {
                        setNewStatus(`${status.id}`),
                          setViewNewStatus(`${status.name}`);
                      }}
                    >
                      {status.name}
                    </button>
                  </li>
                </ul>
              ))}
            </div>
          ) : (
            <p>Carregando...</p>
          )}
        </div>

        <div className="mb-10 flex flex-col gap-2">
          <p className="text-gray-50">
            Novo Status: <strong className="text-white">{viewNewStatus}</strong>
          </p>
          <Link
            to={"/home/order"}
            onClick={saveEdit}
            className={`bg-primary-scooter_400 flex items-center justify-center py-1 rounded-md 
            border-[2px] border-transparent 
            hover:bg-primary-scooter_100 hover:border-primary-scooter_400 hover:border-solid transition duration-700
            ${newStatus !== "" ? "visible" : "hidden"}
            `}
          >
            Salvar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EditOrder;
