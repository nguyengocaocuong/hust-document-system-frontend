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
import { useCreateReviewSubjectMutation } from "../../services/SubjectService";
function ReviewSubject({subjectId}) {
  const editorRef = useRef(null);
  const { data: subjectDocumentFilter = { title: "Loại tài liệu", item: [] } } =
    useGetAllSubjectForFilterQuery();
  const { user } = useSelector((state) => state.authentication);
  const [subject, setSubject] = useState(subjectId);
  const [liveView, setLiveView] = useState(false);
  const [content, setContent] = useState("");
  const [done, setDone] = useState(false);
  const [isNotify, setNotify] = useState(0);
  const actions = () => [
    {
      Icon: FlagIcon,
      label: "Báo cáo",
      action: () => {},
    },
    { Icon: CopyAllIcon, label: "Copy link truy cập", action: () => {} },
  ];
  const [createReviewSubject] = useCreateReviewSubjectMutation();
  const onCreateReviewTeacher = () => {
    let body = new FormData();
    body.append("review", content);
    body.append("done", done ? 1 : 0);
    createReviewSubject({ body, subjectId: subject })
      .then(() => {
        setSubject("");
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
        Viết bài review môn học
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
              {isNotify === 1 && (
                <Alert
                  severity="success"
                  sx={{
                    width: "250px",
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
                <Alert severity="error" sx={{
                  width: "250px",
                  height: "40px",
                  px: 1,
                  display: "flex",
                  alignItems: "center",
                }}>
                  Lỗi khi đăng tải bài viết
                </Alert>
              )}
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
              Đăng tải bài viết
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
