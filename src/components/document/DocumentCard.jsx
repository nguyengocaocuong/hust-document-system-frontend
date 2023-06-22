import { Box, Stack } from "@mui/system";
import React from "react";
import { Grid, Typography } from "@mui/material";
import PropperMenu from "../PropperMenu";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PreviewIcon from "@mui/icons-material/Preview";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from "react-router-dom";
import Owner from "../Owner";
import FavoriteIcon from "@mui/icons-material/Favorite";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useDispatch, useSelector } from "react-redux";
import {
  openAnswerSubjectDocumentModal,
  openReportModal,
} from "../../store/modalState";
import FlagIcon from "@mui/icons-material/Flag";
import DownloadIcon from "@mui/icons-material/Download";
import CopyAllIcon from "@mui/icons-material/CopyAll";

function DocumentCard({
  document,
  subjectDetail,
  preview = () => {},
  share = () => {},
}) {
  const { user: authUser } = useSelector((state) => state.authentication);

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
  console.log(document?.owner, authUser);
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
      <Box
        width={"100%"}
        display={"flex"}
        p={2}
        pb={0}
        justifyContent={"center"}
        onClick={previewDetail}
      >
        <Box
          width={"280px"}
          height={"295px"}
          maxHeight={"295px"}
          sx={{
            backgroundColor: "white",
            cursor: "pointer",
            "&:hover": {
              boxShadow: 7,
            },
          }}
          borderRadius={1}
          textAlign={"center"}
          boxShadow={3}
        >
          <Owner
            owner={document?.owner}
            createdAt={document?.document?.createdAt}
            listItem={[<PropperMenu key={1} action={actions()} />]}
            sx={{ p: 1 }}
          />
          <Box
            width={"100%"}
            height={"140px"}
            overflow={"hidden"}
            p={0.5}
            bgcolor={"#F3F3F3"}
            borderRadius={1}
          >
            <Box
              width={"100%"}
              height={"100%"}
              overflow={"hidden"}
              borderRadius={1}
            >
              <img
                src={document?.document.thumbnail}
                alt="???"
                width={"100%"}
              />
            </Box>
          </Box>
          <Box width={"100%"} height={"84px"} textAlign={"start"} p={1} pt={2}>
            <Stack spacing={1}>
              <Typography display={"flex"} alignItems={"center"}>
                <LocalOfferIcon
                  sx={{
                    width: "15px",
                    height: "15px",
                    marginRight: 0.5,
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                />{" "}
                {subjectDetail.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: 15,
                  color: "gray",
                  lineHeight: "17px",
                }}
                noWrap
              >
                {document.description}
              </Typography>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                px={3}
              >
                <Box display={"flex"} alignItems={"center"} mr={2}>
                  <FavoriteIcon />
                  <Typography ml={1}>
                    {document?.favoriteSubjectDocumentList?.length}
                  </Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"} mr={2}>
                  <QuestionAnswerIcon />
                  <Typography ml={1}>
                    {document?.answerSubjectDocumentList?.length}
                  </Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <ChatBubbleIcon />
                  <Typography ml={1}>
                    {document?.commentSubjectDocumentList?.length}
                  </Typography>
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
