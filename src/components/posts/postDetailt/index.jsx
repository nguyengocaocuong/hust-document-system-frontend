import React from "react";
import BoxFull from "../../../containers/BoxFull";
import { Box } from "@mui/material";
import { useGetAllPostsQuery } from "../../../services/PostService";
import PostDetailtHeader from "./PostDetailtHeader";

function PostDetailt() {
    const {data} = useGetAllPostsQuery()
  return (
    <BoxFull sx={{backgroundColor:'white'}}>
      <Box display={"flex"} height={'60%'}>
        <Box
          width={"70%"}
          borderRight="1px solid #D8D9D9"
          borderBottom="1px solid #D8D9D9"
          p={2}
        >
         <PostDetailtHeader data={data.content[0]}/>
        </Box>
        <Box width={"30%"} borderBottom="1px solid #D8D9D9"  p={2}>
          Comment
        </Box>
      </Box>
      <Box width={'100%'}  p={2}>
        Answer
      </Box>
    </BoxFull>
  );
}

export default PostDetailt;
