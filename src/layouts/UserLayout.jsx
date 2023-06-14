import React from "react";
import BoxFull from "../components/BoxFull";
import { Outlet } from "react-router-dom";
import Modal from "../components/modal";
function UserLayout() {
  return (
    <BoxFull
      height={"100vh"}
      maxHeight={"100vh"}
      sx={{ backgroundColor: "#E0E0E0" }}
      overflow={"hidden"}
    >
      <Outlet />
      <Modal />
    </BoxFull>
  );
}

export default UserLayout;
