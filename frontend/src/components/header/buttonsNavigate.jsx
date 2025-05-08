import { Link, useLocation } from "react-router-dom";
import "./cssmenu.css";
import "primeicons/primeicons.css";

import { useUserPosition } from './../../context/PositionValidation';

const ButtonsNavigate = () => { 
  const cargo = useUserPosition();
  const location = useLocation(); 


  return (
    <> 
      <Link
        to="/home"
        className={`p-[6px] rounded-full hover:bg-primary-scooter_100 ${
          location.pathname === "/home" ? "bg-primary-scooter_300" : ""
        }`}
      >
        <i className="pi pi-home text-xl"></i>
      </Link>

      {cargo !== "u" && (
      <Link
        to="/home/user"
        className={
          `p-[6px] rounded-full hover:bg-primary-scooter_100 ${
          location.pathname === "/home/user" ? "bg-primary-scooter_300" : ""
        }`}
      >
        <i className="pi pi-users text-xl"></i>
      </Link>
      )}
      <Link
        to="/home/order"
        className={`p-[6px] rounded-full hover:bg-primary-scooter_100 ${
          location.pathname === "/home/order" ? "bg-primary-scooter_300" : ""
        }`}
      >
        <i className="pi pi-book text-xl"></i>
      </Link>
    </>
  );
};

export default  ButtonsNavigate;
