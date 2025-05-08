import React, { useRef, useContext } from "react";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import "primeicons/primeicons.css";

import { AuthContext } from "../../context/AuthContext";
import ButtonsNavigate from "./buttonsNavigate";

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
            navigate("/");
          },
        },
      ],
    },
  ];

  return (
    <div className="bg-primary-scooter_500 h-11 flex flex-row justify-between items-center px-[5%]">
      {logo ? <img src={logo} alt="logo" className="w-32" /> : <p>Logo</p>}

      <div className="flex flex-row gap-4">
        <ButtonsNavigate/>
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
            className="bg-white rounded-lg px-3 py-1 gap-2 "
          />
          <Button
            icon="pi pi-align-right"
            onClick={(event) => menuRight.current.toggle(event)}
            aria-controls="popup_menu_right"
            aria-haspopup
            className="mr-2 "
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
