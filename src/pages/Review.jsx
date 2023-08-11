import React, { useEffect } from "react";
import BoxFull from "../components/BoxFull";
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
import Select from "react-select";
import { Stack, Typography } from "@mui/material";

function Review() {
  const { data: reviewSubject = [] } = useGetAllReviewSubjectQuery();
  const { data: reviewTeacher = [] } = useGetAllReviewTeacherQuery();
  const [reviews, setReviews] = useState([]);
  const [reviewTypes] = useState([
    { label: "Review giảng viên", value: "TEACHER" },
    { label: "Review môn học", value: "SUBJECT" },
    { label: "Tất cả bài review", value: "ALL" },
  ]);
  const [selectedReviewType, setSelectedReviewType] = useState({
    value: "ALL",
    label: "Tất cả các bài review",
  });

  const [reviewObjects, setReviewObjects] = useState([
    {
      value: "ALL",
      label: "Tất cả đối tượng",
    },
  ]);
  const [selectedReviewObject, setSelectedReviewObject] = useState({
    value: "ALL",
    label: "Tất cả đối tượng",
  });
  const [writers, setWriters] = useState([
    {
      value: "ALL",
      label: "Tất cả tác giả",
    },
  ]);
  const [selectedWriter, setSelectedWriter] = useState({
    value: "ALL",
    label: "Tất cả tác giả",
  });
  useEffect(() => {
    if (reviewTeacher?.length > 0) {
      setReviewObjects((preState) => {
        const newTeacher = [];
        reviewTeacher.map((review) => {
          if (
            reviewObjects.find((i) => i.value?.id === review.teacher.id) !==
              undefined ||
            newTeacher.find((i) => i.value?.id === review.teacher.id) !==
              undefined
          )
            return false;
          newTeacher.push({
            value: { type: "TEACHER", ...review.teacher },
            label: `Giảng viên ${review.teacher.name}`,
          });
          return true;
        });

        return [...newTeacher, ...preState];
      });
      setWriters((preState) => {
        const newWriter = [];
        reviewTeacher.map((review) => {
          if (
            writers.find((i) => i.value?.id === review.owner.id) !==
              undefined ||
            newWriter.find((i) => i.value?.id === review.owner.id) !== undefined
          )
            return false;
          newWriter.push({
            value: review.owner,
            label: `${review.owner.firstName} ${review.owner.lastName}`,
          });
          return true;
        });
        return [...newWriter, ...preState];
      });
      setReviews((preState) => [
        ...preState,
        ...reviewTeacher.map((review) => ({ ...review, type: "TEACHER" })),
      ]);
    }
    // eslint-disable-next-line
  }, [reviewTeacher]);
  useEffect(() => {
    if (reviewSubject?.length > 0) {
      setReviewObjects((preState) => {
        const newSubject = [];
        reviewSubject.map((review) => {
          if (
            reviewObjects.find((i) => i.value?.id === review.subject.id) !==
              undefined ||
            newSubject.find((i) => i.value?.id === review.subject.id) !==
              undefined
          )
            return false;
          newSubject.push({
            value: { ...review.subject, type: "SUBJECT" },
            label: `Học phần ${review.subject.name}`,
          });
          return true;
        });
        return [...newSubject, ...preState];
      });
      setWriters((preState) => {
        const newWriter = [];
        reviewSubject.map((review) => {
          if (
            writers.find((i) => i.value?.id === review.owner.id) !==
              undefined ||
            newWriter.find((i) => i.value?.id === review.owner.id) !== undefined
          )
            return false;
          newWriter.push({
            value: review.owner,
            label: `${review.owner.firstName} ${review.owner.lastName}`,
          });
          return true;
        });
        return [...newWriter, ...preState];
      });
      setReviews((preState) => [
        ...preState,
        reviewSubject.map((review) => ({ ...review, type: "SUBJECT" })),
      ]);
    }
    // eslint-disable-next-line
  }, [reviewSubject]);
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

  const onSeletedReviewType = (value) => {
    setSelectedReviewType(
      value || {
        value: "ALL",
        label: "Tất cả các bài review",
      }
    );
  };
  const onSeletedReviewObject = (value) => {
    setSelectedReviewObject(
      value || {
        value: "ALL",
        label: "Tất cả đối tượng",
      }
    );
  };
  const onSeletedWriter = (value) => {
    setSelectedWriter(
      value || {
        value: "ALL",
        label: "Tất cả tác giả",
      }
    );
  };
  return (
    <BoxFull sx={{ backgroundColor: "white" }} overflow={"hidden"}>
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
          Chọn loại bài viết
        </Typography>
        <Select
          isClearable
          options={reviewTypes}
          styles={{
            control: (styles) => ({
              ...styles,
              minHeight: "40px",
              width: "300px",
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
          placeholder={"Loại review"}
          value={selectedReviewType}
          onChange={onSeletedReviewType}
        />
        <Typography fontSize={"17px"} fontWeight={"bold"} mr={1}>
          Chọn đối tượng
        </Typography>
        <Select
          isClearable
          options={reviewObjects}
          styles={{
            control: (styles) => ({
              ...styles,
              minHeight: "40px",
              width: "300px",
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
          placeholder={"Chọn đối tượng review"}
          value={selectedReviewObject}
          onChange={onSeletedReviewObject}
        />
        <Typography fontSize={"17px"} fontWeight={"bold"} mr={1}>
          Chọn tác giả
        </Typography>
        <Select
          isClearable
          options={writers}
          styles={{
            control: (styles) => ({
              ...styles,
              minHeight: "40px",
              width: "300px",
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
          placeholder={"Chọn người viết"}
          value={selectedWriter}
          onChange={onSeletedWriter}
        />
      </Stack>
      <ReviewBody
        reviews={reviews.filter((review) => {
          const statusReviewType =
            selectedReviewType.value === "ALL" ||
            review.type === selectedReviewType.value;
          const statusObject =
            selectedReviewObject.value === "ALL" ||
            (selectedReviewObject.value.type === "SUBJECT" &&
              selectedReviewObject.value.id === review.subject?.id) ||
            (selectedReviewObject.value.type === "TEACHER" &&
              selectedReviewObject.value.id === review.teacher?.id);
          const statusWriter =
            selectedWriter.value === "ALL" ||
            selectedWriter.value?.id === review.owner?.id;
          return statusReviewType && statusObject && statusWriter;
        })}
      />
    </BoxFull>
  );
}

export default Review;
