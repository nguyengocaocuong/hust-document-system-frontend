import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearDownloadModal, closeDownloadModal } from "../../store/modalState";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  InputBase,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Owner from "../Owner";
import { saveAs } from "file-saver";
import { Download } from "@mui/icons-material";
import {
  useGetAllAnswerSubjectDocumentQuery,
  useGetSubjectDocumentDetailQuery,
} from "../../services/SubjectService";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "90%",
  overflow: "hidden",
  width: "650px",
  backgroundColor: "#f7f7f2",
  borderRadius: 1,
  boxShadow: 24,
  p: 2,
};
function DownloadModal({ open }) {
  const dispatch = useDispatch();
  const {
    downloadModal: { dataModal },
  } = useSelector((state) => state.modalState);
  const { data: answers, isSuccess: isAnswerSuccess } =
    useGetAllAnswerSubjectDocumentQuery(dataModal.subjectDocumentId);
  const { data: subjectDocumentDetail, isSuccess: isDetailSuccess } =
    useGetSubjectDocumentDetailQuery(dataModal.subjectDocumentId);
  const { user } = useSelector((state) => state.authentication);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const closeModal = () => {
    dispatch(clearDownloadModal());
  };
  const onDownload = () => {
    dispatch(closeDownloadModal());
    fetch(
      `https://hust-document-system-backend-vxw4qk34wa-as.a.run.app/api/v1/users/subjects/subjectDocument/${
        dataModal.subjectDocumentId
      }/download-multiple?answerIds=${selectedAnswers
        .map((answer) => answer.id)
        .join(",")}`,
      {
        method: "GET",
        headers: {
          "X-HUST-DOCUMENT-KEY": user.token,
        },
      }
    )
      .then((response) => {
        const contentLength = response.headers.get("Content-Length");
        let loadedBytes = 0;

        const reader = response.body.getReader();

        return new Response(
          new ReadableStream({
            async start(controller) {
              while (true) {
                const { done, value } = await reader.read();

                if (done) {
                  controller.close();
                  break;
                }
                loadedBytes += value.length;
                const percentCompleted = Math.round(
                  (loadedBytes * 100) / contentLength
                );
                console.log(`Đã tải về: ${percentCompleted}%`);

                controller.enqueue(value);
              }
            },
          })
        );
      })
      .then((response) => response.blob())
      .then((blobData) => {
        saveAs(blobData, "download.zip");
        dispatch(clearDownloadModal());
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const onChecked = (answer) => {
    setSelectedAnswers((preState) => {
      if (preState.find((item) => item.id === answer.id)) {
        return preState.filter((item) => item.id === answer.id);
      }
      return [...preState, answer];
    });
    console.log(selectedAnswers);
  };
  return (
    <Modal open={open} onClose={closeModal} sx={{ border: "none" }}>
      <Box sx={{ ...style }}>
        {isAnswerSuccess && isDetailSuccess && (
          <Stack spacing={2}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography
                variant="h3"
                fontWeight={"bold"}
                color={"text.secondary"}
              >
                {subjectDocumentDetail.subject.name}
              </Typography>
              <IconButton onClick={closeModal}>
                <CloseIcon sx={{ width: "30px", height: "30px" }} />
              </IconButton>
            </Box>
            <Stack
              direction={"row"}
              spacing={1}
              boxShadow={2}
              borderRadius={2}
              overflow={"hidden"}
              bgcolor={"#F1F9F9"}
            >
              <Box width={"150px"} height={"150px"} overflow={"hidden"}>
                <img
                  src={subjectDocumentDetail.document.thumbnail}
                  alt=""
                  width={"100%"}
                />
              </Box>
              <Stack spacing={1} py={1.5} width={"calc(100% - 150px)"}>
                <Owner
                  owner={subjectDocumentDetail.owner}
                  createdAt={subjectDocumentDetail.createdAt}
                  sx={{ p: 0 }}
                />
                <Typography variant="h5" fontWeight={"bold"}>
                  #{subjectDocumentDetail.subjectDocumentType.type}
                </Typography>
                <Typography variant="h6">
                  {subjectDocumentDetail.description}
                </Typography>
              </Stack>
            </Stack>
            <Typography variant="h4" fontWeight={"bold"} px={2}>
              Đáp án được chia sẻ
            </Typography>
            <Box width={"100%"}>
              <Box width={"100%"} pb={1.5} px={2}>
                <InputBase
                  sx={{
                    width: "100%",
                    height: "40px",
                    bgcolor: "white",
                    borderRadius: 3,
                    px: 1.5,
                    boxShadow: `rgba(99, 99, 99, 0.2) 0px 2px 8px 0px`,
                  }}
                  placeholder="Nhập mô tả đáp án"
                />
              </Box>
              <Box
                width={"100%"}
                height={"352px"}
                overflow={"auto"}
                px={2}
                py={2}
                sx={{
                  boxShadow: "0px 8px 5px 0px rgba(155, 155, 155, 0.1) inset",
                  WebkitBoxShadow:
                    "0px 8px 5px 0px rgba(155, 155, 155, 0.1) inset",
                  MozBoxShadow:
                    "0px 8px 5px 0px rgba(155, 155, 155, 0.1) inset",
                }}
              >
                {answers
                  ?.filter((answer) => answer.type !== "LINK" && answer.type !== "ANNOTATE")
                  .map((answer) => (
                    <Box
                      bgcolor={
                        selectedAnswers.find(
                          (item) => item.id === answer.id
                        ) !== undefined && "#F1F9F9"
                      }
                      key={answer.id}
                      height={"100px"}
                      width={"100%"}
                      overflow={"hidden"}
                      boxShadow={1}
                      display={"flex"}
                      my={0.75}
                    >
                      <Box
                        height={"100px"}
                        width={"100px"}
                        overflow={"hidden"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        p={1}
                        bgcolor={"white"}
                      >
                        <img
                          src={answer.document.thumbnail}
                          alt=""
                          width={"100%"}
                          style={{ borderRadius: "16px" }}
                        />
                      </Box>
                      <Stack spacing={1.5} width={"calc(100% - 150px)"} p={1.5}>
                        <Owner
                          owner={answer.owner}
                          createdAt={answer.createdAt}
                          sx={{ p: 0 }}
                        />
                        <Typography variant="h5">
                          {answer.description}
                        </Typography>
                      </Stack>
                      <Box width={"50px"} height={"100%"}>
                        <Checkbox
                          onChange={() => onChecked(answer)}
                          value={
                            selectedAnswers.find(
                              (item) => answer.id === item.id
                            ) !== undefined
                          }
                        />
                      </Box>
                    </Box>
                  ))}
              </Box>
              <Box
                height={"50px"}
                display={"flex"}
                justifyContent={"end"}
                alignItems={"center"}
              >
                <Button
                  variant="contained"
                  endIcon={<Download />}
                  onClick={onDownload}
                >
                  Tải xuống
                </Button>
              </Box>
            </Box>
          </Stack>
        )}
      </Box>
    </Modal>
  );
}

export default DownloadModal;
