import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import BoxFull from "../components/BoxFull";
import MultipleSelect from "../components/MultipleSelect";

function BabComment() {
  return (
    <BoxFull sx={{ backgroundColor: "white" }}>
      <Box
        display={"flex"}
        alignItems={"center"}
        height={"60px"}
        sx={{ backgroundColor: "#F0F0F0" }}
        px={2}
      >
        <Typography fontSize={"17px"} fontWeight={"bold"} mr={1}>
          Chọn loại bài viết
        </Typography>
        <MultipleSelect items={[]} />
        <Typography fontSize={"17px"} fontWeight={"bold"} mr={1}>
          Chọn đối tượng bị báo cáo
        </Typography>
        <MultipleSelect items={[]} />
      </Box>
      <Box height={"calc(100% - 120px)"} width={"100%"} overflow={"auto"} p={2}>
        <Grid container spacing={2} width={"100%"}>
        <Grid item xl={4} md={6} sm={12}>
          
        </Grid>
        </Grid>
      </Box>
    </BoxFull>
  );
}

export default BabComment;
