import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import QuizIcon from "@mui/icons-material/Quiz";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import slideImg from "../../assets/images/document/slide.png";
import ebookImg from "../../assets/images/document/ebook.png";
import projectImg from "../../assets/images/document/project.png";
import exameImg from "../../assets/images/document/exam.png";
import ideaImg from "../../assets/images/document/idea.png";
import homeworkImg from "../../assets/images/document/homework.png";
const items = [
  { title: "Slide môn học", subTitle:'Slide',img: slideImg, color: "#FF9F00" },
  { title: "Tài liệu tham khảo",subTitle: 'Tài liệu', img: ebookImg, color: "#F55A8E" },
  { title: "Đề tài bài tập lớn", subTitle: 'Đề tài',img: projectImg, color: "#8F9FF5" },
  { title: "Đề thi", img: exameImg,subTitle:'Đề thi', color: "#B49CFE" },
  { title: "Bài tập về nhà",subTitle:'Bài tập', img: homeworkImg, color: "#EB5569" },
  { title: "Các tài liệu khác",subTitle:'Tài liệu', img: ideaImg, color: "#7974E3" },
];
const Slide = ({ data = { title: "Slide môn học", img: slideImg } }) => {
  return (
    <Box
      width={"50%"}
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
        sx={{
          backgroundColor: "#c2e7ff",
          transition: "box-shadow 0.4s",
          "&:hover": { boxShadow: 4 },
          cursor: "pointer",
        }}
        p={2}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          height={"30px"}
          pb={1}
        >
          <Typography variant="h5" fontWeight={700}>
            {data.title}
          </Typography>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>
        <Box
          width={"100%"}
          height={"120px"}
          display={"flex"}
          alignItems={"center"}
        >
          <img src={data.img} width={"100x"} alt="" />
          <Box p={2} height={"100%"}>
            <Typography variant="h3" fontWeight={700} color={data.color}>
              {Math.round(Math.random()*300)} {data.subTitle}{" "}
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              được chia sẻ bởi mọi người{" "}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

function SubjectDetail() {
  const [selected, setSelected] = useState(null);
  return (
    <Box height={"100%"} overflow={"hidden"} display={"flex"} bgcolor={"white"}>
      <Box
        width={"30%"}
        height={"100%"}
        overflow={"auto"}
        borderRight={"1px solid #D8D9D9"}
        p={2}
        boxShadow={5}
      >
        <Typography variant="h2" textAlign={"center"} p={2} pb={3}>
          <strong>MATH II</strong>
        </Typography>
        <Divider />
        <Box p={2}>
          <Typography variant="h3">Thông tin học phần</Typography>
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
          <Typography variant="h3">Tài liệu môn học</Typography>
          <Box overflow={"auto"} display={"flex"} flexWrap={"wrap"}>
            <Box
              display={"flex"}
              alignItems={"center"}
              color={"#F78662"}
              p={1}
              width={"50%"}
            >
              <SlideshowIcon sx={{ width: "25px", height: "25px" }} />{" "}
              <Typography variant="h5" fontWeight={500} pl={1.5}>
                153 slide
              </Typography>
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              color={"#009688"}
              width={"50%"}
              p={1}
            >
              <QuizIcon sx={{ width: "25px", height: "25px" }} />{" "}
              <Typography variant="h5" fontWeight={500} pl={1.5}>
                23 đề thi
              </Typography>
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              color={"primary.main"}
              width={"50%"}
              p={1}
            >
              <QuestionAnswerIcon sx={{ width: "25px", height: "25px" }} />{" "}
              <Typography variant="h5" fontWeight={500} pl={1.5}>
                23 đáp án
              </Typography>
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              color={"success.main"}
              width={"50%"}
              p={1}
            >
              <AccountTreeIcon sx={{ width: "25px", height: "25px" }} />{" "}
              <Typography variant="h5" fontWeight={500} pl={1.5}>
                2 bài tập lớn
              </Typography>
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              color={"success.main"}
              width={"50%"}
              p={1}
            >
              <AccountTreeIcon sx={{ width: "25px", height: "25px" }} />{" "}
              <Typography variant="h5" fontWeight={500} pl={1.5}>
                2 bài tập lớn
              </Typography>
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              color={"success.main"}
              width={"50%"}
              p={0.5}
            >
              <AccountTreeIcon sx={{ width: "25px", height: "25px" }} />{" "}
              <Typography variant="h5" fontWeight={500} pl={1.5}>
                2 bài tập lớn
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
      </Box>
      <Box
        width={"70%"}
        overflow={"auto"}
        display={"flex"}
        flexWrap={"wrap"}
        bgColor={"transparent"}
      >
        {items.map((item, index) => (
          <Slide key={index} data={item} />
        ))}
      </Box>
    </Box>
  );
}

export default SubjectDetail;
