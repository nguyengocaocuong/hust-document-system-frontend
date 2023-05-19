import { Box } from "@mui/system";
import React from "react";
import DocumentCard from "../documentsCard";
import { Typography } from "@mui/material";


function ListDocuments({ title, items = [] }) {
  return (
    <Box width={"100%"} maxWidth={"100%"} pt={0} p={2} height={"270px"}>
      <Typography style={{ fontWeight: 600 }} mb={-1}>
        {title}
      </Typography>
      <Box display={"flex"}>
        {items.map((document, index) => (
          <DocumentCard document={document} key={index} />
        ))}
      </Box>
    </Box>
  );
}

export default ListDocuments;
