import { Link } from "react-router-dom";
import { useUserPosition } from './../../context/PositionValidation';

function ScreenHome() {
  const cargo = useUserPosition();

  return (
    <div
      className="py-10 px-10 select-none
      sm:py-10 sm:px-32
    "
    >
      <h1 className="font-bold text-2xl text-gray-900">Bem-vindo!</h1>
      <div className="flex flex-col justify-start">
        <div className="flex flex-col py-10 gap-5">
          <section className="bg-gray-400 flex flex-col gap-2 p-2 w-[300px]">
            <div className="flex flex-col gap-2 p-3">
              <h2 className="font-bold text-gray-800">Pedidos</h2>
              <div className="flex flex-row gap-10 justify-center">
                <Link
                  to="/home/order"
                  className="group bg-white rounded-xl flex flex-col justify-center items-center max-w-28 w-28 max-h-28 h-28"
                >
                  <i className="pi pi-book text-2xl group-hover:text-3xl transition-all duration-300"></i>
                  <p className="text-xs group-hover:text-2xl group-hover:underline transition-all duration-300 ">
                    Pedidos
                  </p>
                </Link>
                <Link
                  to="/home/order/new"
                  className="group bg-white rounded-xl flex flex-col justify-center items-center max-w-28 w-28 max-h-28 h-28"
                >
                  <i className="pi pi-plus text-2xl group-hover:text-3xl transition-all duration-300"></i>
                  <p className="text-xs group-hover:text-2xl group-hover:underline transition-all duration-300 ">
                    Novo
                  </p>
                  <p className="text-xs group-hover:text-2xl group-hover:underline transition-all duration-300 ">
                    Pedido
                  </p>
                </Link>
              </div>
            </div>
          </section>
          {cargo !== "u" && (
          <section className="bg-gray-400 flex flex-col gap-2 p-2 w-[300px]">
            <div className="flex flex-col gap-2 p-3">
              <h2 className="font-bold text-gray-800">Usuários</h2>
              <div className="flex flex-row gap-10 justify-center">
                <Link
                  to="/home/user/"
                  className="group bg-white rounded-xl flex flex-col justify-center items-center max-w-28 w-28 max-h-28 h-28"
                >
                  <i className="pi pi-book text-2xl group-hover:text-3xl transition-all duration-300"></i>
                  <p className="text-xs group-hover:text-2xl group-hover:underline transition-all duration-300 ">
                    Usuários
                  </p>
                </Link>
                <Link
                  to="/home/user/new"
                  className="group bg-white rounded-xl flex flex-col justify-center items-center max-w-28 w-28 max-h-28 h-28"
                >
                  <i className="pi pi-plus text-2xl group-hover:text-3xl transition-all duration-300"></i>
                  <p className="text-xs group-hover:text-2xl group-hover:underline transition-all duration-300 ">
                    Novo
                  </p>
                  <p className="text-xs group-hover:text-2xl group-hover:underline transition-all duration-300 ">
                    Usuário
                  </p>
                </Link>
              </div>
            </div>
          </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScreenHome;
