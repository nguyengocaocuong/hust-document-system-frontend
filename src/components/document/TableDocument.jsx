import React from "react";
import { Box } from "@mui/material";
import TableDocumentHeader from "./TableDocumentHeader"
import TableDocumentBody from "./TableDocumentBody"
function TableDocuments() {
  return (
    <Box>
      <TableDocumentHeader />
      <TableDocumentBody/>
    </Box>
  );
}

export default TableDocuments;
