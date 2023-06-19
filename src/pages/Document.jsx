import React from "react";
import Filter from "../components/Filter";
import {
  FileTypeFilter,
  DocumentTypeFilter,
  SubjectCodeFilter,
} from "../settings/sharedSetting";
import {
  useGetAllSubjectDocumentCreateByUserQuery,
  useMakeSubjectDocumentPrivateMutation,
  useMakeSubjectDocumentPublicMutation,
  useMoveSubjectDocumentToTrashMutation,
} from "../services/SubjectService";
import { useDispatch } from "react-redux";
import Table from "../components/Table";
import {
  Avatar,
  AvatarGroup,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ShareIcon from "@mui/icons-material/Share";
import EditOffIcon from "@mui/icons-material/EditOff";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import PublicIcon from "@mui/icons-material/Public";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import {
  green,
  red,
  blue,
  orange,
  amber,
  blueGrey,
  brown,
  common,
  cyan,
  deepOrange,
  deepPurple,
  grey,
  indigo,
} from "@mui/material/colors";
import { getIconForDocByFileName } from "../utils/DocumentUtils";
import { formatTimeAgo } from "../utils/ConvertDate";
import { useNavigate } from "react-router-dom";
import {
  openSharingModal,
  openSubjectDocumentModal,
} from "../store/modalState";
import { useState } from "react";
import ConfirmModal from "../components/modal/ComfirmModal";
import noDocument from "../assets/images/noDocument.png";
const color = [
  deepOrange,
  deepPurple,
  grey,
  indigo,
  green,
  red,
  orange,
  amber,
  blue,
  blueGrey,
  brown,
  common,
  cyan,
];
const headers = [
  { title: "", width: "30px" },
  { title: "Loại tài liệu", width: "10%" },
  { title: "Mô tả", width: "20%" },
  { title: "Tên tệp", width: "14%" },
  { title: "Trạng thái", width: "7%" },
  { title: "Chỉnh sửa", width: "10%" },
  { title: "Người được chia sẻ", width: "12%" },
  { title: "", width: "18%" },
];

function Document() {
  const message =
    "Tài liệu của bạn sẽ được chuyển vào thùng rác, và sẽ bị xóa vĩnh viễn sau 30 ngày, bạn có chắc chắn muốn xóa không?";

  const {
    data = [],
    refetch,
    isSuccess,
  } = useGetAllSubjectDocumentCreateByUserQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const preview = (id) => {
    navigate(`/education/subject-document/${id}`);
  };
  const sharing = (subjectDocumentId) => {
    dispatch(openSharingModal({ subjectDocumentId }));
  };

  const [makeSubjectDocumentPrivate] = useMakeSubjectDocumentPrivateMutation();
  const [makeSubjectDocumentPublic] = useMakeSubjectDocumentPublicMutation();
  const [moveSubjectDocumentToTrash] = useMoveSubjectDocumentToTrashMutation();
  const [open, setOpen] = useState({ open: false, item: null });
  const closeModal = () => setOpen({ open: false, item: null });
  const openModal = (item) => setOpen({ open: true, item });

  const onDelete = (type) => {
    if (type)
      moveSubjectDocumentToTrash({ id: open.item.id }).then(() => refetch());
    closeModal();
  };
  const updateSubjectDocumentPublic = (item) => {
    makeSubjectDocumentPublic({ id: item.id }).then(() => {
      refetch();
    });
  };
  const updateSubjectDocumentPrivate = (item) => {
    makeSubjectDocumentPrivate({ id: item.id }).then(() => {
      refetch();
    });
  };
  const copyUrl = (id) => {
    navigator.clipboard
      .writeText(`http://localhost:3000/education/subject-document/${id}`)
      .then(() => {
        alert("Đã copy vào clipboard");
      })
      .catch((error) => {
        console.error("Lỗi khi sao chép vào clipboard:", error);
      });
  };

  const openModalAddSubjectDocument = () => {
    dispatch(
      openSubjectDocumentModal({
        subjectDocumentType: "EXAM",
      })
    );
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
      <Typography width={"20%"} noWrap>
        {item?.description}
      </Typography>
      <Typography width={"14%"} noWrap>
        {item?.document.name}
      </Typography>
      <Typography sx={{ fontSize: "13px" }} width={"7%"}>
        {item?.public ? (
          <Chip label="Public" color="success" />
        ) : (
          <Chip label="Private" color="info" />
        )}
      </Typography>
      <Typography sx={{ fontSize: "13px" }} width={"10%"}>
        {formatTimeAgo(item?.lastEditedAt)}
      </Typography>
      <Box sx={{ width: "12%" }} justifyContent={"start"} display={"flex"}>
        <AvatarGroup max={4} total={item?.shared.length}>
          {item?.shared.slice(0, 4).map((s, i) => (
            <Tooltip title={`${s.user.firstName} ${s.user.lastName}`}>
              <Avatar
                key={i}
                alt={s.user.lastName}
                src={s.user.avatar}
                sx={{
                  backgroundColor:
                    s.user && color[s.user?.firstName.charCodeAt(0) % 12][500],
                }}
              >
                {s.user.lastName.substring(
                  s.user.lastName.lastIndexOf(" ") + 1,
                  s.user.lastName.lastIndexOf(" ") + 2
                )}
              </Avatar>
            </Tooltip>
          ))}
        </AvatarGroup>
      </Box>
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
          <Tooltip title={"Chỉnh sửa tài liệu"}>
            <IconButton>
              <EditOffIcon
                color={"warning"}
                sx={{ width: "18px", height: "18px" }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Xem tài liệu"}>
            <IconButton onClick={() => preview(item.id)}>
              <RemoveRedEyeIcon
                color={"success"}
                sx={{ width: "18px", height: "18px" }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Chia sẻ tài liệu"}>
            <IconButton onClick={() => sharing(item.id)}>
              <ShareIcon
                color={"info"}
                sx={{ width: "18px", height: "18px" }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title={item?.public ? "Ẩn tài liệu" : "Công khai tài liệu"}>
            {item?.public ? (
              <IconButton onClick={() => updateSubjectDocumentPrivate(item)}>
                <PublicOffIcon
                  color={"primary"}
                  sx={{ width: "18px", height: "18px" }}
                />
              </IconButton>
            ) : (
              <IconButton onClick={() => updateSubjectDocumentPublic(item)}>
                <PublicIcon
                  color={"primary"}
                  sx={{ width: "18px", height: "18px" }}
                />
              </IconButton>
            )}
          </Tooltip>
          <Tooltip title={"Copy đường dẫn"}>
            <IconButton onClick={() => copyUrl(item.id)}>
              <CopyAllIcon
                color={"info"}
                sx={{ width: "18px", height: "18px" }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Xóa tài liệu"}>
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
      <Box m={2} maxHeight={"60px"} height={"60px"}>
        <Typography variant="h4" color={"text.secondary"} my={1}>
          Tài liệu của bạn
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
          height={"80%"}
        >
          <Box
            sx={{ p: 2, border: "1px dotted gray", cursor: "pointer" }}
            onClick={openModalAddSubjectDocument}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              maxwidth={"100%"}
              maxheight={"80%"}
              overflow={"hidden"}
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
            <Typography textAlign={"center"} fontSize={"18px"}>
              Click vào đây để tải tài liệu lên
            </Typography>
          </Box>
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

export default Document;
