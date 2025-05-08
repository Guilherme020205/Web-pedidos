import { Link } from "react-router";

function ScreenUser() {
  return (
    <div
      className="
    py-10 px-5 select-none"
    >
      <div
        className="
        flex flex-row justify-between items-center mb-5"
      >
        <h2 className="font-bold text-2xl text-gray-900">Usuarios</h2>

        <Link
          to={"/home/order/new"}
          className="bg-primary-scooter_400 text-xs flex items-center justify-center py-1 px-3 rounded-md border-[2px] border-transparent hover:bg-primary-scooter_100 hover:border-primary-scooter_400 hover:border-solid transition duration-700"
        >
          Novo Pedido
        </Link>
      </div>
    </div>
  );
}

export default ScreenUser;
