import React from "react";
import BoxFull from "../BoxFull";
import {
  Box,
  Button,
  Card,
  Chip,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useGetAllSubjectForFilterQuery } from "../../services/FilterService";
import MultipleSelect from "../MultipleSelect";
import BoxBetween from "../BoxBetween";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useSelector } from "react-redux";
import PostCardActions from "../posts/postCard/PostCardActions";
import CloseIcon from "@mui/icons-material/Close";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PropperMenu from "../PropperMenu";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import FlagIcon from "@mui/icons-material/Flag";
import Owner from "../Owner";
import { useCreatePostMutation } from "../../services/PostService";
function Post() {
  const { data: subjectDocumentFilter = { title: "Môn học", item: [] } } =
    useGetAllSubjectForFilterQuery();
  const { user } = useSelector((state) => state.authentication);
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [doc, setDoc] = useState(null);
  const [liveView, setLiveView] = useState(false);
  const onDrop = useCallback((acceptedFiles = []) => {
    setDoc(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [".jpeg", ".png", ".jpg"] },
  });

  const actions = () => [
    {
      Icon: FlagIcon,
      label: "Báo cáo",
      action: () => {},
    },
    { Icon: CopyAllIcon, label: "Copy link truy cập", action: () => {} },
  ];
  const [createPost] = useCreatePostMutation();
  const onCreatePost = () => {
    let formData = new FormData();
    formData.append("description", title);
    formData.append("subjectId", subject);
    formData.append("done", 1);
    formData.append("documents", doc);
    createPost(formData).then(() => {
      setSubject("");
      setTitle("");
      setLiveView(false);
      setDoc(null);
    });
  };
  return (
    <BoxFull>
      <BoxBetween>
        <Box width={"480px"} height={"80%"} border={"1px solid gray"}>
          <Box
            width={"100%"}
            display={"flex"}
            p={2}
            bgcolor={"#F0F0F0"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography
              variant="h3"
              color={"text.secondary"}
              sx={{ textTransform: "uppercase" }}
            >
              Bạn muốn hỏi bài tập
            </Typography>
            <Tooltip title={liveView ? "Ẩn xem trước" : "Xem trước"}>
              <IconButton
                color="success"
                onClick={() => setLiveView(!liveView)}
              >
                {liveView ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </Tooltip>
          </Box>
          <Box display={"flex"} alignItems={"center"} pt={3} px={2} pb={1}>
            <MultipleSelect
              title={"Chọn môn học"}
              width="100%"
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
              size="large"
            />
          </Box>
          <Box display={"flex"} alignItems={"center"} px={2} py={1}>
            <TextField
              label="Tiêu đề bài viết"
              required
              multiline
              maxRows={4}
              sx={{ width: "100%" }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              minRows={4}
            />
          </Box>
          <Box px={2} py={1}>
            <Box
              width={"100%"}
              height={"220px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  border: `2px dotted ${isDragActive ? "blue" : "gray"}`,
                },
              }}
              border={`1px dotted ${isDragActive ? "blue" : "gray"}`}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {doc === null ? (
                isDragActive ? (
                  <p>Thả tài liệu</p>
                ) : (
                  <p>Nhấp chuột hoặc kéo tài liệu vào đây</p>
                )
              ) : (
                <Box width={"100%"} height={"100%"} overflow={"hidden"}>
                  <img
                    src={URL.createObjectURL(doc)}
                    alt=""
                    style={{ width: "100%" }}
                  />
                </Box>
              )}
            </Box>
          </Box>
          <Box px={2} py={1}>
            <Button
              variant="contained"
              color={"primary"}
              disabled={doc === null || subject === "" || title.length === 0}
              onClick={onCreatePost}
            >
              Đăng bài
            </Button>
          </Box>
        </Box>
        {liveView && (
          <Box width={"550px"} ml={7} boxShadow={10} borderRadius={1}>
            <Card
              sx={{ width: "100%", "&:hover": { cursor: "pointer" } }}
              onClick={() => {}}
            >
              <Owner
                owner={user}
                createdAt={new Date().toDateString()}
                listItem={[
                  <Chip
                    key={1}
                    icon={<LocalOfferIcon />}
                    label={
                      subjectDocumentFilter?.item.find(
                        (s) => s.value === subject
                      )?.label
                    }
                  />,
                  <PropperMenu key={2} action={actions()} />,
                  <IconButton key={3} onClick={() => {}}>
                    <CloseIcon />
                  </IconButton>,
                ]}
              />
              <Typography
                variant="h5"
                fontStyle={"italic"}
                color="text.secondary"
                p={"10px"}
                pb={"0"}
              >
                {title}
              </Typography>
              <Box
                width={"100%"}
                maxHeight={"400px"}
                overflow={"hidden"}
                borderRadius={1}
              >
                <img
                  src={doc ? URL.createObjectURL(doc) : ""}
                  alt="bạn chưa chọn tài liệu"
                  width={"100%"}
                />
              </Box>
              <PostCardActions
                totalFavorite={0}
                totalComment={0}
                totalAnswer={0}
                isFavorited={false}
                toggleFavorite={() => {}}
              />
            </Card>
          </Box>
        )}
      </BoxBetween>
    </BoxFull>
  );
}

export default Post;
