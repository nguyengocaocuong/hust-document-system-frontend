import { Box } from "@mui/material";
import React, { useState } from "react";
import Stepper from "../components/stepper";
import Step1 from "../components/stepper/Step1";
import Step2 from "../components/stepper/Step2";
import Step3 from "../components/stepper/Step3";
import Step4 from "../components/stepper/Step4";
import Step5 from "../components/stepper/Step5";
import { useCreatePostMutation, useGetAllPostsQuery } from "../services/PostService";
import { useCreateReviewSubjectMutation } from "../services/ReviewSubjectService";
import { useCreateReviewTeacherMutation } from "../services/ReviewTeacherService";

function Writing() {
  const { refetch: refetchPost } = useGetAllPostsQuery();

  const [createPost] = useCreatePostMutation();
  const [createReviewSubject] = useCreateReviewSubjectMutation();
  const [createReviewTeacher] = useCreateReviewTeacherMutation();
  const [activeStep, setActiveStep] = useState(0);
  const [type, setType] = useState("POST");
  const [body, setBody] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [objectId, setObjectId] = useState(null);
  const selectType = (type) => {
    setType(() => {
      setActiveStep((preState) => preState + 1);
      return type;
    });
  };
  const selectObject = (id) => {
    setObjectId(() => {
      setActiveStep((preState) => preState + 1);
      return id;
    });
  };
  const changeBody = (body) => {
    if (type === "POST")
      setBody(() => {
        setActiveStep((preState) => preState + 1);
        return { description: body?.description, documents: body?.documents };
      });
    else {
      setBody(() => {
        setActiveStep((preState) => preState + 1);
        return {
          content: body,
        };
      });
    }
  };
  const reset = () => {
    setActiveStep(0);
    setObjectId(null);
    setBody(null);
    setType("POST");
    setIsDone(false);
  };
  const upload = () => {
    const formData = new FormData();
    switch (type) {
      case "POST":
        formData.append("subjectId", objectId);
        formData.append("description", body.description);
        formData.append("done", isDone ? 1 : 0);
        body.documents?.forEach((file) => formData.append("documents", file));
        createPost(formData).then(() => {
          setActiveStep((preState) => preState + 1);
          refetchPost()
        });
        break;
      case "REVIEW_SUBJECT":
        formData.append("subjectId", objectId);
        formData.append("review", body?.content);
        formData.append("done", isDone ? 1 : 0);
        createReviewSubject(formData).then((response) => {
          setActiveStep((preState) => preState + 1);
          console.log(response)
        });
        break;
      case "REVIEW_TEACHER":
        formData.append("teacherId", objectId);
        formData.append("review", body?.content);
        formData.append("done", isDone ? 1 : 0);
        createReviewTeacher(formData).then(() => {
          setActiveStep((preState) => preState + 1);
        });
        break;
      default:
        break;
    }
  };
  return (
    <Box width={"100%"} height={"100%"} sx={{ backgroundColor: "white" }}>
      <Stepper activeStep={activeStep} />
      <Box width={"100%"} height={"calc(100% - 120px)"}>
        {activeStep === 0 && <Step1 selectType={selectType} />}
        {activeStep === 1 && (
          <Step2 selectObject={selectObject} data={{ type }} />
        )}
        {activeStep === 2 && <Step3 setContent={changeBody} data={{ type }} />}
        {activeStep === 3 && (
          <Step4 upload={upload} setIsDone={setIsDone} isDone={isDone} />
        )}
        {activeStep === 4 && <Step5 reset={reset} />}
      </Box>
    </Box>
  );
}

export default Writing;
