import { Box, Typography } from "@mui/material";
import React from "react";

function TabelHeader({
  headers = [
    { title: "", width: "40px" },
    { title: "Mô tả", width: "50%" },
    { title: "Người chia sẻ", width: "17%" },
    { title: "Loại tài liệu", width: "10%" },
    { title: "Ngày chia sẻ", width: "8%" },
    { title: "", width: "4%" },
  ],
}) {
  return (
    <Box
      display={"flex"}
      pt={0}
      pl={1}
      pr={1}
      height={'30px'}
      maxHeight={'30px'}
      width={"100%"}
      textAlign={"left"}
      sx={{ borderBottom: "1px solid gray" }}
      justifyContent={"space-between"}
    >
      {headers.map((title, index) => (
        <Typography
          key={index}
          sx={{ fontSize: "14px", fontWeight: 700 }}
          width={title.width}
          textAlign={"left"}
        >
          {title.title}
        </Typography>
      ))}
    </Box>
  );
}

export default TabelHeader;
