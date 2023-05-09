import { Box } from "@mui/material";
import React from "react";
import BoxFull from "../containers/BoxFull";
import { Outlet } from "react-router-dom";
import Recommend from "../containers/recommend"
function UserLayout() {
  return (
    <BoxFull display={"flex"} maxHeight={"100%"}>
      <Box
        width={"300%"}
        height={"100%"}
        overflow={"auto"}
        p={2}
        borderRight="1px solid #D8D9D9"
        sx={{ backgroundColor: "#E0E0E0" }}
      >
        <Outlet/>
      </Box>
      <Box width={"100%"} height={"100%"} overflow={"auto"} p={2}>
        <Recommend/>
      </Box>
    </BoxFull>
  );
}

export default UserLayout;
