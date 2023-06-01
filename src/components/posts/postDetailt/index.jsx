import React from "react";
import BoxFull from "../../../components/BoxFull";
import { Box, Typography } from "@mui/material";
import { useGetPostDetailQuery } from "../../../services/PostService";
import { useParams } from "react-router-dom";
import PostInfo from "./PostInfo";

function PostDetailt() {
  const { id } = useParams();
  const { data: postDetail, isSuccess } = useGetPostDetailQuery(id);
  return isSuccess ? (
    <BoxFull sx={{ backgroundColor: "white" }}>
      <Box display={"flex"} height={"100%"}>
        <Box
          width={`70%`}
          borderRight="1px solid #D8D9D9"
          borderBottom="1px solid #D8D9D9"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          position={"relative"}
        >
          <img
            src={postDetail.document.path}
            alt={postDetail.document.name}
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              width: "auto",
              height: "auto",
            }}
          />
          <Box
            position={"absolute"}
            bottom={0}
            left={0}
            width={"100%"}
            p={2}
            sx={{
              backgroundColor: "gray",
              opacity: "0.1",
              "&:hover": { color: "white", opacity: 1 },
              transition: 'opacity 0.4s'
            }}
          >
            <Typography variant="h6" textAlign={"center"}>
              {postDetail.description}
            </Typography>
          </Box>
        </Box>
        <PostInfo postDetail={postDetail} />
      </Box>
    </BoxFull>
  ) : (
    <></>
  );
}

export default PostDetailt;
