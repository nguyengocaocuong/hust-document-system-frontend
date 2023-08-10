import * as React from "react";
import { IconButton, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Owner from "./Owner";
import { checkURLType } from "../utils/URLCheck";
import { useDispatch, useSelector } from "react-redux";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import PreviewIcon from "@mui/icons-material/Preview";
import DownloadIcon from "@mui/icons-material/Download";
import { openDocumentViewerModal } from "../store/modalState";
import PropperMenu from "./PropperMenu";
import DeleteIcon from "@mui/icons-material/Delete";
import noteIcon from "../assets/images/icon/note.png";
import { useLocation, useParams } from "react-router-dom";
function AnswerCard({ answer, toggleFavorite, onShowAnnotate }) {
  const { id } = useParams();
  const location = useLocation();
  const [isShowAll, setShowAll] = React.useState(false);
  const { user } = useSelector((state) => state.authentication);
  const isFavorited = answer?.favorites?.find((f) => f.user.id === user.id)
    ? true
    : false;
  const isOwnerAnswer = answer.owner.id === user.id;
  const dispatch = useDispatch();
  const preview = () => {
    if (answer.type === "LINK") {
      window.open(answer.document.url, "_blank");
    } else if (answer.type === "ANNOTATE") {
      onShowAnnotate(answer.id);
    } else {
      dispatch(
        openDocumentViewerModal({
          docs: [
            {
              uri: location.pathname.startsWith("/post/")
                ? `${process.env.REACT_APP_BASE_URL}/api/v1/users/posts/${id}/answer/${answer?.id}/readFile`
                : `${process.env.REACT_APP_BASE_URL}/api/v1/users/subjects/subjectDocument/${id}/answerSubjectDocument/${answer.id}/readFile`,
              fileName: answer.document.name,
            },
          ],
        })
      );
    }
  };
  const downloadAnswerSubjectDocument = () => {};
  // const reportAnswerSubjectDocument = () => {
  //   dispatch(
  //     openReportModal({
  //       answerPostId: answer.id,
  //     })
  //   );
  // };
  const deleteAnswerSubjectDocument = () => {
    alert("delete");
  };
  const actions = () => {
    let action = [
      { Icon: PreviewIcon, label: "Xem tài liệu", action: preview },
      {
        Icon: InsertLinkIcon,
        label: "Copy link truy cập",
        action: () => {},
      },
    ];
    if (answer.type !== "LINK")
      action.push({
        Icon: DownloadIcon,
        label: "Tải tài liệu",
        action: downloadAnswerSubjectDocument,
      });
    if (isOwnerAnswer)
      action.push({
        Icon: DeleteIcon,
        label: "Xóa tài liệu",
        action: deleteAnswerSubjectDocument,
      });
    return action;
  };

  return (
    <Box
      sx={{
        "&:hover": { boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" },
        cursor: "pointer",
        borderRadius: 3,
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}
    >
      <Owner
        owner={answer?.owner}
        createdAt={answer?.createdAt}
        listItem={[<PropperMenu key={1} action={actions()} />]}
      />
      <Box px={2}>
        <Stack spacing={1}>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ lineHeight: "22px" }}
            width={"100%"}
            display={answer?.type === "ANNOTATE" ? "none" : "block"}
          >
            {isShowAll
              ? answer?.description
              : answer?.description?.substring(0, 90)}
            {answer?.description?.length > 90 &&
              (isShowAll ? (
                <Typography fontSize={"11px"} onClick={() => setShowAll(false)}>
                  Thu gọn
                </Typography>
              ) : (
                <Typography fontSize={"11px"} onClick={() => setShowAll(true)}>
                  Xem thêm
                </Typography>
              ))}
          </Typography>
          {answer?.type === "LINK" && (
            <Box
              position="relative"
              sx={{
                maxWidth: "100%",
                border: "1px dotted gray",
                padding: "12px",
                borderRadius: "8px",
              }}
            >
              <a href={answer?.document?.url} target="_blank" rel="noreferrer">
                <Typography
                  sx={{
                    lineHeight: "17px",
                    maxWidth: "100%",
                    overflow: "hidden",
                  }}
                >
                  {answer?.document?.url}
                </Typography>
              </a>
              <Typography
                sx={{
                  position: "absolute",
                  bottom: "-10px",
                  right: "50px",
                  backgroundColor: "#E5E5E5",
                  px: 1,
                  fontWeight: "bold",
                }}
              >
                {checkURLType(answer?.document?.url)}
              </Typography>
              <Box
                sx={{
                  position: "absolute",
                  top: "-10px",
                  right: 0,
                  color: "green",
                  transform: "rotate(-45deg)",
                  backgroundColor: "#E5E5E5",
                }}
              >
                <InsertLinkIcon />
              </Box>
            </Box>
          )}
          {answer?.type !== "LINK" && answer?.type !== "ANNOTATE" && (
            <Box
              width={"100%"}
              maxHeight={"150px"}
              maxWidth={"100%"}
              overflow={"hidden"}
              borderRadius={1}
            >
              <img
                src={answer?.document?.thumbnail}
                style={{ width: "100%" }}
                alt="?"
              />
            </Box>
          )}
          {answer?.type === "ANNOTATE" && (
            <Box
              width={"100%"}
              maxHeight={"150px"}
              maxWidth={"100%"}
              overflow={"hidden"}
              borderRadius={1}
              display={"flex"}
            >
              <img src={noteIcon} style={{ height: "100px" }} alt="?" />
              <Typography px={2} variant="h5">
                {answer.description}
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pb: 1,
            }}
          >
            <Box display={"flex"} alignItems={"center"}>
              <IconButton onClick={() => toggleFavorite(answer?.id)}>
                <FavoriteOutlinedIcon
                  style={{ color: isFavorited ? "red" : "inherit" }}
                />{" "}
              </IconButton>
              <Typography style={{ fontSize: "15px" }}>
                {answer?.favorites?.length} lượt thích
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default AnswerCard;
