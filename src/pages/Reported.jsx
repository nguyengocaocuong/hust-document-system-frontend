import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";
import React from "react";
import BoxFull from "../components/BoxFull";
import Select from "react-select";
import BoxBetween from "../components/BoxBetween";
import { useState } from "react";
import ReportCard from "../components/reported";
import { useGetAllReportedMutation } from "../services/SubjectService";
import { useEffect } from "react";

function Reported() {
  const pageSize = 6;
  const [getAllReported] = useGetAllReportedMutation();
  const [reportType, setReportType] = useState({
    value: "ALL",
    label: "Tất cả các báo cáo",
  });
  const [reports, setReports] = useState([]);
  useEffect(() => {
    getAllReported().then((response) => {
      if (!response.error) {
        setReports([
          ...response.data?.content.reportContentReviewSubjects.map(
            (report) => ({
              type: "REVIEW_SUBJECT",
              ...report,
            })
          ),
          ...response.data?.content.reportContentReviewTeachers.map(
            (report) => ({
              type: "REVIEW_TEACHER",
              ...report,
            })
          ),
          ...response.data?.content.reportContentSubjectDocuments.map(
            (report) => ({
              type: "CONTENT_SUBJECT_DOCUMENT",
              ...report,
            })
          ),
          ...response.data?.content.reportDuplicateSubjectDocuments.map(
            (report) => ({
              type: "DUPLICATE_SUBJECT_DOCUMENT",
              ...report,
            })
          ),
        ]);
      }
    });
    // eslint-disable-next-line
  }, []);

  const [page, setPage] = useState(1);
  const currentData = [];
  for (
    let i = pageSize * (page - 1);
    i < page * pageSize && i < reports.length;
    i++
  ) {
    currentData.push(reports[i]);
  }

  const onSelectReportType = (type) => {
    if (type) setReportType(type);
    else setReportType({ value: "ALL", label: "Tất cả các báo cáo" });
  };

  return (
    <BoxFull sx={{ backgroundColor: "white" }}>
      <Stack
        zIndex={200}
        spacing={1.5}
        direction={"row"}
        display={"flex"}
        alignItems={"center"}
        height={"60px"}
        sx={{ backgroundColor: "#F0F0F0" }}
        px={2}
      >
        <Typography fontSize={"17px"} fontWeight={"bold"} mr={1}>
          Chọn loại báo cáo
        </Typography>
        <Select
          isClearable
          options={[
            {
              label: "Báo cáo bài review giảng viên",
              value: "REVIEW_SUBJECT",
            },
            { label: "Báo cáo bài review môn học", value: "REVIEW_TEACHER" },
            {
              label: "Báo cáo nội dung môn học",
              value: "CONTENT_SUBJECT_DOCUMENT",
            },
            {
              label: "Báo cáo tài liệu môn học trùng nhau",
              value: "DUPLICATE_SUBJECT_DOCUMENT",
            },
            {
              label: "Tất cả báo cáo",
              value: "ALL",
            },
          ]}
          styles={{
            control: (styles) => ({
              ...styles,
              minHeight: "40px",
              width: "500px",
            }),
            multiValueLabel: (styles) => ({
              ...styles,
              fontSize: "18px",
            }),
            singleValue: (styles) => ({
              ...styles,
              fontSize: "18px",
            }),
            placeholder: (styles) => ({ ...styles, fontSize: "18px" }),
          }}
          value={reportType}
          placeholder={"Chọn loại báo cáo"}
          onChange={onSelectReportType}
        />
      </Stack>
      <Box height={"calc(100% - 120px)"} width={"100%"} overflow={"auto"} p={2}>
        <BoxBetween>
          <Box height={"550px"} width="100%">
            <Grid container spacing={2} width={"100%"}>
              {currentData
                .filter(
                  (report) =>
                    reportType.value === "ALL" ||
                    report.type === reportType.value
                )
                .map((report, index) => (
                  <Grid item xl={4} md={6} sm={12} key={index}>
                    <ReportCard report={report} />
                  </Grid>
                ))}
            </Grid>
          </Box>
        </BoxBetween>
      </Box>
      <Box
        height={"60px"}
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

export default Reported;
