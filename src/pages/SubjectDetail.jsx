import { Box, Chip, Divider, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import { documentType as type } from "../settings/SubjectSetting";
import DoneIcon from "@mui/icons-material/Done";
import Table from "../components/Table";
import subjectIcon from "../assets/images/document/homework.png";
import { formatTimeAgo } from "../utils/ConvertDate";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import EditOffIcon from "@mui/icons-material/EditOff";
const headers = [
  { title: "", width: "119.25px" },
  { title: "Người viết", width: "20%" },
  { title: "Nội dung ", width: "20%" },
  { title: "Trạng thái", width: "8%" },
  { title: "Thời gian đăng", width: "10%" },
  { title: "", width: "15%" },
];

function SubjectDetail() {
 
  const renderItem = (item, key) => (
    <Box
      key={key}
      pl={1}
      pr={1}
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      sx={{
        borderBottom: "1px solid #D9DFED",
        transition: "backgroundColor 0.4s",
        "&:hover": { backgroundColor: "#D9DFED" },
        cursor: "pointer",
      }}
      height={"110px"}
      maxHeight={"110px"}
      justifyContent={"space-between"}
    >
      <Box
        width={"110px"}
        overflow={"hidden"}
        display={"flex"}
        alignItems={"center"}
      >
        <Box
          width={"105px"}
          height={"105px"}
          overflow={"hidden"}
          sx={{ borderRadius: 1, boxShadow: 2 }}
        >
          <img
            src={subjectIcon}
            width={"100%"}
            height={"auto"}
            style={{
              maxHeight: "110px",
            }}
            alt=""
          />
        </Box>
      </Box>
      <Typography
        sx={{ fontWeight: "bold", width: "17%" }}
        color={"primary.main"}
      >
        {item.subject.name}
      </Typography>
      <Box width={"12%"}>
        <Typography fontWeight={700}>Review môn học</Typography>
      </Box>
      <Box width={"20%"}>
        {
          <Box
            sx={{
              width: "100%",
              height: "105px",
              overflow: "hidden",
              background: "white",
              padding: "0 3px",
              borderRadius: "8px",
              "&:hover": {
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              },
            }}
            dangerouslySetInnerHTML={{ __html: item?.review }}
            id="review-content"
          />
        }
      </Box>
      <Box width={"8%"}>
        <Chip
          label={item.done ? "Hoàn thành" : "Đang viết"}
          color={item.done ? "success" : "warning"}
        />
      </Box>
      <Typography sx={{ fontSize: "13px" }} width={"10%"}>
        {formatTimeAgo(item?.createdAt)}
      </Typography>
      <Box
        width={"15%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"end"}
        onClick={(e) => e.stopPropagation()}
      >
        <Box
          sx={{
            opacity: "0.3",
            transition: "opacity 0.4s",
            "&:hover": {
              opacity: 1,
              backgroundColor: "white",
            },
            borderRadius: "25px",
            px: 1.5,
          }}
        >
          <Tooltip title={"Chỉnh sửa bài viết"}>
            <IconButton>
              <EditOffIcon
                color={"warning"}
                sx={{ width: "18px", height: "18px" }}
              />
            </IconButton>
          </Tooltip>
          {item.done && (
            <Tooltip title={"Xem bài viết"}>
              <IconButton >
                <RemoveRedEyeIcon
                  color={"success"}
                  sx={{ width: "18px", height: "18px" }}
                />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title={"Copy link truy cập"}>
            <IconButton>
              <CopyAllIcon
                color={"info"}
                sx={{ width: "18px", height: "18px" }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Xóa bài viết"}>
            <IconButton>
              <DeleteIcon
                color={"error"}
                sx={{ width: "18px", height: "18px" }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
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
          <Table
            headers={headers}
            items={[]}
            renderItem={renderItem}
            pageSize={5}
            itemHeight={110}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default SubjectDetail;
