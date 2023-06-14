import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGetSubjectDocumentDetailQuery } from "../services/SubjectService";
import { Box } from "@mui/material";
import DocumentViewer from "./document/DocumentViewer";

import BoxFull from "./BoxFull";
import SubjectDocumentInfo from "./SubjectDocumentInfo";
function SubjectDocumentDetail() {
  const location = useLocation();
  const token = location.search?.length > 7 ? location.search.substring(7) : "";
  const { id } = useParams();
  const { data: subjectDocumentDetail = {}, isSuccess } =
    useGetSubjectDocumentDetailQuery(id);
  const [uri, setUri] = useState(
    `${process.env.REACT_APP_BASE_URL}/api/v1/users/subjects/subjectDocument/${id}/readFile?token=${token}`
  );
  const [language, setLanguage] = useState('ROOT');

  const handleSelectLanguage = (value) => {
    setLanguage(() => {
      setUri(
        () =>
          `${process.env.REACT_APP_BASE_URL}/api/v1/users/subjects/subjectDocument/${id}/translate?targetLanguage=${value}&token=${token}`
      );
      return value;
    });
  };
  const resetLanguage = () => {
    setUri(() => {
      setLanguage('ROOT');
      return `${process.env.REACT_APP_BASE_URL}/api/v1/users/subjects/subjectDocument/${id}/readFile?token=${token}`;
    });
  };
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
                  uri,
                  fileName: subjectDocumentDetail.document.name,
                },
              ]}
            />
          </Box>
          <SubjectDocumentInfo
            subjectDocumentDetail={subjectDocumentDetail}
            language={language}
            setLanguage={handleSelectLanguage}
            resetLanguage={resetLanguage}
          />
        </Box>
      </BoxFull>
    )
  );
}

export default SubjectDocumentDetail;
