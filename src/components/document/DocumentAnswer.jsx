import * as React from "react";
import { IconButton, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Owner from "../Owner";
import { checkURLType } from "../../utils/URLCheck";
import { useDispatch, useSelector } from "react-redux";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import PreviewIcon from "@mui/icons-material/Preview";
import DownloadIcon from "@mui/icons-material/Download";
import FlagIcon from "@mui/icons-material/Flag";
import ShareIcon from "@mui/icons-material/Share";
import PropperMenu from "../PropperMenu";
import {
  openDocumentViewerModal,
  openReportModal,
} from "../../store/modalState";

function DocumentAnswer({ answer, toggleFavorite }) {
  const [isShowAll, setShowAll] = React.useState(false);
  const { user } = useSelector((state) => state.authentication);
  const isFavorited = answer?.favorites?.find((f) => f.user.id === user.id)
    ? true
    : false;

  const dispatch = useDispatch();
  const preview = () => {
    if (answer?.type === "LINK") {
      window.open(answer.document.url, "_blank");
    } else {
      dispatch(
        openDocumentViewerModal({
          docs: [
            {
              uri: `https://hust-document-system-backend-vxw4qk34wa-as.a.run.app/api/v1/users/posts/answer/${answer?.id}/readFile`,
              fileName: answer.document.name,
            },
          ],
        })
      );
    }
  };
  const downloadAnswerSubjectDocument = () => {};
  const reportAnswerSubjectDocument = () => {
    dispatch(
      openReportModal({
        answerPostId: answer.id,
      })
    );
  };
  const share = () => {};
  const actions = () => [
    { Icon: PreviewIcon, label: "Xem tài liệu", action: preview },
    {
      Icon: DownloadIcon,
      label: "Tải tài liệu",
      action: downloadAnswerSubjectDocument,
    },
    {
      Icon: FlagIcon,
      label: "Báo cáo tài liệu",
      action: reportAnswerSubjectDocument,
    },
    { Icon: InsertLinkIcon, label: "Copy link truy cập", action: () => {} },
    { Icon: ShareIcon, label: "Chia sẻ", action: share },
  ];
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
          {answer?.type !== "LINK" && (
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

export default DocumentAnswer;
