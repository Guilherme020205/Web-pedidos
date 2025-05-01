import React from "react";
import Header from "./header";

const HeaderWithLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default HeaderWithLayout;
