import React from "react";
import BoxFull from "../components/BoxFull";
import ReviewHeader from "../components/review/ReviewHeader";
import ReviewBody from "../components/review/ReviewBody";
import { useGetAllReviewSubjectQuery } from "../services/SubjectService";

function Review() {
  const {data: reviewSubject} = useGetAllReviewSubjectQuery()
  return (
    <BoxFull sx={{ backgroundColor: "white" }} p={2} overflow={'auto'}>
      <ReviewHeader />
      <ReviewBody reviews={reviewSubject}/>
    </BoxFull>
  );
}

export default Review;
