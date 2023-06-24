import React from "react";
import { Box, Chip, Pagination, Typography } from "@mui/material";
import { useState } from "react";
function Table({ headers, renderItem, items, pageSize = 4, itemHeight }) {
  const [currentPage, setCurrentPage] = useState(1);
  const currentData = [];
  for (
    let i = pageSize * (currentPage - 1);
    i < currentPage * pageSize && i < items.length;
    i++
  ) {
    currentData.push(items[i]);
  }
  return (
    <Box pt={2}>
      <Box
        justifyContent={"space-between"}
        display={"flex"}
        pt={0}
        pl={1}
        pr={1}
        height={"30px"}
        maxHeight={"30px"}
        width={"100%"}
        textAlign={"left"}
        sx={{ borderBottom: "1px solid gray" }}
      >
        {headers.map((title, index) => (
          <Typography
            key={index}
            sx={{ fontSize: "16px", fontWeight: 700 }}
            width={title.width}
            textAlign={"left"}
          >
            {title.title}
          </Typography>
        ))}
      </Box>
      <Box
        width={"100%"}
        overflow={"hidden"}
        height={`${itemHeight * pageSize}px`}
      >
        {currentData.map((item, index) => renderItem(item, index))}
      </Box>
      <Box display={"flex"} justifyContent={"space-between"} mt={1} pr={2}>
        <Box px={2}>
          <Chip
            color="primary"
            label={
              <Typography>
                Hiển thị <strong>{currentData.length}</strong> trên tổng{" "}
                <strong>{items.length}</strong>
              </Typography>
            }
          ></Chip>
        </Box>
        <Pagination
          page={currentPage}
          count={Math.ceil(items.length / pageSize)}
          variant="text"
          onChange={(e, value) => setCurrentPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
}

export default Table;
