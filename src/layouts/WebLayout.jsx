import React from "react";
import BoxFull from "../containers/BoxFull";
import Sidebar from "../containers/sidebar";
import Content from "../containers/content";
import { Box } from "@mui/material";
function WebLayout() {
  return (
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
  );
}

export default WebLayout;
