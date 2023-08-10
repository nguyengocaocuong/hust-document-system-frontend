import {
  Box,
  CircularProgress,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useGetRecommendMutation } from "../../services/UserService";
import { useEffect } from "react";
import RecommendCard from "./RecommendCard";
import InfiniteScroll from "react-infinite-scroll-component";

function Recommend() {
  const [getRecommend] = useGetRecommendMutation();
  const [key, setKey] = useState("");
  const [recommends, setRecommends] = useState({
    items: [],
    hasMore: true,
    currentPage: 0,
    size: 4,
  });
  const closeRecommend = (recommend) => {
    setRecommends({
      ...recommends,
      items: recommends.items.filter(
        (item) =>
          item.typeRecommend !== recommend.typeRecommend ||
          item.id !== recommend.id
      ),
    });
  };
  useEffect(() => {
    featchMoreData();
    // eslint-disable-next-line
  }, []);
  const featchMoreData = async () => {
    if (!recommends.hasMore) return;
    const response = await getRecommend({
      page: recommends.currentPage,
      size: recommends.size,
    });
    if (response.data?.length > 0) {
      setRecommends((recommends) => ({
        ...recommends,
        items: [...recommends.items, ...(response.data || [])],
        currentPage: recommends.currentPage + 1,
      }));
    } else {
      setRecommends({ ...recommends, hasMore: false });
    }
  };
  return (
    <Box
      height={"100%"}
      overflow={"hidden"}
      width={"100%"}
      sx={{
        transition: "width 0.04s",
        transitionTimingFunction: "linear",
        backgroundColor: "white",
      }}
    >
      <Stack spacing={2} width={"100%"}>
        <Box pl="10px" p={2} pb={0}>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Có thể bạn quan tâm
          </Typography>
        </Box>
        <Box
          width={"100%"}
          sx={{ height: "40px" }}
          display={"flex"}
          justifyContent={"start"}
          alignItems={"center"}
          p={2}
          pb={0}
        >
          <SearchOutlinedIcon sx={{ fontSize: "30px" }} />
          <InputBase
            sx={{ ml: 1, fontSize: "16px", width: "95%" }}
            placeholder="Bạn muốn tìm gì ..."
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </Box>
        <Box height={"calc(100% - 100px)"} width={"100%"} overflow={"auto"}>
          <InfiniteScroll
            dataLength={recommends.items.length}
            hasMore={recommends.hasMore}
            next={featchMoreData}
            loader={
              <Box p={2} display={"flex"} justifyContent={"center"}>
                <CircularProgress sx={{ width: "25px", height: "25px" }} />
              </Box>
            }
            endMessage={<></>}
            height={643}
            width={"100%"}
          >
            {recommends.items
              .filter((item) => {
                if (key === "") return true;
                let tmp = `${item.owner.firstName} ${item.owner.lastName} ${item.description} `;
                if (
                  item.typeRecommend === "SUBJECT_DOCUMENT" ||
                  item.type !== "LINK"
                )
                  tmp += item.document.name;
                else tmp += item.document.url;
                return tmp.includes(key);
              })
              .sort((a, b) => {
                let dateA = new Date(a.createdAt).getMilliseconds();
                let dateB = new Date(b.createdAt).getMilliseconds();
                return dateB - dateA;
              })
              .map((recommend, index) => (
                <RecommendCard
                  recommend={recommend}
                  key={index}
                  closeRecommend={() => closeRecommend(recommend)}
                />
              ))}
          </InfiniteScroll>
        </Box>
      </Stack>
    </Box>
  );
}

export default Recommend;
