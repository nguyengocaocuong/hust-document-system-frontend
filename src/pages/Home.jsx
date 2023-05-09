import React, { useEffect } from "react";
import { useGetAllPostsQuery } from "../services/PostService";
import { Box, Stack } from "@mui/material";
import PostCard from "../components/posts/postCard";

function Home() {
  const { data, refetch } = useGetAllPostsQuery();
  useEffect(()=>{refetch()},[])
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Box width={"60%"} maxWidth={'500px'} pt={2} pb={2}>
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
