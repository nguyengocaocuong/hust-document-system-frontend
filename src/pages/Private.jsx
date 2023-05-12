import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

function Private() {
  return (
    <Box p={2}>
      <Outlet />
    </Box>
  );
}

export default Private;
