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
import { useGetAllSubjectForFilterQuery } from "../../services/FilterService";
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
  useCreateReviewSubjectMutation,
  useUpdateReviewSubjectMutation,
} from "../../services/SubjectService";
import { useLocation } from "react-router-dom";
function ReviewSubject() {
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ isShow: false, status: false });
  const location = useLocation();
  const editorRef = useRef(null);
  const { data: subjectDocumentFilter = { title: "Loại tài liệu", item: [] } } =
    useGetAllSubjectForFilterQuery();
  const { user } = useSelector((state) => state.authentication);
  const [subject, setSubject] = useState(
    location.state?.reviewSubject.subject.id || ""
  );
  const [liveView, setLiveView] = useState(false);
  const [content, setContent] = useState(
    location.state?.reviewSubject.review || ""
  );
  const [done, setDone] = useState(location.state?.reviewSubject.done || false);
  const actions = () => [
    {
      Icon: FlagIcon,
      label: "Báo cáo",
      action: () => {},
    },
    { Icon: CopyAllIcon, label: "Copy link truy cập", action: () => {} },
  ];
  const [createReviewSubject] = useCreateReviewSubjectMutation();
  const [updateReviewSubject] = useUpdateReviewSubjectMutation();
  const onCreateReviewSubject = () => {
    setLoading(true);
    let body = new FormData();
    body.append("review", content);
    body.append("done", done ? 1 : 0);
    if (location.state?.update) {
      updateReviewSubject({
        body,
        subjectId: subject,
        reviewSubjectId: location.state?.reviewSubject.id,
      }).then((response) => {
        if (!response.error) {
          setAlert({ isShow: true, status: true });
          setTimeout(() => {
            setAlert({ isShow: false, status: true });
          }, 4000);
          setSubject("");
          setLiveView(false);
          setContent("");
          setDone(false);
          setLoading(false);
        } else {
          setAlert({ isShow: true, status: true });
          setTimeout(() => {
            setAlert({ isShow: false, status: true });
          }, 4000);
        }
      });
    }
    createReviewSubject({ body, subjectId: subject }).then((response) => {
      if (!response.error) {
        setAlert({ isShow: true, status: true });
        setTimeout(() => {
          setAlert({ isShow: false, status: true });
        }, 4000);
        setSubject("");
        setLiveView(false);
        setContent("");
        setDone(false);
        setLoading(false);
      } else {
        setAlert({ isShow: true, status: true });
        setTimeout(() => {
          setAlert({ isShow: false, status: true });
        }, 4000);
      }
    });
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
        Viết bài review môn học
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
              title={"Chọn môn học"}
              width="40%"
              items={subjectDocumentFilter.item.map((subject) => ({
                label: (
                  <Typography style={{ marginLeft: "5px" }}>
                    {subject.label}
                  </Typography>
                ),
                value: subject.value,
              }))}
              value={subject}
              handle={setSubject}
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
              onClick={onCreateReviewSubject}
              disabled={
                content === undefined ||
                content === null ||
                content === "" ||
                subject === ""
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
                overflow={"hidden"}
              >
                {" "}
                <Box display={"flex"} alignItems={"center"} p={2}>
                  <Typography
                    variant="h4"
                    textAlign={"center"}
                    width={"calc(100% - 30px)"}
                  >
                    Review môn học{" "}
                    <strong>
                      {
                        subjectDocumentFilter.item.find(
                          (t) => t.value === subject
                        )?.label
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

export default ReviewSubject;
