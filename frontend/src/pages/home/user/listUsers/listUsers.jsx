import { Accordion, AccordionTab } from "primereact/accordion";
import "../../../../css/cssAccordion.css";
import { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import { Link } from "react-router";

function ListUsers() {
  const [users, setUsers] = useState([]);

  const listUser = async () => {
    try {
      const response = await api.get("/user/list");
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return listUser;
  }, []);

  return (
    <div
      className=" select-none flex flex-col gap-5 
       sm:bg-slate-300 sm:w-[500px] sm:px-5 sm:py-0   
       2xl:w-[800px]
      "
    >
      {users === null ? (
        <p>Carregando usuarios</p>
      ) : users.length > 0 ? (
        <Accordion className="flex flex-col gap-1">
          {users.map((user) => (
            <AccordionTab
              key={user.id}
              className="p-3 rounded-md shadow-sm"
              header={
                <div className="flex flex-row justify-between items-center">
                  <p className="ml-2 font-serif text-xs 2xl:text-xl">
                    {user?.name || "Sem usuário"}
                  </p>
                </div>
              }
            >
              <div className=" flex flex-row justify-between">
                <p className="text-xs">
                  Última atualização{" "}
                  <strong>
                    {new Date(user.updateAt).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                      timeZone: "America/Sao_Paulo",
                    })}
                  </strong>
                </p>
                <Link
                  to={`/home/user/edit/${user.id}`}
                  className="text-xs hover:underline hover:bg-primary-scooter_300 py-1 px-2 rounded-xl"
                >
                  Editar dados
                </Link>
              </div>
              <div className="flex flex-col">
                    <p><strong className="text-xs">nome: </strong>{user.name}</p>
                    <p><strong className="text-xs">email: </strong>{user.email}</p>
                    <p><strong className="text-xs">usuário: </strong>{user.user}</p>
                    <p><strong className="text-xs">cargo: </strong>{user.position?.name}</p>
              </div>
            </AccordionTab>
          ))}
        </Accordion>
      ) : (
        <p>Nenhum usuario</p>
      )}
    </div>
  );
}

export default ListUsers;
