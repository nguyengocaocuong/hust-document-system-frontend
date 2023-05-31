import { Box, Button, Chip, InputBase, Modal, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import MultipleSelect from "../MultipleSelect";
import UploadIcon from "@mui/icons-material/Upload";
import { useUpdloadSubjectDocumentForSubjectMutation } from "../../services/SubjectService";
import { documentType } from "../../settings/SubjectSetting";
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
function SubjectDocumentModal({
  open,
  closeModal,
  subjectType,
  subjectId,
  refetch,
  acceptedFiles = [],
}) {
  const [updloadSubjectDocumentForSubject] =
    useUpdloadSubjectDocumentForSubjectMutation();
  const [data, setData] = useState({
    description: "",
    documents: acceptedFiles,
    type: subjectType?.type ? subjectType?.type : "EXAM",
    isPublic: 'Chỉ mình tôi',
  });
  const uploadAnswer = () => {
    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("isPublic", data.isPublic === 'Chỉ mình tôi' ? 0 : 1)
    data.documents.forEach((file) => formData.append("documents", file));
    updloadSubjectDocumentForSubject({
      subjectId,
      subjectDocument: formData,
    }).then((response) => {
      refetch();
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
          <Typography
            variant="h3"
            textAlign={"start"}
            color={"text.secondary"}
          >
            Thêm tài liệu mới
          </Typography>
          <Box display={"flex"} alignItems={"center"} minWidth={"350px"} pt={2}>
            <MultipleSelect
              items={Object.keys(documentType).map((value) => ({
                value,
                label: <Typography>{value}</Typography>,
              }))}
              title={"Kiểu tài liệu"}
              all={false}
              style={{ marginRight: 2 }}
              value={data?.type}
              handle={(type) => setData({ ...data, type })}
            />
            <MultipleSelect
              items={["Bất kỳ ai", "Chỉ mình tôi"].map((value) => ({
                value,
                label: <Typography>{value}</Typography>,
              }))}
              title={"Trạng thái tài liệu"}
              all={false}
              style={{ marginRight: 0 }}
              value={data?.isPublic}
              handle={(isPublic) => setData({ ...data, isPublic })}
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
                data.description.length === 0 || data.documents.length === 0
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

export default SubjectDocumentModal;