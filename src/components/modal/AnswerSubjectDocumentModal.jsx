import { Box, Button, Chip, InputBase, Modal, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import MultipleSelect from "../MultipleSelect";
import UploadIcon from "@mui/icons-material/Upload";
import { useDispatch, useSelector } from "react-redux";
import { closeAnswerSubjectDocumentModal } from "../../store/modalState";
import {
  useGetAllAnswerSubjectDocumentQuery,
  useUploadAnswerForSubjectDocumentMutation,
} from "../../services/SubjectService";
import { v4 as uuid } from "uuid";
import { addLoadingNotification } from "../../store/notificationState";
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
  borderRadius:1
};
function AnswerSubjectDocumentModal({ open }) {
  const [data, setData] = useState({
    description: "",
    documents: [],
    url: "",
    type: "PDF",
  });
  const {
    answerSubjectDocumentModal: { dataModal },
  } = useSelector((state) => state.modalState);
  const {
    notifications: { LOADING },
  } = useSelector((state) => state.notificationState);
  const id = Number(dataModal.subjectDocumentId);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(closeAnswerSubjectDocumentModal());
  };
  const [uploadAnswerForSubjectDocument] =
    useUploadAnswerForSubjectDocumentMutation();
  const { refetch: retetchAnswerSubjectDocument } =
    useGetAllAnswerSubjectDocumentQuery(id);
  const uploadAnswer = () => {
    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("type", data.type);
    if (data.documents.length > 0 && data.type !== "LINK") {
      data.documents.forEach((file) => formData.append("documents", file));
    } else {
      formData.append("url", data.url);
    }
    if (data.type === "LINK")
      uploadAnswerForSubjectDocument({ id, body: formData }).then(
        (response) => {
          retetchAnswerSubjectDocument();
          closeModal();
        }
      );
    else {
      closeModal();
      dispatch(
        addLoadingNotification([
          ...LOADING,
          {
            id: uuid(),
            type: "LOADING",
            status: 0,
            documents: [data.documents.map((file) => file.name)],
            subject: { name: `Tài liệu ${dataModal.name}` },
            startTime: new Date().toLocaleString(),
          },
        ])
      );
      uploadAnswerForSubjectDocument({ id, body: formData })
        .then((response) => {
          dispatch(
            addLoadingNotification([
              ...LOADING,
              {
                id: uuid(),
                type: "LOADING",
                status: 1,
                objectType: "ANSWER_SUBJECT_DOCUMENT",
                documents: [data.documents.map((file) => file.name)],
                subject: { name: `Tài liệu` },
                startTime: new Date().toLocaleString(),
                answerSubjectDocument: response.data,
              },
            ])
          );
          retetchAnswerSubjectDocument();
        })
        .catch(() => {
          dispatch(
            addLoadingNotification([
              ...LOADING,
              {
                id: uuid(),
                type: "LOADING",
                status: 3,
                documents: data.documents.map((file) => file.name),
                subject: { name: `Tài liệu` },
                startTime: new Date().toLocaleString(),
              },
            ])
          );
        });
    }
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
              Thêm đáp án
            </Typography>
          </Box>
          <Box mt={2}>
            <MultipleSelect
              items={[
                { value: "LINK", label: <Typography>Liên kết</Typography> },
                { value: "PDF", label: <Typography>Tải tệp lên</Typography> },
              ]}
              title={"Kiểu tài liệu"}
              all={false}
              value={data.type}
              style={{ marginRight: 0 }}
              handle={(value) => setData({ ...data, type: value })}
            />
          </Box>
          <Box my={2} border={"1px solid gray"} borderRadius={1}>
            <InputBase
              required
              placeholder="Mô tả tài liệu"
              sx={{ p: 1, width: "100%" }}
              width={"100%"}
              value={data.description}
              onChange={(e) =>
                setData({
                  ...data,
                  description: e.target.value,
                })
              }
            />
          </Box>
          {data.type === "PDF" ? (
            <Box>
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
            </Box>
          ) : (
            <Box my={2} border={"1px solid gray"} borderRadius={1}>
              <InputBase
                required
                placeholder="Nhập liên kết"
                sx={{ p: 1, width: "100%" }}
                width={"100%"}
                value={data.url}
                onChange={(e) =>
                  setData({
                    ...data,
                    url: e.target.value,
                  })
                }
              />
            </Box>
          )}
          <Box display={"flex"} justifyContent={"end"} mt={2}>
            <Button
              disabled={
                data.description.length === 0 ||
                (data.type !== "LINK" && data.documents.length === 0) ||
                (data.type === "LINK" && data.url.length === 0)
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
