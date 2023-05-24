import React from "react";
import BoxFull from "../../../components/BoxFull";
import { Box } from "@mui/material";
import DocumentDetailtContent from "./DocumentDetailtContent";
import { useLocation } from "react-router-dom";
import { useGetSubjectDocumentDetailQuery } from "../../../services/SubjectService";
import RightContent from "./RightContent";

function DocumentDetail() {
  const location = useLocation();
  const { subjectDetail, document } = location.state;
  const { data = {}, isSuccess } = useGetSubjectDocumentDetailQuery(
    document.id
  );
  return (
    isSuccess && (
      <BoxFull sx={{ backgroundColor: "white" }}>
        <Box display={"flex"} height={"100%"}>
          <Box
            width={`70%`}
            borderRight="1px solid #D8D9D9"
            borderBottom="1px solid #D8D9D9"
          >
            <DocumentDetailtContent
              document={data}
              subjectDetail={subjectDetail}
            />
          </Box>
         <RightContent data={data} subjectDetail={subjectDetail} document={document}/>
        </Box>
      </BoxFull>
    )
  );
}

export default DocumentDetail;
