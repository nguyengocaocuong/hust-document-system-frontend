import React, { useState } from "react";
import BoxFull from "../../../containers/BoxFull";
import { Box } from "@mui/material";
import { useGetAllPostsQuery } from "../../../services/PostService";
import DocumentDetailtContent from "./DocumentDetailtContent";
import DocumentCardDetailtActions from "./DocumentCardDetailtActions";
import DocumentDetailtComment from "./DocumentDetailtComment";
import DocumentDetailtAnswer from "./DocumentDetailtAnswer";
import DocumentDetailtHeader from "./DocumentDetailtHeader";
const MemoizedChildComponent = React.memo(DocumentDetailtContent);

function PostDetailt() {
  const { data } = useGetAllPostsQuery();
  const [selectedId, setSelectedId] = useState(1);
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
          <DocumentDetailtHeader data={data?.content[0]} />
          <DocumentCardDetailtActions
            handleSelectedId={handleSelectedId}
            selectedId={selectedId}
          />
          <Box
            width="100%"
            height={"calc(100% - 180px)"}
            maxHeight={"calc(100% - 180px)"}
            overflow={"hidden"}
          >
            {selectedId === null ? (
              <></>
            ) : selectedId === 2 ? (
              <DocumentDetailtComment />
            ) : (
              <DocumentDetailtAnswer />
            )}
          </Box>
        </Box>
      </Box>
    </BoxFull>
  );
}

export default PostDetailt;
