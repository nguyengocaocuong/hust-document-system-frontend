import { Box, Grid } from "@mui/material";
import React from "react";
import ReviewTeacherCard from "./ReviewTeacherCard";
import ReviewSujectCard from "./ReviewSujectCard";
import { useDispatch } from "react-redux";
import {
  openReviewSubjectModal,
  openReviewTeacherModal,
} from "../../store/modalState";
function ReviewBody({ reviews = [] }) {
  const dispatch = useDispatch();
  const openReviewTeacher = (reviewTeacher) => {
    dispatch(openReviewTeacherModal(reviewTeacher));
  };
  const openReviewSubject = (reviewSubject) => {
    dispatch(openReviewSubjectModal(reviewSubject));
  };
  const colLength = [[], [], [], []];
  reviews.sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();
    return timeB - timeA;
  });
  for (var i = 0; i < reviews.length; i++) {
    colLength[i % 4].push(reviews[i]);
  }
  return (
    <Box
      width={"100%"}
      height={"calc(100% - 166px)"}
      pb={2}
      overflow={"auto"}
      sx={{ "&::-webkit-scrollbar": { display: "none" } }}
    >
      <Grid container spacing={3}>
        {colLength.map((colval, index) => (
          <Grid item md={3} key={index}>
            <Box flexDirection={"column"} mt={-3}>
              <Box flexDirection={"column"} mt={-3}>
                {colval.map((review, i) =>
                  review.type === "TEACHER" ? (
                    <ReviewTeacherCard
                      key={`${index}-${i}`}
                      openModal={openReviewTeacher}
                      review={review}
                    />
                  ) : (
                    <ReviewSujectCard
                      key={`${index}-${i}`}
                      openModal={openReviewSubject}
                      review={review}
                    />
                  )
                )}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ReviewBody;
