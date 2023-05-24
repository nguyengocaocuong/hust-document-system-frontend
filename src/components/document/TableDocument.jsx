import React from "react";
import TabelHeader from "./TableHeader";
import TableContent from "./TableContent";
import { Box } from "@mui/material";

function TableDocuments() {
  return (
    <Box>
      <TabelHeader />
      <TableContent/>
    </Box>
  );
}

export default TableDocuments;
