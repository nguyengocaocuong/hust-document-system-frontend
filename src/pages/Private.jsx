import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

function Private() {
  return (
    <Box height={"100%"} maxHeight={"100%"}>
      <Outlet />
    </Box>
  );
}

export default Private;
