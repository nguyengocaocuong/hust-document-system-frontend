import React from "react";
import BoxFull from "../components/BoxFull";
import Breadcrumbs from "../components/Breadcrumbs";
import { Outlet } from "react-router-dom";

function User() {
  return (
    <BoxFull>
      <Breadcrumbs />
      <Outlet/>
    </BoxFull>
  );
}

export default User;
