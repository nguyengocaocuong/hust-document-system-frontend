import React from "react";
import BoxFull from "../components/BoxFull";
import Sidebar from "../components/sidebar";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Box } from "@mui/material";
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
      <BoxFull>
        <Header />
        <Box width={"100%"} height={"calc(100vh - 72px)"} overflow={"hidden"}>
          <Outlet />
        </Box>
      </BoxFull>
    </BoxFull>
  ) : (
    <Navigate to={"/sign-in"} replace />
  );
}

export default WebLayout;
