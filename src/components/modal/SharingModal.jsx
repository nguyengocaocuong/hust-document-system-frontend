import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Modal,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropdownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LanguageIcon from "@mui/icons-material/Language";
import { useState } from "react";
import { useGetUserForFilterQuery } from "../../services/FilterService";
import {
  useGenerateUrlForPublicSubjectDocumentOnInternetQuery,
  useGenerateUrlForPublicSubjectDocumentOnWebsiteQuery,
  useGetAllSubjectDocumentCreateByUserQuery,
  useGetAllUserSharedQuery,
  useShareSubjectDocumentMutation,
} from "../../services/SubjectService";
import { useDispatch, useSelector } from "react-redux";
import { closeSharingModal } from "../../store/modalState";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "450px",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
};
function SharingModal({ open }) {
  const { refetch: refetchSubjectDocumentCreateByUser } =
    useGetAllSubjectDocumentCreateByUserQuery();
  const dispatch = useDispatch();
  const {
    sharingModal: { dataModal },
  } = useSelector((state) => state.modalState);
  const closeModal = () => {
    dispatch(closeSharingModal());
  };
  const [isShowDropdown, setShowDropdown] = useState(false);
  const { data: user = { item: [] } } = useGetUserForFilterQuery();
  const [key, setKey] = useState("");
  const { data: shared = [] } = useGetAllUserSharedQuery(
    dataModal.subjectDocumentId
  );
  const [shareSubjectDocument] = useShareSubjectDocumentMutation();
  const [selectedUser, setSelectedUser] = useState(
    shared.map((u) => ({ data: u }))
  );
  useEffect(() => {
    setSelectedUser(() => shared.map((u) => ({ data: u })));
  }, [shared]);

  const handleSelectUser = (user) => {
    if (selectedUser.find((u) => u.data?.id === user.data.id) === undefined) {
      setSelectedUser([...selectedUser, user]);
    } else
      setSelectedUser((pre) => pre.filter((u) => u.data?.id !== user.data.id));
    setShowDropdown(false);
  };
  const deleteUser = (user) => {
    setSelectedUser((pre) => [
      ...pre.filter((u) => u.data?.id !== user.data.id),
    ]);
  };

  const handleShare = () => {
    if (selectedUser.length === 0) return;
    var body = new FormData();
    body.append(
      "shareUserId",
      selectedUser.map((u) => u.data?.id)
    );
    body.append(
      "deleteUserId",
      shared
        .filter(
          (u) => selectedUser.find((s) => s.data?.id === u.id) === undefined
        )
        .map((u) => u.id)
    );
    shareSubjectDocument({ id: dataModal.subjectDocumentId, body }).then(
      () => {
        refetchSubjectDocumentCreateByUser();
        closeModal();
      }
    );
  };

  const { data: urlOnInternet, isSuccess: isSuccessOnInternet } =
    useGenerateUrlForPublicSubjectDocumentOnInternetQuery(
      dataModal.subjectDocumentId
    );
  const { data: urlOnWebsite, isSuccess: isSuccessOnWebsite } =
    useGenerateUrlForPublicSubjectDocumentOnWebsiteQuery(
      dataModal.subjectDocumentId
    );
  const handleGeneratePublicOnInternetUrl = () => {
    if (isSuccessOnInternet) {
      navigator.clipboard
        .writeText(urlOnInternet)
        .then(() => {
          alert("Đã copy vào clipboard");
        })
        .catch((error) => {
          console.error("Lỗi khi sao chép vào clipboard:", error);
        });
    }
  };
  const handleGeneratePublicOnWebsiteUrl = () => {
    if (isSuccessOnWebsite) {
      navigator.clipboard
        .writeText(urlOnWebsite)
        .then(() => {
          alert("Đã copy vào clipboard");
        })
        .catch((error) => {
          console.error("Lỗi khi sao chép vào clipboard:", error);
        });
    }
  };
  return (
    <Modal open={open} onClose={closeModal}>
      <Box sx={{ ...style }}>
        <Box
          sx={{
            width: "100%",
            height: "15px",
            borderRadius: "25px 25px 0 0",
            backgroundColor: "red",
          }}
        ></Box>
        <Box
          sx={{
            width: "100%",
            height: "550px",
            backgroundColor: "white",
            p: 2,
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              fontSize={"20px"}
              fontWeight={"bold"}
              color={"text.secondary"}
            >
              Chia sẻ tài liệu học tập
            </Typography>
            <IconButton onClick={closeModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography fontSize={"15px"} color={"text.primary"}>
            Hãy chia sẻ tài liệu học tập tới bạn bè của bạn
          </Typography>
          <Box
            my={3}
            sx={{
              borderRadius: 1,
              border: "1px solid gray",
              position: "relative",
              zIndex: 20,
            }}
          >
            <IconButton>
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{
                width: "calc(100% - 75px)",
              }}
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Nhập tên hoặc email bạn bè"
            />
            <IconButton onClick={() => setShowDropdown(!isShowDropdown)}>
              <ArrowDropdownIcon />
            </IconButton>
            <Box
              display={isShowDropdown || key.length > 0 ? "block" : "none"}
              sx={{
                width: "100%",
                boxShadow: 1,
                maxHeight: "200px",
                position: "absolute",
                top: "100%",
                left: 0,
                borderRadius: 1,
                overflow: "auto",
                backgroundColor: "white",
              }}
            >
              {user.item
                .filter(
                  (u) =>
                    key === undefined ||
                    key === "" ||
                    `${u.data?.firstName} ${u.data?.lastName}`
                      .toUpperCase()
                      .includes(key.toUpperCase()) ||
                    u.data?.email.toUpperCase().includes(key.toUpperCase())
                )
                .map((u, i) => (
                  <Box
                    key={i}
                    display={"flex"}
                    alignItems={"center"}
                    p={1}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#F4F4F4",
                      },
                      borderRadius: 1,
                      cursor: "pointer",
                    }}
                    onClick={() => handleSelectUser(u)}
                  >
                    <Avatar src={u.data?.avatar} sx={{ width: 35, height: 35 }}>
                      {u.data?.lastName?.substring(
                        u.data?.lastName.lastIndexOf(" ") + 1,
                        u.data?.lastName.lastIndexOf(" ") + 2
                      )}
                    </Avatar>
                    <Box pl={1}>
                      <Typography
                        fontSize={"14px"}
                        fontWeight={700}
                      >{`${u.data?.firstName} ${u.data?.lastName}`}</Typography>
                      <Typography fontSize={"12px"}>{u.data?.email}</Typography>
                    </Box>
                  </Box>
                ))}
            </Box>
          </Box>
          <Box my={1}>
            <Typography
              fontSize={"15px"}
              color={"text.secondary"}
              fontWeight={"bold"}
              py={0.5}
            >
              Những người được chia sẻ
            </Typography>
            <Stack spacing={1} sx={{ height: "180px", overflow: "auto" }}>
              {selectedUser.map((u, i) => (
                <Box
                  key={i}
                  display={"flex"}
                  alignItems={"center"}
                  p={1}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#F4F4F4",
                    },
                    borderRadius: 1,
                    cursor: "pointer",
                  }}
                >
                  <Avatar src={u.data?.avatar} sx={{ width: 40, height: 40 }}>
                    {u.data?.lastName?.substring(
                      u.data?.lastName?.lastIndexOf(" ") + 1,
                      u.data?.lastName?.lastIndexOf(" ") + 2
                    )}
                  </Avatar>
                  <Box pl={1} width={"calc(100% - 80px)"}>
                    <Typography
                      fontSize={"14px"}
                      fontWeight={700}
                    >{`${u.data?.firstName} ${u.data?.lastName}`}</Typography>
                    <Typography fontSize={"12px"}>{u.data?.email}</Typography>
                  </Box>
                  <Tooltip title="Ngừng chia sẻ">
                    <IconButton onClick={() => deleteUser(u)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              ))}
              {selectedUser.length === 0 && (
                <Typography
                  sx={{
                    p: 8,
                    border: "1px dotted gray",
                    width: "calc(100% - 16px)",
                    height: "calc(100% - 16px)",
                    display: "block",
                    m: 1,
                  }}
                  display={"flex"}
                  alignItems={"center"}
                  variant="h6"
                >
                  Bạn chưa chia sẻ tài liệu này cho bất cứ ai
                </Typography>
              )}
            </Stack>
            <Box display={"flex"} alignItems={"center"} justifyContent={"end"}>
              <Button
                sx={{ borderRadius: "25px", textTransform: "capitalize" }}
                variant="contained"
                color={"success"}
                onClick={handleShare}
              >
                Chia sẻ
              </Button>
            </Box>
          </Box>
          <Box>
            <Typography
              fontSize={"15px"}
              color={"text.secondary"}
              fontWeight={"bold"}
              py={0.5}
            >
              Tạo link truy cập{" "}
            </Typography>
            <Box display={"flex"} alignItems={"center"}>
              <IconButton>
                <ShareIcon sx={{ width: 30, height: 30 }} />
              </IconButton>
              <Box width={"calc(100% - 95px)"}>
                <Typography
                  fontSize={"14px"}
                  fontWeight={700}
                  color={"text.secondary"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  Bất kỳ người dùng hệ thống nào có link
                  <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />
                </Typography>
                <Typography fontSize={"12px"}>
                  Bất kỳ người dùng hệ thống nào trong hệ thống có link đều có
                  thể truy cập tài liệu
                </Typography>
              </Box>
              <Tooltip title={"Copy link"}>
                <IconButton onClick={handleGeneratePublicOnWebsiteUrl}>
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <IconButton>
                <LanguageIcon sx={{ width: 30, height: 30 }} />
              </IconButton>
              <Box width={"calc(100% - 95px)"}>
                <Typography
                  fontSize={"14px"}
                  fontWeight={700}
                  color={"text.secondary"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  Public lên internet
                  <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />
                </Typography>
                <Typography fontSize={"12px"}>
                  Bất kỳ ai có link đề có thể truy cập tới tài liệu
                </Typography>
              </Box>
              <Tooltip title={"Copy link"}>
                <IconButton onClick={handleGeneratePublicOnInternetUrl}>
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default SharingModal;
