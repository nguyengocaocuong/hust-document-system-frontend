import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Stepper from "../components/Stepper";
import BoxBetween from "../containers/BoxBetween";
import MultipleSelect from "../components/MultipleSelect";
const Step1 = ({ handleNextStep }) => {
  return (
    <BoxBetween>
      <Box
        width={"350px"}
        border={"1px dotted gray"}
        textAlign={"center"}
        p={2}
      >
        <Typography variant="h3" color={"text.secondary"} sx={{ mb: 2 }}>
          Bạn muốn viết gì?
        </Typography>
        <Stack spacing={1}>
          <Typography
            onClick={handleNextStep}
            variant="h5"
            sx={{
              fontWeight: "bold",
              p: 0.5,
              backgroundColor: "success.main",
              color: "white",
              width: "auto",
              borderRadius: "25px",
              "&:hover": {
                boxShadow: 5,
              },
              cursor: "pointer",
            }}
          >
            Đăng hỏi bài tập
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              p: 0.5,
              backgroundColor: "warning.main",
              color: "white",
              width: "auto",
              borderRadius: "25px",
              "&:hover": {
                boxShadow: 5,
              },
              cursor: "pointer",
            }}
          >
            Review giảng viên
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              p: 0.5,
              backgroundColor: "info.main",
              color: "white",
              width: "auto",
              borderRadius: "25px",
              "&:hover": {
                boxShadow: 5,
              },
              cursor: "pointer",
            }}
          >
            Review môn học
          </Typography>
        </Stack>
      </Box>
    </BoxBetween>
  );
};
const Step2 = ({ handleNextStep }) => {
  return (
    <BoxBetween>
      <Box
        width={"350px"}
        border={"1px dotted gray"}
        textAlign={"center"}
        p={2}
      >
        <Typography variant="h3" color={"text.secondary"} sx={{ mb: 2 }}>
          Chọn giảng viên muốn review?
        </Typography>
        <MultipleSelect title={'Nhập tên giảng viên'} items={[]} onClick={handleNextStep} hiddenTitle width={'250px'}/>
      </Box>
    </BoxBetween>
  );
};
function Writing() {
  const [activeStep, setActiveStep] = useState(0);
  const handleNextStep = () => {
    setActiveStep(activeStep + 1);
  };
  return (
    <Box width={"100%"} height={"100%"} sx={{ backgroundColor: "white" }}>
      <Stepper activeStep={activeStep}/>
      <Box width={"100%"} height={"calc(100% - 120px)"}>
        {activeStep === 0 && <Step1 handleNextStep={handleNextStep} />}
        {activeStep === 1 && <Step2 handleNextStep={handleNextStep} />}
      </Box>
    </Box>
  );
}

export default Writing;
