import React from "react";
import Table from "../components/Table";
import { Box, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import DeleteIcon from "@mui/icons-material/Delete";
import trashIcon from "../assets/images/trash.png";
import { getIconForDocByFileName } from "../utils/DocumentUtils";
import { formatTimeAgo } from "../utils/ConvertDate";
import { useGetAllSubjectDocumentDeletedQuery } from "../services/UserService";
import {
  useDeleteSubjectDocumentForeverMutation,
  useRestoreSubjectDocumentMutation,
} from "../services/SubjectService";
import { useState } from "react";
import ConfirmModal from "../components/modal/ComfirmModal";

const headers = [
  { title: "", width: "30px" },
  { title: "Loại tài liệu", width: "10%" },
  { title: "Mô tả", width: "30%" },
  { title: "Tên tệp", width: "20%" },
  { title: "Đã xóa", width: "10%" },
  { title: "", width: "18%" },
];

function Trash() {
  const message =
    "Bạn đang thực hiện xóa tài liệu, tài liệu sẽ bị xóa vĩnh viễn và không thể khôi phục, bạn có chắc chắn muốn xóa?";
  const {
    data = [],
    isSuccess,
    refetch,
  } = useGetAllSubjectDocumentDeletedQuery();
  const [deleteSubjectDocumentForever] =
    useDeleteSubjectDocumentForeverMutation();
  const [restoreSubjectDocument] = useRestoreSubjectDocumentMutation();
  const [open, setOpen] = useState({ open: false, item: null });
  const closeModal = () => setOpen({ open: false, item: null });

  const openModal = (item) => setOpen({ open: true, item });
  const onDelete = (type) => {
    if (type) {
      deleteSubjectDocumentForever({ id: open.item.id }).then((response) => {
        refetch();
      });
    }
    closeModal();
  };
  const restore = (item) => {
    restoreSubjectDocument({ id: item.id }).then(() => refetch());
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
      height={"53px"}
      justifyContent={"space-between"}
    >
      <Box width={"30px"}>
        <img
          src={getIconForDocByFileName(item?.document.name)}
          width={"20px"}
          height={"20px"}
          alt=""
        />
      </Box>
      <Typography
        sx={{ fontWeight: "bold", width: "10%" }}
        color={"primary.main"}
      >
        {item?.subjectDocumentType}
      </Typography>
      <Typography width={"30%"} noWrap>
        {item?.description}
      </Typography>
      <Typography width={"20%"} noWrap>
        {item?.document.name}
      </Typography>
      <Typography sx={{ fontSize: "13px" }} width={"10%"}>
        {formatTimeAgo(item?.deletedAt)}
      </Typography>
      <Box
        width={"18%"}
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
          <Tooltip title={"Restore"}>
            <IconButton onClick={() => restore(item)}>
              <SettingsBackupRestoreIcon
                color={"warning"}
                sx={{ width: "18px", height: "18px" }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Xóa vĩnh viễn"}>
            <IconButton onClick={() => openModal(item)}>
              <DeleteIcon
                color={"error"}
                sx={{ width: "18px", height: "18px" }}
              />
            </IconButton>
          </Tooltip>
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
      <Box m={2} maxHeight={"70px"} height={"70px"}>
        <Typography variant="h4" color={"text.secondary"} my={1}>
          Tài liệu bạn đã xóa
        </Typography>
        <Box
          height={"50px"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ backgroundColor: "#E3E3E3" }}
          p={1}
          my={1}
          borderRadius={1}
        >
          <Typography>
            Tài liệu của bạn sẽ bị xóa vĩnh viễn sau 30 ngày
          </Typography>
          <Chip label={"Làm sạch thùng rác"} sx={{ fontWeight: "bold" }}></Chip>
        </Box>
      </Box>
      {data.length === 0 && isSuccess && (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"100%"}
          height={"80%"}
          overflow={"hidden"}
          p={3}
        >
          <img
            src={trashIcon}
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
          pageSize={9}
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

export default Trash;
