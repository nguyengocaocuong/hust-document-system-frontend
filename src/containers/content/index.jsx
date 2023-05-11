import React from "react";
import BoxFull from "../BoxFull";
import Header from "../header";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
function Content() {
  return (
    <BoxFull>
      <Header width={'calc(100% - 250px)'}/>
      <Box width={'calc(100% - 250px)'} height={'calc(100vh - 72px)'} overflow={'hidden'}>
        <Outlet />
      </Box>
    </BoxFull>
  );
}

export default Content;
