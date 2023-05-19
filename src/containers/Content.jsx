import React from "react";
import BoxFull from "./BoxFull";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
function Content() {
  return (
    <BoxFull>
      <Header />
      <Box width={'100%'} height={'calc(100vh - 72px)'} overflow={'hidden'}>
        <Outlet />
      </Box>
    </BoxFull>
  );
}

export default Content;
