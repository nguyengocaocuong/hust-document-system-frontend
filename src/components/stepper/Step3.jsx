import {
  Box,
  Button,
  Chip,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import BoxBetween from "../../components/BoxBetween";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import React, { useCallback, useState } from "react";
import Editor from "../Editor";
import { useRef } from "react";
import { useDropzone } from "react-dropzone";
const Step3 = ({ setContent, data }) => {
  const editorRef = useRef(null);
  const [postData, setPostData] = useState({
    description: "",
    documents: [],
  });
  const handleNextStep = () => {
    if (data.type !== "POST") setContent(editorRef.current?.getContent());
    else {
      setContent({ ...postData });
    }
  };
  const onDrop = useCallback((acceptedFiles = []) => {
    setPostData((postData) => ({
      ...postData,
      documents: acceptedFiles,
    }));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [".jpeg", ".png", ".jpg"] },
  });
  const handleDeleteDocument = (file) => {
    setPostData({
      ...postData,
      documents: postData.documents.filter((f) => f.path !== file.path),
    });
  };
  return (
    <BoxBetween>
      <Box
        width={data.type !== "POST" ? "85%" : "40%"}
        border={"1px dotted gray"}
        textAlign={"center"}
        p={2}
        height={data.type !== "POST" ? "500px" : 'auto'}
      >
        {data.type !== "POST" ? (
          <>
            {" "}
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              pb={2}
            >
              <Typography variant="h3" color={"text.secondary"}>
                Nhập nội dung cho bài viết
              </Typography>
              <Tooltip title="Lưu bài viết">
                <IconButton color="primary" onClick={handleNextStep}>
                  <SaveAsIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box height={"calc(100% - 40px)"}>
              <Editor editorRef={editorRef} />
            </Box>
          </>
        ) : (
          <Box width={"100%"} display={"block"} textAlign={"start"}>
            <Typography
              variant="h3"
              color={"text.secondary"}
              textAlign={"center"}
              pb={2}
            >
              Nhập nội dung bài đăng
            </Typography>
            <TextField
              sx={{ width: "100%" }}
              size="small"
              placeholder="Nhập tiêu đề bài viết"
              value={postData.description}
              onChange={(e) =>
                setPostData({ ...postData, description: e.target.value })
              }
            />
            {postData.documents?.length > 0 && (
              <Box my={1}>
                <Typography variant="h5">File đã chọn</Typography>
                <Box
                  maxHeight={"250px"}
                  maxWidth={"400px"}
                  overflow={"auto"}
                  display={"flex"}
                  flexWrap={"wrap"}
                >
                  {postData.documents?.map((document, index) => (
                    <Chip
                      key={index}
                      label={document.path}
                      sx={{ m: 1 }}
                      onDelete={() => handleDeleteDocument(document)}
                      color="primary"
                    />
                  ))}
                </Box>
              </Box>
            )}
            <Box
              height={"100px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              my={2}
              border={`1px dotted ${isDragActive ? "blue" : "gray"}`}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Thả tài liệu</p>
              ) : (
                <p>Nhấp chuột hoặc kéo tài liệu vào đây</p>
              )}
            </Box>
            <Button
              color="primary"
              variant="contained"
              sx={{ textTransform: "capitalize" }}
              onClick={handleNextStep}
            >
              Đăng bài viết
            </Button>
          </Box>
        )}
      </Box>
    </BoxBetween>
  );
};
export default Step3;
