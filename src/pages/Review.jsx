import React from "react";
import BoxFull from "../components/BoxFull";
import ReviewHeader from "../components/review/ReviewHeader";
import ReviewBody from "../components/review/ReviewBody";
import { useGetAllReviewSubjectQuery } from "../services/SubjectService";
import { useGetAllReviewTeacherQuery } from "../services/TeacherService";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  openReviewSubjectModal,
  openReviewTeacherModal,
} from "../store/modalState";

function Review() {
  const { data: reviewSubject = [] } = useGetAllReviewSubjectQuery();
  const { data: reviewTeacher = [] } = useGetAllReviewTeacherQuery();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  if (searchParams.size === 2) {
    const id = searchParams.get("id");
    const type = searchParams.get("type");
    if (id !== undefined && type !== undefined) {
      if (type === "TEACHER") {
        const review = reviewTeacher?.find(
          (review) => review.id.toString() === id.toString()
        );
        if (review) dispatch(openReviewTeacherModal(review));
      } else {
        const review = reviewSubject?.find(
          (review) => review.id.toString() === id.toString()
        );
        if (review) dispatch(openReviewSubjectModal(review));
      }
    }
  }
  const [type, setType] = useState("ALL");
  const reviews = () => {
    let results = [];
    if (type === "ALL" || type === "SUBJECT")
      results = reviewSubject.map((review) => ({ ...review, type: "SUBJECT" }));
    if (type === "ALL" || type === "TEACHER")
      results = [
        ...results,
        ...reviewTeacher.map((review) => ({ ...review, type: "TEACHER" })),
      ];
    return results;
  };
  return (
    <BoxFull sx={{ backgroundColor: "white" }} p={2} overflow={"hidden"}>
      <ReviewHeader type={type} setType={setType} total={reviews().length} />
      <ReviewBody reviews={reviews()} />
    </BoxFull>
  );
}

export default Review;
