import { Box } from "@mui/material";
import React, { useState } from "react";
import DocumentDetailHeader from "./DocumentDetailHeader";
import DocumentDetailAction from "./DocumentDetailAction";
import Comment from '../comment'
import DocumentDetailtAnswer from "./DocumentDetailAnswer";
function DocumentDetailInfo({
  owner = {},
  objectName,
  comments = {},
  answers = [],
  favorites = {}
}) {
  const [selectedId, setSelectedId] = useState(1);
  const handleSelectedId = (id) => {
    setSelectedId(id === selectedId ? null : id);
  };
  return (
    <Box width={`30%`} borderBottom="1px solid #D8D9D9" pb={2}>
      <DocumentDetailHeader owner={owner} objectName={objectName} />
      <DocumentDetailAction
        handleSelectedId={handleSelectedId}
        selectedId={selectedId}
        totalComment={comments.data.length}
        totalAnswer={answers.data.length}
        favorite={favorites}
      />
      <Box
        width="100%"
        height={"calc(100% - 180px)"}
        maxHeight={"calc(100% - 180px)"}
        overflow={"hidden"}
        mt={1}
      >
        {selectedId === null ? (
          <></>
        ) : selectedId === 2 ? (
          <Comment comments={comments} />
        ) : (
          <DocumentDetailtAnswer answers={answers}/>
        )}
      </Box>
    </Box>
  );
}

export default DocumentDetailInfo;
