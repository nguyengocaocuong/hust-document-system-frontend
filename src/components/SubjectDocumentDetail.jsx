import React from "react";
import { useParams } from "react-router-dom";
import { useGetSubjectDocumentDetailQuery } from "../services/SubjectService";
import { Box } from "@mui/material";
import DocumentViewer from "./document/DocumentViewer";

import BoxFull from "./BoxFull";
import SubjectDocumentInfo from "./SubjectDocumentInfo";
function SubjectDocumentDetail() {
  const { id } = useParams();
  const { data: subjectDocumentDetail = {}, isSuccess } =
    useGetSubjectDocumentDetailQuery(id);
  return (
    isSuccess && (
      <BoxFull sx={{ backgroundColor: "white" }}>
        <Box display={"flex"} height={"100%"}>
          <Box
            width={`70%`}
            borderRight="1px solid #D8D9D9"
            borderBottom="1px solid #D8D9D9"
          >
            <DocumentViewer
              docs={[
                {
                  uri: `${process.env.REACT_APP_BASE_URL}/api/v1/users/subjects/subjectDocuments/${id}/readFile`,
                  fileName: subjectDocumentDetail.document.name,
                },
              ]}
            />
          </Box>
          <SubjectDocumentInfo subjectDocumentDetail={subjectDocumentDetail} />
        </Box>
      </BoxFull>
    )
  );
}

export default SubjectDocumentDetail;
