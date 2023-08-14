import { Box, Grid, Pagination, Typography } from "@mui/material";
import React from "react";
import BoxFull from "../components/BoxFull";
import MultipleSelect from "../components/MultipleSelect";

import BoxBetween from "../components/BoxBetween";
import { useState } from "react";
import { useGetAllReportContentReviewSubjectQuery } from "../services/AdminReportContentReviewSubjectService";
import ReportCard from "../components/report";
import { useGetAllReportDuplicateSubjectDocumentQuery } from "../services/AdminReportDuplicateSubjectDocumentService";
import { useGetAllReportContentSubjectDocumentQuery } from "../services/AdminReportContentSubjectDocumentService";
import { useGetAllReportContentReviewTeacherQuery } from "../services/AdminReportContentReviewTeacherService";
function Report() {
  const pageSize = 6;
  const { data: reportContentReviewSubject = [] } =
    useGetAllReportContentReviewSubjectQuery();
  const { data: reportDuplicateSubjectDocument = [] } =
    useGetAllReportDuplicateSubjectDocumentQuery();
  const { data: reportContentSubjectDocument = [] } =
    useGetAllReportContentSubjectDocumentQuery();
  const { data: reportContentReviewTeacher = [] } =
    useGetAllReportContentReviewTeacherQuery();

  const reports = [
    ...reportContentReviewSubject?.map((report) => ({
      type: "REVIEW_SUBJECT",
      ...report,
    })),
    ...reportDuplicateSubjectDocument?.map((report) => ({
      type: "DUPLICATE_SUBJECT_DOCUMENT",
      ...report,
    })),
    ...reportContentSubjectDocument?.map((report) => ({
      type: "CONTENT_SUBJECT_DOCUMENT",
      ...report,
    })),
    ...reportContentReviewTeacher?.map((report) => ({
      type: "REVIEW_TEACHER",
      ...report,
    })),
  ];
  const [page, setPage] = useState(1);
  const currentData = [];
  for (
    let i = pageSize * (page - 1);
    i < page * pageSize && i < reports.length;
    i++
  ) {
    currentData.push(reports[i]);
  }

  return (
    <BoxFull sx={{ backgroundColor: "white" }}>
      <Box
        display={"flex"}
        alignItems={"center"}
        height={"60px"}
        sx={{ backgroundColor: "#F0F0F0" }}
        px={2}
      >
        <Typography fontSize={"17px"} fontWeight={"bold"} mr={1}>
          Chọn loại báo cáo
        </Typography>
        <MultipleSelect items={[]} />
        <Typography fontSize={"17px"} fontWeight={"bold"} mr={1}>
          Chọn đối tượng bị báo cáo
        </Typography>
        <MultipleSelect items={[]} />
      </Box>
      <Box height={"calc(100% - 110px)"} width={"100%"} overflow={"auto"} p={2}>
        <BoxBetween>
          <Box width="100%" height={"100%"}>
            <Grid container spacing={2} width={"100%"}>
              {currentData.map((report, index) => (
                <Grid item xl={4} md={6} sm={12} key={index}>
                  <ReportCard report={report} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </BoxBetween>
      </Box>
      <Box
        height={"50px"}
        display={"flex"}
        justifyContent={"end"}
        alignItems={"center"}
        px={3}
      >
        <Pagination
          page={page}
          onChange={(e, value) => setPage(value)}
          count={Math.ceil(reports.length / pageSize)}
          color="primary"
          shape="rounded"
        />
      </Box>
    </BoxFull>
  );
}

export default Report;
