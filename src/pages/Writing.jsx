import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Stepper from "../components/stepper";
import Step1 from "../components/stepper/Step1";
import Step2 from "../components/stepper/Step2";
import Step3 from "../components/stepper/Step3";
import Step4 from "../components/stepper/Step4";
import Step5 from "../components/stepper/Step5";
import { convertJsonToFormData } from "../utils/ConvertData";
import { useCreatePostMutation } from "../services/PostService";
import { useCreateReviewSubjectMutation } from "../services/ReviewSubjectService";
import { useCreateReviewTeacherMutation } from "../services/ReviewTeacherService";

function Writing() {
  const [createPost, { isSuccess: isPostSuccess }] = useCreatePostMutation();
  const [createReviewSubject, { isSuccess: isReviewSubjectSuccess }] =
    useCreateReviewSubjectMutation();
  const [createReviewTeacher, { isSuccess: isReviewTeacherSuccess }] =
    useCreateReviewTeacherMutation();
  const [data, setData] = useState({
    activeStep: 0,
    type: null,
    content: null,
  });
  const selectType = (type) => {
    setData({ ...data, activeStep: data.activeStep + 1, type });
  };
  const selectObject = (object) => {
    setData({
      ...data,
      activeStep: data.activeStep + 1,
      content: { ...data.content, object },
    });
  };
  const setContent = (html) => {
    setData({
      ...data,
      activeStep: data.activeStep + 1,
      content: { ...data.content, data: html },
    });
  };
  const reset = () => {
    setData({
      activeStep: 0,
      type: null,
      content: null,
    });
  };
  const setting = async (setting) => {
    switch (data.type) {
      case "POST":
        await createPost(
          convertJsonToFormData({
            subjectId: data.content.object,
            content: data.content.data,
            done: setting ? 1 : 0,
          })
        );
        break;
      case "REVIEW_SUBJECT":
        await createReviewSubject(
          convertJsonToFormData({
            subjectId: data.content.object,
            review: data.content.data,
            done: setting ? 1 : 0,
          })
        );
        break;
      case "REVIEW_TEACHER":
        await createReviewTeacher(
          convertJsonToFormData({
            teacherId: data.content.object,
            review: data.content.data,
            done: setting ? 1 : 0,
          })
        );
        break;
        default: break;
    }
  
  };
  useEffect(() => {
    if (
      (isPostSuccess && data.type === "POST") ||
      (isReviewSubjectSuccess && data.type === "REVIEW_SUBJECT") ||
      (isReviewTeacherSuccess && data.type === "REVIEW_TEACHER")
    ) {
      setData({
        ...data,
        activeStep: data.activeStep + 1,
        content: { ...data.content, setting },
      });
    }
  }, [isPostSuccess, isReviewSubjectSuccess, isReviewTeacherSuccess]);
 
  return (
    <Box width={"100%"} height={"100%"} sx={{ backgroundColor: "white" }}>
      <Stepper activeStep={data.activeStep} />
      <Box width={"100%"} height={"calc(100% - 120px)"}>
        {data.activeStep === 0 && <Step1 selectType={selectType} data={data} />}
        {data.activeStep === 1 && (
          <Step2 selectObject={selectObject} data={data} />
        )}
        {data.activeStep === 2 && <Step3 setContent={setContent} data={data} />}
        {data.activeStep === 3 && <Step4 setting={setting} data={data} />}
        {data.activeStep === 4 && <Step5 reset={reset} data={data} />}
      </Box>
    </Box>
  );
}

export default Writing;
