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
  CircularProgress,
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
import {
  useCreateReviewTeacherMutation,
  useUpdateReviewTeacherMutation,
} from "../../services/TeacherService";
import { useLocation } from "react-router-dom";
function ReviewTeacher() {
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ isShow: false, status: false });
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
  const [updateReviewTeacher] = useUpdateReviewTeacherMutation();
  const onCreateReviewTeacher = () => {
    setLoading(true);
    let formData = new FormData();
    formData.append("review", content);
    formData.append("done", done ? 1 : 0);
    if (location.state?.update) {
      updateReviewTeacher({
        body: formData,
        teacherId: teacher,
        reviewTeacherId: location.state?.reviewTeacher.id,
      }).then((response) => {
        if (!response.error) {
          setAlert({ isShow: true, status: true });
          setTimeout(() => {
            setAlert({ isShow: false, status: true });
          }, 4000);
          setTeacher("");
          setLiveView(false);
          setContent("");
          setDone(false);
          setLoading(false);
        } else {
          setAlert({ isShow: true, status: false });
          setTimeout(() => {
            setAlert({ isShow: false, status: true });
          }, 4000);
        }
      });
    } else {
      createReviewTeacher({ body: formData, teacherId: teacher }).then(
        (response) => {
          if (!response.error) {
            setAlert({ isShow: true, status: true });
            setTimeout(() => {
              setAlert({ isShow: false, status: true });
            }, 4000);
            setTeacher("");
            setLiveView(false);
            setContent("");
            setDone(false);
            setLoading(false);
          } else {
            setAlert({ isShow: true, status: false });
            setTimeout(() => {
              setAlert({ isShow: false, status: true });
            }, 4000);
          }
        }
      );
    }
  };
  return (
    <BoxFull height={"calc(100vh - 72px)"}>
      <Box
        sx={{
          overflow: "hidden",
          height: alert.isShow ? "45px" : 0,
          borderRadius: 0,
          transition: "height 0.6s",
        }}
      >
        <Alert
          severity={alert.status ? "success" : "error"}
          onClose={() => {
            setAlert({ isShow: false });
          }}
          sx={{ borderRadius: 0 }}
        >
          {alert.status
            ? "Đăng bài thành công"
            : "Lỗi khi đăng bài, hãy thử lại"}
        </Alert>
      </Box>
      <Typography
        variant="h3"
        py={2}
        textAlign={"center"}
        textTransform={"uppercase"}
        bgcolor={"#F0F0F0"}
        height={"60px"}
      >
        Viết bài review giảng viên
      </Typography>
      <Box
        display={"flex"}
        width={"100%"}
        px={2}
        height={alert.isShow ? "calc(100% - 105px)" : "calc(100% - 60px)"}
      >
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
              </Box>
            </Stack>
          </Box>
          <Box height={"calc(100% - 130px)"}>
            <Editor
              editorRef={editorRef}
              setContent={setContent}
              height={"100%"}
              content={content}
            />
          </Box>
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
              disabled={
                content === undefined ||
                content === null ||
                content === "" ||
                teacher === ""
              }
            >
              {location.state?.update ? "Cập nhật" : "Đăng tải bài viết"}
              {isLoading && (
                <CircularProgress
                  sx={{
                    width: "30px!important",
                    height: "30px!important",
                    color: "white",
                    fontSize: "12px",
                  }}
                />
              )}
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
