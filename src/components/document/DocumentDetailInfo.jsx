import { Box } from "@mui/material";
import React, { useState } from "react";
import DocumentDetailtHeader from "./DocumentDetailtHeader";
import DocumentCardDetailtActions from "./DocumentCardDetailtActions";
import Comment from "../../comment";
import DocumentDetailtAnswer from "./DocumentDetailtAnswer";

function DocumentDetailInfo({data, subjectDetail, document}) {
  const [selectedId, setSelectedId] = useState(1);
  const handleSelectedId = (id) => {
    setSelectedId(id === selectedId ? null : id);
  };
  return (
    <Box width={`30%`} borderBottom="1px solid #D8D9D9" pb={2}>
      <DocumentDetailtHeader document={data} subjectDetail={subjectDetail} />
      <DocumentCardDetailtActions
        handleSelectedId={handleSelectedId}
        document={data}
        selectedId={selectedId}
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
          <Comment subjectDocumentId={document.id} type={"SUBJECT_DOCUMENT"} />
        ) : (
          <DocumentDetailtAnswer />
        )}
      </Box>
    </Box>
  );
}

export default DocumentDetailInfo;
