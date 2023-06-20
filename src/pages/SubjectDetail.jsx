import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { documentType as type } from "../settings/SubjectSetting";
import DoneIcon from "@mui/icons-material/Done";
import Table from "../components/Table";
const headers = [
  { title: "", width: "119.25px" },
  { title: "Người viết", width: "20%" },
  { title: "Nội dung ", width: "20%" },
  { title: "Trạng thái", width: "8%" },
  { title: "Thời gian đăng", width: "10%" },
  { title: "", width: "15%" },
];

function SubjectDetail() {
  return (
    <Box
      height={"100%"}
      overflow={"hidden"}
      display={"flex"}
      bgcolor={"white"}
      maxWidth={"calc(100vw - 250px)"}
    >
      <Box
        width={"30%"}
        height={"100%"}
        overflow={"auto"}
        borderRight={"1px solid #D8D9D9"}
        p={2}
        boxShadow={5}
      >
        <Typography variant="h2" textAlign={"center"} p={2} pb={3}>
          <strong>MATH 123</strong>
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
                Giải tích 2
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">
                <strong>Mã học phần</strong>
              </Typography>
              <Typography variant="h5" fontWeight={500} color={"gray"}>
                MATH 123
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">
                <strong>Mô tả</strong>
              </Typography>
              <Typography variant="h5" fontWeight={500} color={"gray"}>
                Mô tả môn học
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Divider />
        <Box p={2}>
          <Typography variant="h3">Tài liệu môn học</Typography>
          <Box display={"flex"} flexWrap={"wrap"}>
            {[
              "SLIDE",
              "EXAM",
              "QUIZ",
              "MIDTERM_EXAM",
              "FINAL_EXAM",
              "PROJECT",
              "HOMEWORK",
              "TEXTBOOK",
            ].map((document, index) => (
              <Box p={1} key={index}>
                <Chip
                  color={"primary"}
                  sx={{
                    boxShadow: 0,
                    transform: "box-shadow 0.4s",
                    cursor: "pointer",

                    "&:hover": {
                      boxShadow: 2,
                    },
                    width: "100%",
                  }}
                  label={type[document].title}
                  icon={<DoneIcon />}
                />
              </Box>
            ))}
          </Box>
        </Box>
        <Divider />
      </Box>
      <Box width={"70%"} overflow={"auto"}>
        <Box p={2} width={"100%"} overflow={"hidden"}>
          <Typography variant="h4">Tài liệu môn học</Typography>
          <Box
            width={"100%"}
            overflow={"auto"}
            sx={{ "&::-webkit-scrollbar": { height: "4px" } }}
            py={2}
          >
            <Box display={"flex"} alignItems={"center"}>
              <Stack spacing={2} direction={"row"}>
                {[
                  "SLIDE",
                  "EXAM",
                  "QUIZ",
                  "MIDTERM_EXAM",
                  "FINAL_EXAM",
                  "PROJECT",
                  "HOMEWORK",
                  "TEXTBOOK",
                ].map((document, index) => (
                  <Box
                    key={index}
                    width={"300px"}
                    display={"flex"}
                    alignItems={"center"}
                    borderRadius={2}
                    boxShadow={4}
                    p={1}
                  >
                    <img
                      src={type[document].img}
                      alt=""
                      style={{ width: "100px", height: "100px" }}
                    />
                    <Box px={1}>
                      <Typography variant="h3">
                        {type[document].title}
                      </Typography>
                      <Typography
                        color={type[document].color}
                        fontSize={"20px"}
                      >
                        <strong>12</strong> tài liệu
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>
        <Box p={2} width={"100%"} overflow={"hidden"}>
          <Typography variant="h4">Bài review môn học</Typography>
          <Table
            headers={headers}
            items={[]}
            renderItem={()=><Box height={'110px'}></Box>}
            pageSize={5}
            itemHeight={110}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default SubjectDetail;
