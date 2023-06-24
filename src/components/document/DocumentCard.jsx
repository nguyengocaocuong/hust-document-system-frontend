import { Box, Stack } from "@mui/system";
import React from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import PropperMenu from "../PropperMenu";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PreviewIcon from "@mui/icons-material/Preview";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from "react-router-dom";
import Owner from "../Owner";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useDispatch, useSelector } from "react-redux";
import {
  openAnswerSubjectDocumentModal,
  openReportModal,
} from "../../store/modalState";
import FlagIcon from "@mui/icons-material/Flag";
import DownloadIcon from "@mui/icons-material/Download";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

function DocumentCard({
  document,
  subjectDetail,
  preview = () => {},
  share = () => {},
}) {
  const { user: authUser } = useSelector((state) => state.authentication);
  const isFavorited = document?.favorites?.find(
    (f) => f.user.id === authUser.id
  )
    ? true
    : false;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const previewDetail = () => {
    navigate(`/education/subject-document/${document.id}`);
  };
  const addNewAnswer = () => {
    dispatch(
      openAnswerSubjectDocumentModal({
        subjectDocumentId: document.id,
      })
    );
  };
  const reportSubjectDocument = () => {
    dispatch(
      openReportModal({
        subjectId: subjectDetail.id,
      })
    );
  };
  const downloadSubjectDocument = () => {
    alert("download");
  };

  const copyUrl = () => {
    const url = `http://localhost:3000/education/subject-document/${document.id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Đã copy vào clipboard");
      })
      .catch((error) => {
        console.error("Lỗi khi sao chép vào clipboard:", error);
      });
  };
  const isOwner = document?.owner.id === authUser.id;
  const actions = () => {
    let arrAction = [
      { Icon: PreviewIcon, label: "Xem trước", action: preview },
      { Icon: VisibilityIcon, label: "Xem chi tiết", action: previewDetail },
      {
        Icon: AddCircleOutlineIcon,
        label: "Thêm đáp án",
        action: addNewAnswer,
      },
      {
        Icon: DownloadIcon,
        label: "Tải tài liệu",
        action: downloadSubjectDocument,
      },
      {
        Icon: FlagIcon,
        label: "Báo cáo tài liệu",
        action: reportSubjectDocument,
      },
      { Icon: CopyAllIcon, label: "Copy link truy cập", action: copyUrl },
    ];
    if (isOwner) {
      arrAction.push({ Icon: ShareIcon, label: "Chia sẻ", action: share });
    }
    return arrAction;
  };
  return (
    <Grid item xl={4}>
      <Box width={"100%"} display={"flex"} pb={0} justifyContent={"center"}>
        <Box
          sx={{
            "&:hover": { boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" },
            cursor: "pointer",
            borderRadius: 3,
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }}
          onClick={previewDetail}
        >
          <Owner
            owner={document?.owner}
            createdAt={document?.document?.createdAt}
            listItem={[<PropperMenu key={1} action={actions()} />]}
          />
          <Box px={2}>
            <Stack spacing={1}>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ lineHeight: "18px" }}
                width={"100%"}
                height={"44px"}
                py={0.5}
                overflow={"hidden"}
              >
                {document?.description?.substring(0, 85)}
              </Typography>
              <Box
                width={"100%"}
                maxHeight={"150px"}
                maxWidth={"100%"}
                overflow={"hidden"}
                borderRadius={1}
              >
                <img
                  src={document?.document.thumbnail}
                  style={{ width: "100%" }}
                  alt="?"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pb: 1,
                }}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Box display={"flex"} alignItems={"center"}>
                    <IconButton>
                      <FavoriteOutlinedIcon
                        style={{ color: isFavorited ? "red" : "inherit" }}
                      />{" "}
                    </IconButton>
                    <Typography style={{ fontSize: "15px" }}>
                      {document?.favorites?.length}{" "}
                      <span style={{ fontSize: "13px" }}>lượt thích</span>
                    </Typography>
                  </Box>
                  <Box display={"flex"} alignItems={"center"}>
                    <IconButton color="success">
                      <QuestionAnswerIcon />{" "}
                    </IconButton>
                    <Typography style={{ fontSize: "15px" }}>
                      {document?.answers?.length}{" "}
                      <span style={{ fontSize: "13px" }}>đáp án</span>
                    </Typography>
                  </Box>
                  <Box display={"flex"} alignItems={"center"}>
                    <IconButton color={"primary"}>
                      <ChatBubbleIcon />{" "}
                    </IconButton>
                    <Typography style={{ fontSize: "15px" }}>
                      {document?.comments?.length}{" "}
                      <span style={{ fontSize: "13px" }}>bình luận</span>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}

export default DocumentCard;
