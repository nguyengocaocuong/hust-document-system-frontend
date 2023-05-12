import React from "react";
import BoxFull from "../containers/BoxFull";
import { Outlet } from "react-router-dom";
function UserLayout() {
  return (
    <BoxFull
      width={"calc(100vw - 250px)"}
      height={"100vh"}
      maxHeight={"100vh"}
      maxWidth={"calc(100vw - 250px)"}
      sx={{ backgroundColor: "#E0E0E0" }}
      overflow={"hidden"}
    >
      <Outlet />
    </BoxFull>
  );
}

export default UserLayout;
