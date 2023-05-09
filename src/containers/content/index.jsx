import React from "react";
import BoxFull from "../BoxFull";
import Header from "../header";
import { Outlet } from "react-router-dom";
function Content() {
  return (
    <BoxFull>
      <Header />
      <Outlet />
    </BoxFull>
  );
}

export default Content;
