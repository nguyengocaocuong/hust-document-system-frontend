import React, { useState } from "react";
import BoxFull from "../../../containers/BoxFull";
import { Box, IconButton } from "@mui/material";
import { useGetAllPostsQuery } from "../../../services/PostService";
import PostDetailtHeader from "./PostDetailtHeader";
import SwapHorizSharpIcon from "@mui/icons-material/SwapHorizSharp";
function PostDetailt() {
  const { data } = useGetAllPostsQuery();
  const [leftWidth, setLeftWidth] = useState(70);
  const [dragWidth, setDragWidth] = useState(0);
  const handleDrag = (e) => {
    console.log(e.screenX);
  };
  const handleDragEnter = (e) => {
    console.log(e);
  };
  return (
    <BoxFull sx={{ backgroundColor: "white" }}>
      <Box display={"flex"} height={"60%"}>
        <Box
          width={`${leftWidth}%`}
          borderRight="1px solid #D8D9D9"
          borderBottom="1px solid #D8D9D9"
          p={2}
          position={"relative"}
        >
          <PostDetailtHeader data={data.content[0]} />
          <IconButton
            sx={{
              position: "absolute",
              right: "-18px",
              top: "90%",
              "&:hover": { color: "red", fontWeight: "bold" },
            }}
            onDrag={handleDrag}
            onDragEnter={handleDragEnter}
          >
            <SwapHorizSharpIcon style={{ fontSize: "20px" }} />
          </IconButton>
        </Box>

        <Box
          width={`${100 - leftWidth}%`}
          borderBottom="1px solid #D8D9D9"
          p={2}
        >
          Comment
        </Box>
      </Box>
      <Box width={"100%"} p={2}>
        Answer
      </Box>
    </BoxFull>
  );
}

export default PostDetailt;
