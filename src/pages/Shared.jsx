import React, { useState } from "react";
import Filter from "../components/Filter";
import {
  FileTypeFilter,
  DocumentTypeFilter,
  SubjectCodeFilter,
} from "../settings/sharedSetting";
import {
  useDeleteSharedPrivateMutation,
  useGetAllSubjectDocumentSharedQuery,
} from "../services/SubjectService";
import Table from "../components/Table";
import { Box, IconButton, Typography } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import { getIconForDocByFileName } from "../utils/DocumentUtils";
import { formatTimeAgo } from "../utils/ConvertDate";
import Owner from "../components/Owner";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/modal/ComfirmModal";
import noDocument from "../assets/images/noDocument.png";

const headers = [
  { title: "", width: "30px" },
  { title: "Loại tài liệu", width: "10%" },
  { title: "Môn học", width: "10%" },
  { title: "Mô tả", width: "20%" },
  { title: "Tên tệp", width: "14%" },
  { title: "Thời gian chia sẻ", width: "10%" },
  { title: "Chia sẻ bởi", width: "13%" },
  { title: "", width: "15%" },
];

function Shared() {
  const message =
    "Nếu bạn loại bỏ liên kết chia sẻ này, có thể bạn sẽ không thể truy cập được vào tài liệu này nữa, bạn có chắc chắn xóa không?";

  const {
    data = [],
    refetch: refetchSubjectDocumentShared,
    isSuccess,
  } = useGetAllSubjectDocumentSharedQuery();
  const navigate = useNavigate();
  const viewSubjectDocument = (id) => {
    navigate(`/education/subject-document/${id}`);
  };
  const [deleteSharedPrivate] = useDeleteSharedPrivateMutation();

  const [open, setOpen] = useState({ open: false, item: null });
  const closeModal = () => setOpen({ open: false, item: null });
  const openModal = (item) => setOpen({ open: true, item });

  const onDelete = (type) => {
    if (type)
      deleteSharedPrivate(open.item.id).then(() => {
        refetchSubjectDocumentShared();
      });
    closeModal();
  };
  const renderItem = (item, key) => (
    <Box
      key={key}
      pl={1}
      pr={1}
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      sx={{
        borderBottom: "1px solid #D9DFED",
        transition: "backgroundColor 0.4s",
        "&:hover": { backgroundColor: "#D9DFED" },
        cursor: "pointer",
      }}
      height={"55px"}
      justifyContent={"space-between"}
    >
      <Box width={"30px"}>
        <img
          src={getIconForDocByFileName(item?.subjectDocument?.document.name)}
          width={"20px"}
          height={"20px"}
          alt=""
        />
      </Box>
      <Typography
        sx={{ fontWeight: "bold", width: "10%" }}
        color={"primary.main"}
      >
        {item?.subjectDocument?.subjectDocumentType}
      </Typography>
      <Typography sx={{ fontWeight: "bold", width: "10%" }}>
        {item?.subjectDocument?.subject?.name}
      </Typography>
      <Typography width={"20%"} noWrap>
        {item?.subjectDocument?.description}
      </Typography>
      <Typography width={"14%"} noWrap>
        {item?.subjectDocument?.document.name}
      </Typography>
      <Typography sx={{ fontSize: "13px" }} width={"10%"}>
        {formatTimeAgo(item?.sharedAt)}
      </Typography>
      <Box sx={{ width: "13%" }} justifyContent={"start"} display={"flex"}>
        <Box m={-2}>
          <Owner owner={item?.subjectDocument?.owner} />
        </Box>
      </Box>
      <Box
        width={"15%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"end"}
      >
        <Box
          sx={{
            opacity: "0.3",
            transition: "opacity 0.4s",
            "&:hover": {
              opacity: 1,
              backgroundColor: "white",
            },
            borderRadius: "25px",
            px: 1.5,
          }}
        >
          <IconButton
            onClick={() => viewSubjectDocument(item?.subjectDocument?.id)}
          >
            <RemoveRedEyeIcon
              color={"success"}
              sx={{ width: "18px", height: "18px" }}
            />
          </IconButton>
          <IconButton onClick={() => openModal(item)}>
            <DeleteIcon
              color={"error"}
              sx={{ width: "18px", height: "18px" }}
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
  return (
    <Box
      width={"100%"}
      height={"100%"}
      overflow={"auto"}
      sx={{ backgroundColor: "white" }}
    >
      <Box m={2} maxHeight={"60px"} height={"60px"}>
        <Typography variant="h4" color={"text.secondary"} my={1}>
          Tài liệu được chia sẻ
        </Typography>
        <Filter
          data={[FileTypeFilter, DocumentTypeFilter, SubjectCodeFilter]}
        />
      </Box>
      {data.length === 0 && isSuccess && (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          maxwidth={"100%"}
          maxheight={"80%"}
          overflow={"hidden"}
          p={3}
        >
          <img
            src={noDocument}
            alt="?"
            style={{
              width: "auto",
              height: "auto",
              maxHeight: "100%",
              maxWidth: "100%",
            }}
          />
        </Box>
      )}
      {data.length > 0 && isSuccess && (
        <Table
          headers={headers}
          items={data}
          renderItem={renderItem}
          pageSize={10}
          itemHeight={55}
        />
      )}
      {open.open && (
        <ConfirmModal
          message={message}
          open={open.open}
          closeModal={closeModal}
          action={onDelete}
        />
      )}
    </Box>
  );
}

export default Shared;
