import React from "react";
import { useGetAllPostsQuery } from "../services/PostService";
import { Box, CircularProgress, Stack } from "@mui/material";
import PostCard from "../components/posts/postCard";
import Recommend from "../components/recommend";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function Home() {
  const { data = [] } = useGetAllPostsQuery();
  const [posts, setPosts] = useState(data);
  useEffect(() => {
    setPosts(data);
  }, [data]);
  const closePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };
  const scrollRef = useRef(null);
  const [isShowIconLoading, setShowIconLoading] = useState(false);
  useEffect(() => {
    const element = scrollRef.current;
    const handleScroll = () => {
      if (isShowIconLoading) return;
      if (
        element.scrollTop + element.clientHeight >=
        element.scrollHeight - 1
      ) {
        setShowIconLoading(() => true);
        setTimeout(() => {
          setShowIconLoading(() => false);
        }, 2000);
      }
    };
    element.addEventListener("scroll", handleScroll);
    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  // eslint-disable-next-line
  }, []);
  return (
    <Box width={"100%"} display={"flex"} height={"100%"}>
      <Box
        width={"300%"}
        borderRight="1px solid #D8D9D9"
        overflow={"auto"}
        height={"100%"}
        ref={scrollRef}
      >
        <Box display={"flex"} justifyContent={"center"}>
          <Box width={"60%"} maxWidth={"550px"} pt={2} pb={2}>
            <Stack spacing={2}>
              {posts
                ?.filter((post) => post !== undefined)
                .map((post) => (
                  <PostCard
                    data={post}
                    key={post.id}
                    close={() => closePost(post.id)}
                  />
                ))}
            </Stack>
            {isShowIconLoading && (
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                width={"100%"}
                py={1}
              >
                <CircularProgress
                  color="primary"
                  sx={{ width: "22px", height: "22px" }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Recommend />
    </Box>
  );
}

export default Home;
