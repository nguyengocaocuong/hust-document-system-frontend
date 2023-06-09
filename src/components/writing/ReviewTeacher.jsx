import React from "react";
import BoxFull from "../BoxFull";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useGetAllTeacherForFilterQuery } from "../../services/FilterService";
import MultipleSelect from "../MultipleSelect";
import BoxBetween from "../BoxBetween";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import PropperMenu from "../PropperMenu";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import FlagIcon from "@mui/icons-material/Flag";
import Owner from "../Owner";
import Editor from "../Editor";

import { useRef } from "react";
import Actions from "../Actions";
import { useCreateReviewTeacherMutation, useUpdateReviewTeacherMutation } from "../../services/TeacherService";
import { useLocation } from "react-router-dom";
function ReviewTeacher() {
  const location = useLocation();
  const editorRef = useRef(null);
  const { data: teacherFilter = { title: "Giảng viên", item: [] } } =
    useGetAllTeacherForFilterQuery();
  const { user } = useSelector((state) => state.authentication);
  const [teacher, setTeacher] = useState(
    location.state?.reviewTeacher?.teacher.id || ""
  );
  const [liveView, setLiveView] = useState(false);
  const [content, setContent] = useState(
    location.state?.reviewTeacher?.review || ""
  );
  const [isNotify, setNotify] = useState(0);
  const [done, setDone] = useState(location.state?.reviewTeacher.done || false);
  const actions = () => [
    {
      Icon: FlagIcon,
      label: "Báo cáo",
      action: () => {},
    },
    { Icon: CopyAllIcon, label: "Copy link truy cập", action: () => {} },
  ];
  const [createReviewTeacher] = useCreateReviewTeacherMutation();
  const [updateReviewTeacher] = useUpdateReviewTeacherMutation()
  const onCreateReviewTeacher = () => {
    let formData = new FormData();
    formData.append("review", content);
    formData.append("done", done ? 1 : 0);
    if (location.state?.update) {
      updateReviewTeacher({ body: formData, teacherId: teacher, reviewTeacherId: location.state?.reviewTeacher.id })
      .then(() => {
        setTeacher("");
        setLiveView(false);
        setContent("");
        setDone(false);
        setNotify(1);
        setInterval(() => {
          setNotify(0);
        }, 4000);
      })
      .catch(() => {
        setNotify(2);
        setInterval(() => {
          setNotify(0);
        }, 4000);
      });
    } else {
      createReviewTeacher({ body: formData, teacherId: teacher })
        .then(() => {
          setTeacher("");
          setLiveView(false);
          setContent("");
          setDone(false);
          setNotify(1);
          setInterval(() => {
            setNotify(0);
          }, 4000);
        })
        .catch(() => {
          setNotify(2);
          setInterval(() => {
            setNotify(0);
          }, 4000);
        });
    }
  };
  return (
    <BoxFull p={2}>
      <Typography
        variant="h3"
        py={2}
        textAlign={"center"}
        textTransform={"uppercase"}
        bgcolor={"#F0F0F0"}
      >
        Viết bài review giảng viên
      </Typography>
      <Box display={"flex"} width={"100%"}>
        <Box width={liveView ? "60%" : "100%"} height={"100%"} pt={1}>
          <Box
            py={1}
            display={"flex"}
            width={"100%"}
            justifyContent={"space-between"}
          >
            <MultipleSelect
              title={"Chọn giảng viên"}
              width="40%"
              items={teacherFilter.item.map((teacher) => ({
                label: (
                  <Typography style={{ marginLeft: "5px" }}>
                    {teacher.label}
                  </Typography>
                ),
                value: teacher.value,
              }))}
              value={teacher}
              handle={setTeacher}
              hiddenTitle
              all={false}
            />
            <Stack spacing={2} direction={"row"}>
              <Box display={"flex"} alignItems={"center"}>
                <Checkbox value={done} onChange={() => setDone(!done)} />{" "}
                <Typography>Hoàn thành</Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Tooltip title={"Xem bài viết"}>
                  <IconButton
                    color="success"
                    onClick={() => setLiveView(!liveView)}
                  >
                    {liveView ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </Tooltip>
                <Typography>Xem bài viết</Typography>
                {isNotify === 1 && (
                  <Alert
                    severity="success"
                    sx={{
                      width: "300px",
                      height: "40px",
                      px: 1,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Đăng tải bài viết thành công
                  </Alert>
                )}
                {isNotify === 2 && (
                  <Alert
                    severity="error"
                    sx={{
                      width: "300px",
                      height: "40px",
                      px: 1,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Lỗi khi đăng tải bài viết
                  </Alert>
                )}
              </Box>
            </Stack>
          </Box>
          <Editor
            editorRef={editorRef}
            height={550}
            setContent={setContent}
            content={content}
          />
          <Box
            py={1}
            display={"flex"}
            height={"70px"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={onCreateReviewTeacher}
            >
              {location.state?.update ? "Cập nhật" : "Đăng tải bài viết"}
            </Button>
          </Box>
        </Box>
        {liveView && (
          <Box width={"40%"} p={2}>
            <BoxBetween>
              <Box
                bgcolor={"#f7f7f2"}
                borderRadius={1}
                boxShadow={10}
                width={"100%"}
              >
                {" "}
                <Box display={"flex"} alignItems={"center"} p={2}>
                  <Typography
                    variant="h4"
                    textAlign={"center"}
                    width={"calc(100% - 30px)"}
                  >
                    Review giảng viên{" "}
                    <strong>
                      {
                        teacherFilter.item.find((t) => t.value === teacher)
                          ?.label
                      }
                    </strong>
                  </Typography>
                  <IconButton>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Divider />
                <Box
                  maxHeight={"550px"}
                  overflow={"auto"}
                  sx={{
                    "&::-webkit-scrollbar": { display: "none" },
                  }}
                >
                  <Owner
                    owner={user}
                    createdAt={new Date().toDateString()}
                    listItem={[<PropperMenu key={1} action={actions()} />]}
                  />
                  <Box
                    p={2}
                    pt={1}
                    sx={{ backgroundColor: "white", borderRadius: 1 }}
                    minHeight={"350px"}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: content,
                      }}
                      id="review-content"
                    />
                  </Box>
                  <Actions
                    favorite={{
                      data: [],
                      onClick: () => {},
                    }}
                    comment={{
                      data: [],
                      onClick: () => {},
                    }}
                  />
                </Box>
              </Box>
            </BoxBetween>
          </Box>
        )}
      </Box>
    </BoxFull>
  );
}

export default ReviewTeacher;
