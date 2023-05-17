import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import QuizIcon from "@mui/icons-material/Quiz";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
const Slide = ({ data = { type: "SLIDE" } }) => {
  return (
    <Box
      width={"calc(100% / 3)"}
      display={"flex"}
      p={2}
      alignItems={"center"}
      height={"200px"}
      justifyContent={"center"}
    >
      <Box
        width={"90%"}
        height={"100%"}
        borderRadius={2}
        sx={{backgroundColor:'#c2e7ff'}}
        p={2}
      >fsfs</Box>
    </Box>
  );
};

function SubjectDetail() {
  return (
    <Box height={"100%"} overflow={"hidden"} display={"flex"}>
      <Box
        width={"30%"}
        height={"100%"}
        overflow={"auto"}
        borderRight={"1px solid #D8D9D9"}
        p={2}
      >
        <Typography variant="h2" textAlign={"center"} p={2} pb={4}>
          <strong>MATH II</strong>
        </Typography>
        <Divider />
        <Box p={2}>
          <Typography variant="h3" pb={1.5}>
            Thông tin học phần
          </Typography>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h6">
                <strong>Tên học phần</strong>
              </Typography>
              <Typography variant="h5" fontWeight={500} color={"gray"}>
                Giải tích II
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">
                <strong>Mã học phần</strong>
              </Typography>
              <Typography variant="h5" fontWeight={500} color={"gray"}>
                MATH 102213
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">
                <strong>Mô tả</strong>
              </Typography>
              <Typography variant="h5" fontWeight={500} color={"gray"}>
                Đa số giải tích 2 là học về tích phân (không phải tích phân như
                cấp 3 đâu mà là tích phân kép, tích phân bội 3, tích phân đường,
                tích phân mặt khá là trìu tượng và khó hiểu). Mặc dù đề cập tới
                các kiến thức khác nhau nhưng kinh nghiệm học các môn giải tích
                hay là các môn của SAMI nói chung là như nhau.
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Divider />
        <Box p={2}>
          <Typography variant="h3" pb={1.5}>
            Tài liệu môn học
          </Typography>
          <Stack spacing={2}>
            <Box display={"flex"} alignItems={"center"} color={"#F78662"}>
              <SlideshowIcon sx={{ width: "25px", height: "25px" }} />{" "}
              <Typography variant="h5" fontWeight={500} pl={1.5}>
                153 slide môn học
              </Typography>
            </Box>
            <Box display={"flex"} alignItems={"center"} color={"#009688"}>
              <QuizIcon sx={{ width: "25px", height: "25px" }} />{" "}
              <Typography variant="h5" fontWeight={500} pl={1.5}>
                23 đề thi
              </Typography>
            </Box>
            <Box display={"flex"} alignItems={"center"} color={"primary.main"}>
              <QuestionAnswerIcon sx={{ width: "25px", height: "25px" }} />{" "}
              <Typography variant="h5" fontWeight={500} pl={1.5}>
                23 đề thi
              </Typography>
            </Box>
            <Box display={"flex"} alignItems={"center"} color={"success.main"}>
              <AccountTreeIcon sx={{ width: "25px", height: "25px" }} />{" "}
              <Typography variant="h5" fontWeight={500} pl={1.5}>
                2 bài tập lớn
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Divider />
      </Box>
      <Box width={"70%"} height={"100%"} overflow={"auto"}>
        <Slide />
      </Box>
    </Box>
  );
}

export default SubjectDetail;
