import { Accordion, AccordionTab } from "primereact/accordion";
import { useEffect, useState } from "react";
import { api } from "./../../../../services/api";
import "./cssAccordion.css";
import { Link } from "react-router";
import { useUserPosition } from "../../../../context/PositionValidation";

function ListOrders({ esperaProps }) {
  const cargo = useUserPosition();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const listOrders = async () => {
    try {
      setIsLoading(true);

      if (esperaProps == "null") {
        const response = await api.get("/order/list");
        setOrders(response.data);
      } else {
        const response = await api.get(`/order/list/my/${esperaProps}`);
        setOrders(response.data);
      }
    } catch (error) {
      console.error("Erro ao listar pedidos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (esperaProps === undefined) return;
    listOrders();
  }, [esperaProps]);

  return (
    <div
      className=" select-none flex flex-col gap-5 
       sm:bg-slate-300 sm:w-[500px] sm:px-5 sm:py-0   
       2xl:w-[800px]
      "
    >
      <h2 className="font-bold text-gray-600 text-xs hover:underline select-none hidden sm:block">
        {esperaProps != "null" ? "Meus pedidos:" : "Todos os pedidos:"}
      </h2>

      {isLoading ? (
        <p>Carregando pedidos...</p>
      ) : orders.length > 0 ? (
        <Accordion className="flex flex-col gap-1">
          {orders.map((order) => (
            <AccordionTab
              key={order.id}
              className="p-3 rounded-md shadow-sm"
              header={
                <div className="flex flex-row justify-between items-center">
                  <p 
                  className="ml-2 font-serif text-xs
                    2xl:text-xl
                  "
                  >
                    {order.user?.name || "Sem usuário"}
                  </p>
                  <p
                    className={`font-serif py-1 px-3 rounded-md
                      ${order.status?.name === "Novo" ? "bg-blue-300" : ""}
                      ${
                        order.status?.name === "Iniciado" ? "bg-yellow-300" : ""
                      }
                      ${order.status?.name === "Entregue" ? "bg-green-300" : ""}
                      ${
                        order.status?.name === "Não devolvido"
                          ? "bg-red-300"
                          : ""
                      }
                      ${
                        order.status?.name === "Finalizado"
                          ? "bg-purple-300"
                          : ""
                      }
                      ${order.status?.name === "Cancelado" ? "bg-gray-300" : ""}
                    `}
                  >
                    {order.status?.name || "Sem status"}
                  </p>
                </div>
              }
            >
              <section className="flex flex-row gap-3 justify-between items-center">
                <div className="flex flex-row gap-1">
                  <p className="text-xs">Última atualização do status:</p>
                  <p className="text-xs">
                    {new Date(order.updateAt).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                      timeZone: "America/Sao_Paulo",
                    })}
                  </p>
                </div>

                {cargo !== "u" && (
                  <Link
                    to={`/home/order/edit/${order.id}`}
                    className="text-xs hover:underline hover:bg-green-100 py-1 px-2 rounded-xl"
                  >
                    Editar Status
                  </Link>
                )}
              </section>
              <br />
              <div className="flex flex-row justify-between">
                <p className="flex flex-col text-xs">
                  <strong>Data de Recebimento:</strong>{" "}
                  {new Date(order.receipt_date).toLocaleDateString()}
                </p>
                <p className="flex flex-col text-xs">
                  <strong>Data de Retorno:</strong>{" "}
                  {new Date(order.return_date).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-2">
                <strong>Itens:</strong>
                {order.items && order.items.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {order.items.map((item) => (
                      <li
                        key={item.id}
                        className="flex flex-row justify-between border-b border-gray-300"
                      >
                        <p className="break-words max-w-[calc(100%-160px)]">
                          {item.name}
                        </p>
                        <div className="w-[150px]">
                          <p className="text-left">
                            <strong>Quantidade: </strong>
                            {item.quantity} und
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Sem itens</p>
                )}
              </div>
              <p className="bg-slate-100 my-4 px-2 pt-1 pb-2">
                <strong>Descrição:</strong>{" "}
                {order.description || "Sem descrição"}{" "}
              </p>
            </AccordionTab>
          ))}
        </Accordion>
      ) : (
        <p>Nenhum pedido encontrado.</p>
      )}
    </div>
  );
}

export default ListOrders;
