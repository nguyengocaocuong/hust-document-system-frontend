import {
  Box,
  Button,
  Chip,
  InputBase,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import MultipleSelect from "../MultipleSelect";
import UploadIcon from "@mui/icons-material/Upload";
import {
  useGetAllSubjectDocumentCreateByUserQuery,
  useGetSubjectDetailQuery,
  useUpdloadSubjectDocumentForSubjectMutation,
} from "../../services/SubjectService";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSubjectDocumentModal,
  closeSubjectDocumentModal,
} from "../../store/modalState";
import { addLoadingNotification } from "../../store/notificationState";
import { v4 as uuid } from "uuid";
import { useGetAllSubjectForFilterQuery } from "../../services/FilterService";
import { useGetAllSubjectDocumentTypesQuery } from "../../services/UserSubjectDocumentTypeService";
import { generateSemesters } from "../../utils/ConvertData";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 1,
  pt: 2,
  px: 4,
  pb: 3,
};
function SubjectDocumentModal({ open }) {
  const { data: subjectDocumentTypes } = useGetAllSubjectDocumentTypesQuery();
  const {
    notifications: { LOADING },
  } = useSelector((state) => state.notificationState);
  const dispatch = useDispatch();
  const {
    subjectDocumentModal: { dataModal },
  } = useSelector((state) => state.modalState);
  const { refetch: refetchSubjectDocument } = useGetSubjectDetailQuery(
    dataModal.subjectId
  );
  const { refetch: refetchGetAllSubjectDocumentCreatedByUser } =
    useGetAllSubjectDocumentCreateByUserQuery();

  const { data: subjects = {} } = useGetAllSubjectForFilterQuery();
  const closeModal = () => {
    dispatch(closeSubjectDocumentModal());
  };
  const [updloadSubjectDocumentForSubject] =
    useUpdloadSubjectDocumentForSubjectMutation();
  const [data, setData] = useState({
    description: "",
    documents: dataModal.acceptedFiles || [],
    type: "PDF",
    subjectDocumentTypeId: dataModal.subjectDocumentTypeId || 1,
    isPublic: 0,
    subjectId: dataModal.subjectId || subjects?.item[0]?.value,
    url: "",
    semester: "2023.3",
  });
  const uploadAnswer = () => {
    closeModal();
    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("semester", data.semester);
    formData.append("subjectDocumentTypeId", data.subjectDocumentTypeId);
    formData.append("type", data.type);
    formData.append("isPublic", data.isPublic);
    data.documents.forEach((file) => formData.append("documents", file));
    dispatch(
      addLoadingNotification([
        ...LOADING,
        {
          id: uuid(),
          type: "LOADING",
          objectType: "SUBJECT_DOCUMENT",
          status: 0,
          documents: [data.documents.map((file) => file.name)],
          subject: { name: dataModal.subjectName },
          startTime: new Date().toLocaleString(),
        },
      ])
    );
    updloadSubjectDocumentForSubject({
      subjectId: data.subjectId,
      subjectDocument: formData,
    })
      .then((response) => {
        dispatch(
          addLoadingNotification([
            ...LOADING,
            {
              id: uuid(),
              type: "LOADING",
              status: 1,
              objectType: "SUBJECT_DOCUMENT",
              documents: data.documents.map((file) => file.name),
              subject: { name: dataModal.subjectName },
              startTime: new Date().toLocaleString(),
              subjectDocument: response.data,
            },
          ])
        );
        dispatch(clearSubjectDocumentModal());
        refetchSubjectDocument();
        refetchGetAllSubjectDocumentCreatedByUser();
      })
      .catch(() => {
        dispatch(
          addLoadingNotification([
            ...LOADING,
            {
              id: uuid(),
              type: "LOADING",
              objectType: "SUBJECT_DOCUMENT",
              status: 2,
              documents: data.documents.map((file) => file.name),
              subject: { name: dataModal.subjectName },
              startTime: new Date().toLocaleString(),
            },
          ])
        );
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
        <Stack spacing={2} width={"500px"}>
          <Typography variant="h3" textAlign={"start"} color={"text.secondary"}>
            Thêm tài liệu mới
          </Typography>
          <MultipleSelect
            width="100%"
            items={subjects?.item?.map((subject) => ({
              value: subject.value,
              label: <Typography>{subject.label}</Typography>,
            }))}
            title={"Môn học"}
            all={false}
            style={{ marginRight: 2 }}
            value={data?.subjectId}
            handle={(subjectId) => setData({ ...data, subjectId })}
          />
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <MultipleSelect
              width="40%"
              items={subjectDocumentTypes?.map((subjectDocumentType) => ({
                value: subjectDocumentType.id,
                label: <Typography>{subjectDocumentType.name}</Typography>,
              }))}
              title={"Kiểu tài liệu"}
              all={false}
              style={{ marginRight: 2 }}
              value={data?.subjectDocumentTypeId}
              handle={(subjectDocumentTypeId) =>
                setData({ ...data, subjectDocumentTypeId })
              }
            />
            <MultipleSelect
              width="31%"
              items={[0, 1].map((value) => ({
                value,
                label: (
                  <Typography>
                    {value === 1 ? "Với mọi người" : "Chỉ mình tôi"}
                  </Typography>
                ),
              }))}
              title={"Trạng thái tài liệu"}
              all={false}
              style={{ marginRight: 2 }}
              value={data?.isPublic}
              handle={(isPublic) => setData({ ...data, isPublic })}
            />
            <MultipleSelect
              width="22%"
              items={generateSemesters().map((semster) => ({
                value: semster,
                label: <Typography>{semster}</Typography>,
              }))}
              title={"Học kỳ"}
              all={false}
              style={{ marginRight: 2 }}
              value={data.semester}
              handle={(semester) => setData({ ...data, semester })}
            />
          </Box>
          <Box border={"1px solid gray"} borderRadius={1} width={"100%"}>
            <InputBase
              required
              placeholder="Mô tả tài liệu"
              sx={{ p: 1, width: "100%" }}
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
                    maxWidth={"450px"}
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
                (data.type === "LINK" && data.url.length === 0) ||
                data.semester === ""
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
        </Stack>
      </Box>
    </Modal>
  );
}

export default SubjectDocumentModal;
