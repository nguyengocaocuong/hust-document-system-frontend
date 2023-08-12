import React from "react";
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
  Stack,
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
import { useGetAllSubjectDocumentDeletedQuery } from "../services/UserService";
import { useGetAllHistoryQuery } from "../services/HistoryService";
import Owner from "../components/Owner";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import PreviewIcon from "@mui/icons-material/Preview";
import DownloadIcon from "@mui/icons-material/Download";
import PropperMenu from "../components/PropperMenu";
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
  const { refetch: refetchTrash } = useGetAllSubjectDocumentDeletedQuery();

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
  const { data: histories } = useGetAllHistoryQuery();
  const [open, setOpen] = useState({ open: false, item: null });
  const closeModal = () => setOpen({ open: false, item: null });
  const openModal = (item) => setOpen({ open: true, item });

  const onDelete = (type) => {
    if (type)
      moveSubjectDocumentToTrash({ id: open.item.id }).then(() => {
        refetch();
        refetchTrash();
      });
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
        subjectName: "test",
        subjectId: 1,
        subjectDocumentType: 1,
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
        {item?.subjectDocumentType.name}
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
        <AvatarGroup max={4} total={item?.shared?.length}>
          {item?.shared.slice(0, 4).map((s, i) => (
            <Tooltip title={`${s.user.firstName} ${s.user.lastName}`} key={i}>
              <Avatar
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
  const actions = () => {
    let action = [
      { Icon: PreviewIcon, label: "Xem tài liệu", action: preview },
      {
        Icon: InsertLinkIcon,
        label: "Copy link truy cập",
        action: () => {},
      },
    ];
    action.push({
      Icon: DownloadIcon,
      label: "Tải tài liệu",
      action: () => {},
    });
    return action;
  };
  return (
    <Box
      width={"100%"}
      height={"100%"}
      overflow={"auto"}
      sx={{ backgroundColor: "white" }}
    >
      <Typography
        variant="h4"
        color={"text.secondary"}
        p={2}
        pb={0}
        fontWeight={"bold"}
      >
        Tài liệu của bạn
      </Typography>

      <Box
        height={"275px"}
        width={"100%"}
        px={2}
        pt={1}
        display={histories?.length === 0 ? "none" : "block"}
      >
        <Typography
          color={"text.primary"}
          variant="h5"
          fontWeight={"bold"}
          pb={1}
        >
          Vừa truy cập
        </Typography>
        <Stack
          width={"100%"}
          maxWidth={"100%"}
          height={"240px"}
          direction={"row"}
          spacing={2}
        >
          {histories?.slice(0, 5).map((history) => (
            <Box
              key={history.id}
              sx={{
                "&:hover": { boxShadow: 2 },
                transition: "box-shadow 0.4s",
                cursor: "pointer",
                borderRadius: 3,
                height: "100%",
                width: "240px",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              }}
              p={1}
              onClick={() => navigate(`/education/subject-document/${history.subjectDocument.id}`)}
            >
              <Stack spacing={1}>
                <Owner
                  owner={history.subjectDocument?.owner}
                  createdAt={history.createdAt}
                  sx={{ p: 0 }}
                  listItem={[<PropperMenu key={1} action={actions()} />]}
                />
                <Box
                  height={"110px"}
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"center"}
                >
                  <Box
                    height={"100%"}
                    width={"100%"}
                    overflow={"hidden"}
                    borderRadius={2}
                  >
                    <img
                      width={"100%"}
                      height={"auto"}
                      alt={history.subjectDocument.document.name}
                      src={history.subjectDocument.document.thumbnail}
                    />
                  </Box>
                </Box>
                <Stack spacing={0.5}>
                  <Typography variant="h5" fontWeight={"bold"}>
                    {history.subjectDocument.subjectDocumentType.name}
                  </Typography>
                  <Typography variant="h6" noWrap>
                    {history.subjectDocument.description}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
      {data?.length === 0 && isSuccess && (
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
      {data?.length > 0 && isSuccess && (
        <Table
          headers={headers}
          items={data}
          renderItem={renderItem}
          pageSize={histories?.length === 0 ? 11 : 6}
          itemHeight={56}
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
