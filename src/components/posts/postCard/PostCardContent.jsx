import React from "react";
import { Box, Typography } from "@mui/material";
function PostCardContent({ data }) {
  return (
    <Box width={"100%"}>
      <Typography variant="h6" color="text.secondary" p={"10px"} pb={"0"}>
        {data.description}
      </Typography>
      <Box width={"100%"}>
        <img src={data.document?.path} alt="?" width={"100%"} />
      </Box>
    </Box>
  );
}

export default PostCardContent;
