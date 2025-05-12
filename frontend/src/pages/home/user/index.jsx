import { Link } from "react-router";
import ListUsers from "./listUsers/listUsers";

function ScreenUser() {
  return (
    <div
      className="py-10 px-10 select-none
      sm:py-10 sm:px-32
    "
    >
      <div
        className="
        flex flex-row justify-between items-center mb-5"
      >
        <h2 className="font-bold text-2xl text-gray-900">Usuarios</h2>

        <Link
          to={"/home/user/new"}
          className="bg-primary-scooter_400 text-xs flex items-center justify-center py-1 px-3 rounded-md border-[2px] border-transparent hover:bg-primary-scooter_100 hover:border-primary-scooter_400 hover:border-solid transition duration-700"
        >
          Novo usuário
        </Link>
      </div>
      <div>
        <ListUsers />
      </div>
    </div>
  );
}

export default ScreenUser;
