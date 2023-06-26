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
  reviews.sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();
    return timeB - timeA;
  });
  return (
    <Box
      width={"100%"}
      height={"calc(100% - 166px)"}
      pb={2}
      overflow={"auto"}
      sx={{ "&::-webkit-scrollbar": { display: "none" } }}
    >
      <Grid container spacing={3}>
        {reviews.map((review, index) => (
          <Grid item xs={12} md={6} lg={4} xl={3} key={index}>
            {review.type === "TEACHER" ? (
              <ReviewTeacherCard
                openModal={openReviewTeacher}
                review={review}
              />
            ) : (
              <ReviewSujectCard openModal={openReviewSubject} review={review} />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ReviewBody;
