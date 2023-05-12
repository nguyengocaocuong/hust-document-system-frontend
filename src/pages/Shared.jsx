import React from "react";
import { Box, Typography } from "@mui/material";
import ListDocuments from "../components/documents/listDocuments";
import MultipleSelect from "../components/MultipleSelect";
import { filterSetting } from "../settings/SharedSetting";
import TableDocuments from "../components/documents/tableDocuments";

function Shared() {
  return (
    <Box
      pt={2}
      width={"100%"}
      height={"100%"}
      overflow={"hidden"}
      sx={{ backgroundColor: "white" }}
    >
      <Box pt={0} p={2}>
        <Typography variant="h4" color={"text.secondary"}>
          Tài liệu được chia sẻ
        </Typography>
        <Box display={"flex"}>
          {filterSetting.map((item, index) => (
            <Box key={index} display={"flex"} alignItems={"center"}>
              <MultipleSelect title={item.title} items={item.item} />
            </Box>
          ))}
        </Box>
      </Box>
      <ListDocuments />
      <TableDocuments />
    </Box>
  );
}

export default Shared;
