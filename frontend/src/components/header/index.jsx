import React, { useRef, useContext } from "react";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "primeicons/primeicons.css";
import "./cssmenu.css";
import { AuthContext } from "../../context/AuthContext";

const logo = "";

const Header = () => {
  const menuRight = useRef(null);
  const toast = useRef(null);

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const items = [
    {
      items: [
        {
          label: "Sair",
          icon: "pi pi-sign-out",
          command: () => {
            logout();
            navigate("/login");
          },
        },
      ],
    },
  ];

  const location = useLocation();

  return (
    <div className="bg-blue-300 h-11 flex flex-row justify-between items-center px-[5%]">
      {logo ? <img src={logo} alt="logo" className="w-32" /> : <p>Logo</p>}
      <div className="flex flex-row gap-4">
        <Link
          to="/home"
          className={`p-[6px] rounded-full hover:bg-blue-100 ${
            location.pathname === "/home" ? "bg-white" : ""
          }`}
        >
          <i className="pi pi-home text-xl"></i>
        </Link>

        <Link
          to="/"
          className={`p-[6px] rounded-full hover:bg-blue-100 ${
            location.pathname === "/" ? "bg-white" : ""
          }`}
        >
          <i className="pi pi-users text-xl"></i>
        </Link>

        <Link
          to="/"
          className={`p-[6px] rounded-full hover:bg-blue-100 ${
            location.pathname === "/" ? "bg-white" : ""
          }`}
        >
          <i className="pi pi-book text-xl"></i>
        </Link>
      </div>
      <div>
        <div className="card flex justify-content-center">
          <Toast ref={toast}></Toast>
          <Menu
            model={items}
            popup
            ref={menuRight}
            id="popup_menu_right"
            popupAlignment="right"
            className="bg-white rounded-lg px-3 py-1 gap-2"
          />
          <Button
            icon="pi pi-align-right"
            onClick={(event) => menuRight.current.toggle(event)}
            aria-controls="popup_menu_right"
            aria-haspopup
            className="mr-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
