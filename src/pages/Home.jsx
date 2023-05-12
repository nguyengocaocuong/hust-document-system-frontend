import React from "react";
import { useGetAllPostsQuery } from "../services/PostService";
import { Box, Stack } from "@mui/material";
import PostCard from "../components/posts/postCard";
import Recommend from "../containers/recommend";

function Home() {
  const { data } = useGetAllPostsQuery();

  return (
    <Box width={"100%"} display={'flex'} height={'100%'}>
      <Box width={"300%"} borderRight="1px solid #D8D9D9">
        <Box display={"flex"} justifyContent={"center"}>
          <Box width={"60%"} maxWidth={"500px"} pt={2} pb={2}>
            <Stack spacing={2}>
              {data?.content.map((post, index) => (
                <PostCard data={post} key={index} />
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
      <Recommend />
    </Box>
  );
}

export default Home;
