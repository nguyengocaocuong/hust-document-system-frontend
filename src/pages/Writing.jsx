import { Box } from "@mui/material";
import React, { useState } from "react";
import Stepper from "../components/stepper";
import Step1 from "../components/stepper/Step1";
import Step2 from "../components/stepper/Step2";
import Step3 from "../components/stepper/Step3";
import Step4 from "../components/stepper/Step4";
import Step5 from "../components/stepper/Step5";

function Writing() {
  const [data, setData] = useState({
    activeStep: 0,
    type: null,
    content: null,
  });
  const handleNextStep = () => {
    setData({ ...data, activeStep: data.activeStep + 1 });
  };
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
  const setting = (setting) => {
    setData({
      ...data,
      activeStep: data.activeStep + 1,
      content: { ...data.content, setting },
    });
    console.log(data);
  };
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
        {data.activeStep === 4 && (
          <Step5 handleNextStep={handleNextStep} data={data} />
        )}
      </Box>
    </Box>
  );
}

export default Writing;
