import { Box, Button, Chip, InputBase, Modal, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import MultipleSelect from "../MultipleSelect";
import UploadIcon from "@mui/icons-material/Upload";
import { useUploadAnswerForSubjectDocumentMutation } from "../../services/SubjectService";
import { useParams } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
function AnswerSubjectDocumentModal({ open, closeModal, addAnswer }) {
  const [data, setData] = useState({
    content: "",
    documents: [],
    type: "EXAM",
  });
  const { id } = useParams();
  const [uploadAnswerForSubjectDocument] =
    useUploadAnswerForSubjectDocumentMutation();
  const uploadAnswer = () => {
    const formData = new FormData();
    formData.append("content", data.content);
    formData.append("type", data.type);
    formData.append("documents", data.documents[0]);
    uploadAnswerForSubjectDocument({id, answer: formData}).then((response) => {
      setData({ content: "", documents: [] });
      addAnswer({...response.data})
      closeModal();
    });
  };
  const onDrop = useCallback((acceptedFiles) => {
    setData((data) => ({ ...data, documents: acceptedFiles }));
  }, []);
  const handleDeleteDocument = (file) => {
    setData({
      ...data,
      documents: data.documents.filter((f) => f.path !== file.path),
    });
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Modal open={open} onClose={closeModal}>
      <Box sx={{ ...style }}>
        <Box p={2}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            minWidth={"350px"}
          >
            <Typography
              variant="h3"
              textAlign={"center"}
              color={"text.secondary"}
            >
              Thêm tài liệu mới
            </Typography>
            <MultipleSelect
              items={[]}
              title={"Kiểu tài liệu"}
              all={false}
              style={{ marginRight: 0 }}
            />
          </Box>
          <Box my={2} border={"1px solid gray"} borderRadius={1}>
            <InputBase
              required
              placeholder="Mô tả tài liệu"
              sx={{ p: 1, width: "100%" }}
              width={"100%"}
              value={data.content}
              onChange={(e) =>
                setData({
                  ...data,
                  content: e.target.value,
                })
              }
            />
          </Box>
          {data.documents.length > 0 && (
            <Box my={1}>
              <Typography variant="h5">File đã chọn</Typography>
              <Box
                maxHeight={"250px"}
                maxWidth={"400px"}
                overflow={"auto"}
                display={"flex"}
                flexWrap={"wrap"}
              >
                {data.documents.map((document, index) => (
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
          <Box display={"flex"} justifyContent={"end"} mt={2}>
            <Button
              disabled={
                data.content.length === 0 || data.documents.length === 0
              }
              variant="contained"
              color="primary"
              onClick={uploadAnswer}
            >
              {" "}
              <UploadIcon />
              Đăng tài liệu
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default AnswerSubjectDocumentModal;
