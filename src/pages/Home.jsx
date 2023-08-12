import React from "react";
import {
  Box,
  CircularProgress,
  Fab,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import PostCard from "../components/posts/postCard";
import Recommend from "../components/recommend";
import { useState } from "react";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetAllPostsMutation } from "../services/PostService";
import SwitchRightIcon from "@mui/icons-material/SwitchRight";
function Home() {
  const [getAllPost] = useGetAllPostsMutation();
  const [isShowRecomment, setShowRecomment] = useState(true);
  const [showState, setShowState] = useState(1);
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
      setPosts((preState) => {
        const newPosts = response.data?.items.filter(
          (item) => !preState.items.find((i) => item.id === i.id)
        );
        return {
          items: [...posts.items, ...newPosts],
          currentPage: posts.currentPage + 1,
          totalItems: response.data.totalItems,
          totalPages: response.data.totalPages,
        };
      });
    });
  };
  useEffect(() => {
    const handleResize = () => {
      var currentWidth = window.innerWidth;
      if (currentWidth < 1100) {
        setShowRecomment(false);
        return;
      }
      if (currentWidth > 1100) {
        setShowRecomment(true);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Box width={"100%"} display={"flex"} height={"100%"} position={"relative"}>
      <Box
        position={"absolute"}
        top={15}
        right={15}
        display={isShowRecomment ? "none" : "flex"}
        justifyContent={"center"}
        alignItems={"center"}
        borderRadius={"25px"}
        boxShadow={1}
      >
        <Tooltip
          title={
            showState === 1
              ? "Chuyển qua tài liệu gợi ý"
              : "Chuyển về trang home"
          }
        >
          <Fab
            size="small"
            color="error"
            onClick={() => setShowState((preState) => (preState === 1 ? 2 : 1))}
          >
            <SwitchRightIcon />
          </Fab>
        </Tooltip>
      </Box>
      <Box
        width={isShowRecomment ? "70%" : showState === 1 ? "100%" : 0}
        borderRight="1px solid #D8D9D9"
        overflow={"hidden"}
        height={"100%"}
        sx={{ transition: "width 0.3s" }}
      >
        <Box width={"100%"} height={"100%"} overflow={"hidden"}>
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
            height={"calc(100vh - 72px)"}
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
                  {posts.items.map((post) => (
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
      <Box
        width={isShowRecomment ? "30%" : showState === 2 ? "100%" : 0}
        minWidth={isShowRecomment ? "350px" : 0}
        overflow={"hidden"}
        sx={{
          transition: "width 0.2s",
        }}
      >
        <Recommend />
      </Box>
    </Box>
  );
}

export default Home;
