import React from "react";
import BoxFull from "../containers/BoxFull";
import Sidebar from "../containers/sidebar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Content from "../containers/Content";
function WebLayout() {
  const { isLogin } = useSelector((state) => state.authentication);
  return isLogin ? (
    <BoxFull
      maxHeight={"100vh"}
      maxWidth={"100vw"}
      width={"100vw"}
      overflow={"hidden"}
      display={"flex"}
    >
      <Sidebar />
      <Content />
    </BoxFull>
  ) : (
    <Navigate to={"/sign-in"} replace />
  );
}

export default WebLayout;
