import { Box } from "@mui/system";
import React from "react";
import { Typography } from "@mui/material";


function ListItem({ title, itemDatas = [], Item, ...style }) {
  return (
    <Box width={"100%"} maxWidth={"100%"} pt={0} p={2} height={"270px"} {...style}>
      <Typography style={{ fontWeight: 600 }} mb={-1}>
        {title}
      </Typography>
      <Box display={"flex"}>
        {itemDatas.map((item, index) => (
          <Item itemData={item} key={index} />
        ))}
      </Box>
    </Box>
  );
}

export default ListItem;
