import React from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import PostCard from "../components/posts/postCard";
import Recommend from "../components/recommend";
import { useState } from "react";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetAllPostsMutation } from "../services/PostService";
function Home() {
  const [getAllPost] = useGetAllPostsMutation();
  const [posts, setPosts] = useState({
    items: [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
  });
  useEffect(() => {
    getAllPost({ page: 0, size: 5 }).then((response) => {
      setPosts(
        { ...response?.data, currentPage: 0 } || {
          items: [],
          totalItems: 0,
          totalPages: 0,
          currentPage: 0,
        }
      );
    });
    // eslint-disable-next-line
  }, []);
  const closePost = (id) => {
    setPosts({ ...posts, items: posts.items.filter((post) => post.id !== id) });
  };
  const featchMoreData = () => {
    if (posts.currentPage >= posts.totalPages) return;
    getAllPost({ page: posts.currentPage, size: 10 }).then((response) => {
      setPosts({
        items: [...posts.items, ...response.data?.items],
        currentPage: posts.currentPage + 1,
        totalItems: response.data.totalItems,
        totalPages: response.data.totalPages,
      });
    });
  };
  return (
    <Box width={"100%"} display={"flex"} height={"100%"}>
      <Box
        width={"70%"}
        borderRight="1px solid #D8D9D9"
        overflow={"auto"}
        height={"100%"}
      >
        <Box width={"100%"}>
          <InfiniteScroll
            dataLength={posts.items.length}
            hasMore={posts.currentPage < posts.totalPages}
            next={featchMoreData}
            loader={
              <Box p={2} display={"flex"} justifyContent={"center"}>
                <CircularProgress sx={{ width: "25px", height: "25px" }} />
              </Box>
            }
            endMessage={<Typography></Typography>}
            height={755}
            width={"100%"}
          >
            <Box display={"flex"} justifyContent={"center"} width={"100%"}>
              <Box
                width={"90%"}
                minWidth={"450px"}
                maxWidth={"650px"}
                pt={2}
                pb={2}
              >
                <Stack spacing={2}>
                  {posts.items
                    .map((post) => (
                      <PostCard
                        data={post}
                        key={post.id}
                        close={() => closePost(post.id)}
                      />
                    ))}
                </Stack>
              </Box>
            </Box>
          </InfiniteScroll>
        </Box>
      </Box>
      <Recommend />
    </Box>
  );
}

export default Home;
