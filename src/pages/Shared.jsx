import React from "react";
import { Box, Typography } from "@mui/material";
import ListDocuments from "../components/documents/listDocuments";
import MultipleSelect from "../components/MultipleSelect";
import { filterSetting } from "../settings/SharedSetting";

function Shared() {
  return (
    <Box p={2} width={'100%'} maxWidth={'100%'} overflow={'hidden'}>
      <Box>
        <Typography variant="h4" color={"text.secondary"}>
          Tài liệu được chia sẻ
        </Typography>
        <Box display={"flex"}>
          {filterSetting.map((item, index) => (
            <Box key={index} display={"flex"} alignItems={"center"}>
              <MultipleSelect  title={item.title} items={item.item} />
            </Box>
          ))}
        </Box>
      </Box>
      <ListDocuments />
    </Box>
  );
}

export default Shared;
