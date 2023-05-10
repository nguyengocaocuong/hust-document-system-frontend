import React, { useState } from "react";
import BoxFull from "../../../containers/BoxFull";
import { Box } from "@mui/material";
import { useGetAllPostsQuery } from "../../../services/PostService";
import PostDetailtHeader from "./PostDetailtHeader";
import PostDetailtContent from "./PostDetailtContent";
import PostCardDetailtActions from "./PostCardDetailtActions";
import PostDetailtComment from "./PostDetailtComment";
import PostDetailtAnswer from "./PostDetailtAnswer";
const MemoizedChildComponent = React.memo(PostDetailtContent);

function PostDetailt() {
  const { data } = useGetAllPostsQuery();
  const [selectedId, setSelectedId] = useState(null);
  const handleSelectedId = (id) => {
    setSelectedId(id === selectedId ? null : id);
  };
  return (
    <BoxFull sx={{ backgroundColor: "white" }}>
      <Box display={"flex"} height={"100%"}>
        <Box
          width={`70%`}
          borderRight="1px solid #D8D9D9"
          borderBottom="1px solid #D8D9D9"
        >
            <MemoizedChildComponent />
        </Box>
        <Box width={`30%`} borderBottom="1px solid #D8D9D9" pb={2}>
          {/* <PostDetailtHeader data={data?.content[0]} /> */}
          <PostCardDetailtActions
            handleSelectedId={handleSelectedId}
            selectedId={selectedId}
          />
          <Box
            width="100%"
            height={"calc(100% - 186px)"}
            maxHeight={"calc(100% - 186px)"}
            mt={2}
            overflow={"auto"}
          >
            {selectedId === null ? (
              <></>
            ) : selectedId === 2 ? (
              <PostDetailtComment />
            ) : (
              <PostDetailtAnswer />
            )}
          </Box>
        </Box>
      </Box>
    </BoxFull>
  );
}

export default PostDetailt;
