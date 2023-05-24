import React from "react";
import BoxBetween from "../../components/BoxBetween";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";

const Step5 = ({ reset }) => {
  return (
    <BoxBetween>
      <Box border={"1px dotted gray"} textAlign={"center"} p={2}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          pb={2}
        >
          <Typography variant="h3" color={"text.secondary"}>
            Đăng bài thành công
          </Typography>
        </Box>
        <Button variant="contained" sx={{textTransform:'none'}} onClick={reset}>Viết bài mới</Button>
      </Box>
    </BoxBetween>
  );
};
export default Step5;
