import React from "react";
import { useGetAllPostsQuery } from "../services/PostService";
import { Box, Stack } from "@mui/material";
import PostCard from "../components/posts/postCard";

function Home() {
  const { data } = useGetAllPostsQuery();
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Box width={"60%"} maxWidth={'500px'}>
       <Stack spacing={2}>
       {data?.content.map((post, index) => (
          <PostCard data={post} key={index} />
        ))}
       </Stack>
      </Box>
    </Box>
  );
}

export default Home;
