import { Box, Divider, Grid, Pagination, Tooltip, Typography } from "@mui/material";
import React from "react";
import BoxFull from "../components/BoxFull";
import MultipleSelect from "../components/MultipleSelect";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import BoxBetween from "../components/BoxBetween";
import { useState } from "react";
import { useGetAllReportContentReviewSubjectQuery } from "../services/AdminReportContentReviewSubjectService";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useGetAllReportDuplicateSubjectDocumentQuery } from "../services/AdminReportDuplicateSubjectDocumentService";
import { useGetAllReportContentSubjectDocumentQuery } from "../services/AdminReportContentSubjectDocumentService";
import { useGetAllReportContentReviewTeacherQuery } from "../services/AdminReportContentReviewTeacherService";
import Owner from "../components/Owner";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
function Approve() {
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
          Chọn loại bài viết
        </Typography>
        <MultipleSelect items={[]} />
        <Typography fontSize={"17px"} fontWeight={"bold"} mr={1}>
          Chọn đối tượng bị báo cáo
        </Typography>
        <MultipleSelect items={[]} />
      </Box>
      <Box height={"calc(100% - 120px)"} width={"100%"} overflow={"auto"} p={2}>
        <BoxBetween>
          <Box height={"550px"} width="100%">
            <Grid container spacing={2} width={"100%"}>
              {currentData.map((report, index) => (
                <Grid item xl={4} md={6} sm={12} key={index}>
                  <Box
                    width={"100%"}
                    height={"280px"}
                    sx={{
                      backgroundColor: "#F0F0F0",
                      "&:hover": { boxShadow: 4 },
                      cursor: "pointer",
                      transition: "box-shadow 0.4s",
                    }}
                    borderRadius={1}
                    overflow={"hidden"}
                  >
                    <Owner
                      owner={report.owner}
                      createdAt={report.createdAt}
                      listItem={[]}
                    />
                    <Box
                      p={1}
                      pt={0}
                      height={"150px"}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"space-between"}
                      overflow={"hidden"}
                    >
                      <Box
                        width={"100%"}
                        height={"100%"}
                        dangerouslySetInnerHTML={{
                          __html: report?.reviewSubject.review,
                        }}
                        sx={{ backgroundColor: "white", borderRadius: 2, p: 1 }}
                      ></Box>
                    </Box>
                    <Divider />
                    <Box
                      height={"55px"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      px={2}
                    >
                      <Box display={"flex"} alignItems={"center"} width={"65%"}>
                        <Typography
                          fontSize={"15px"}
                          overflow={"hidden"}
                          width={"100%"}
                          noWrap
                        >
                          {report.message}
                        </Typography>
                      </Box>
                      <Box display={"flex"} alignItems={"center"}>
                        <Tooltip title="Xem bài viết">
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            sx={{
                              backgroundColor: "white",
                              width: "35px",
                              height: "35px",
                              cursor: "pointer",
                              borderRadius: 1,
                              boxShadow: 1,
                            }}
                          >
                            <RemoveRedEyeOutlinedIcon color="warning" />
                          </Box>
                        </Tooltip>
                        <Tooltip title="Phê duyệt">
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            sx={{
                              backgroundColor: "white",
                              width: "35px",
                              cursor: "pointer",
                              height: "35px",
                              borderRadius: 1,
                              boxShadow: 1,
                            }}
                            mx={1}
                          >
                            <OfflinePinIcon color="success" />
                          </Box>
                        </Tooltip>
                        <Tooltip title="Từ chối">
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            sx={{
                              backgroundColor: "white",
                              width: "35px",
                              cursor: "pointer",
                              height: "35px",
                              borderRadius: 1,
                              boxShadow: 1,
                            }}
                          >
                            <RemoveCircleOutlineIcon color="error" />
                          </Box>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>
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

export default Approve;
