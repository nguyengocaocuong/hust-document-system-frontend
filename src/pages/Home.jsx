import React from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import PostCard from "../components/posts/postCard";
import Recommend from "../components/recommend";
import { useState } from "react";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetAllPostsMutation } from "../services/PostService";
import MultipleSelect from "../components/MultipleSelect";
function Home() {
  const [getAllPost] = useGetAllPostsMutation();
  const [posts, setPosts] = useState({
    items: [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
  });
  const [filterState, setFilterState] = useState({
    subjectId: "all",
    ownerId: "all",
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
  }, []);
  const closePost = (id) => {
    setPosts({ ...posts, items: posts.items.filter((post) => post.id !== id) });
  };
  const featchMoreData = () => {
    if (posts.currentPage >= posts.totalPages) return;
    getAllPost({ page: posts.currentPage + 1, size: 8 }).then((response) => {
      setPosts({
        items: [...posts.items, ...response.data?.items],
        currentPage: posts.currentPage + 1,
        totalItems: response.data.totalItems,
        totalPages: response.data.totalPages,
      });
    });
  };
  const getOwners = () => {
    const owners = [];
    const subjects = [];
    for (let i = 0; i < posts.items.length; i++) {
      let tag = 0;
      for (let j = 0; j < owners.length; j++)
        if (owners[j].id === posts.items[i].owner.id) {
          tag = 1;
          break;
        }
      if (tag === 0) owners.push(posts.items[i].owner);
    }
    for (let i = 0; i < posts.items.length; i++) {
      let tag = 0;
      for (let j = 0; j < subjects.length; j++)
        if (subjects[j].id === posts.items[i].subject.id) {
          tag = 1;
          break;
        }
      if (tag === 0) subjects.push(posts.items[i].subject);
    }
    return [owners, subjects];
  };
  return (
    <Box width={"100%"} display={"flex"} height={"100%"}>
      <Box
        width={"75%"}
        borderRight="1px solid #D8D9D9"
        overflow={"auto"}
        height={"100%"}
      >
        <Box display={"flex"} width={"100%"}>
          <Box width={"25%"} p={2}>
            <Box width={"100%"} height={400} p={2}>
              <Typography
                variant="h3"
                fontWeight={"bold"}
                color="text.secondary"
                pb={3}
              >
                Lọc bài viết
              </Typography>
              <Stack spacing={2.5}>
                <MultipleSelect
                  width="100%"
                  title={"Môn học"}
                  items={getOwners()[1].map((subject) => ({
                    label: (
                      <Typography style={{ marginLeft: "5px" }}>
                        {subject.name}
                      </Typography>
                    ),
                    value: subject.id,
                  }))}
                  value={filterState.subjectId}
                  handle={(subjectId) => {
                    setFilterState({ ...filterState, subjectId });
                  }}
                  hiddenTitle
                  all={true}
                  size="small"
                />
                <MultipleSelect
                  width="100%"
                  title={"Người đăng"}
                  items={getOwners()[0].map((owner) => ({
                    label: (
                      <Typography style={{ marginLeft: "5px" }}>
                        {`${owner.firstName} ${owner.lastName}`}
                      </Typography>
                    ),
                    value: owner.id,
                  }))}
                  value={filterState.ownerId}
                  handle={(ownerId) => {
                    setFilterState({ ...filterState, ownerId });
                  }}
                  hiddenTitle
                  all={true}
                  size="small"
                />
              </Stack>
            </Box>
          </Box>
          <Box width={"75%"}>
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
                      ?.filter(
                        (post) =>
                          post !== undefined &&
                          (filterState.subjectId === "all" ||
                            post.subject.id === filterState.subjectId) &&
                          (filterState.ownerId === "all" ||
                            post.owner.id === filterState.ownerId)
                      )
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
      </Box>
      <Box width={"25%"}>
        <Recommend />
      </Box>
    </Box>
  );
}

export default Home;
