import { Box, Typography } from "@mui/material";
import React from "react";
import Owner from "../Owner";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import { useDispatch } from "react-redux";
import { openReportModal } from "../../store/modalState";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import PropperMenu from "../PropperMenu";
import FlagIcon from "@mui/icons-material/Flag";

function ReviewSujectCard({ review, openModal }) {
  const dispatch = useDispatch();
  const report = () => {
    dispatch(
      openReportModal({ object: review, type: "CONTENT_REVIEW_SUBJECT" })
    );
  };
  const copyUrl = () => {
    const url = `${document.location.origin}/review?id=${review.id}&type=REVIEW_SUBJECT`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Đã copy vào clipboard");
      })
      .catch((error) => {
        console.error("Lỗi khi sao chép vào clipboard:", error);
      });
  };
  const actions = () => [
    {
      Icon: CopyAllIcon,
      label: "Copy link truy cập",
      action: copyUrl,
    },
    {
      Icon: FlagIcon,
      label: "Báo cáo bài viết",
      action: report,
    },
  ];
  return (
    <Box
      sx={{
        boxShadow: 2,
        borderRadius: "25px",
        mt: 3,
        "&:hover": { boxShadow: 4 },
        transition: "box-shadow 0.4s",
        overflow: "hidden",
        cursor: "pointer",
        backgroundColor: "#F3F3F3",
        width: "100%",
      }}
      onClick={() => openModal(review)}
    >
      <Owner
        owner={review?.owner}
        createdAt={review?.createdAt}
        listItem={[<PropperMenu key={1} action={actions()} />]}
      />
      <Box px={2} mb={1} display={"flex"} alignItems={"center"}>
        <LocalOfferIcon sx={{ width: "15px", height: "15px" }} />
        <Typography variant="h6" ml={1}>
          {review?.subject.name}
        </Typography>
      </Box>
      <div
        style={{
          width: "calc(100% - 16px)",
          height: "235px",
          overflow: "hidden",
          background: "white",
          padding: "0 10px",
          backgroundColor: "white",
          margin: "8px",
          borderRadius: "8px",
        }}
        dangerouslySetInnerHTML={{ __html: review?.review }}
        id="review-content"
      />
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        m={1}
        mr={1.7}
        mt={1.5}
      >
        <Box textAlign={"center"} display={"flex"} alignItems={"center"}>
          <FavoriteIcon sx={{ color: "red", mr: 0.5 }} />
          <Typography fontSize={"12px"}>
            <strong>{review?.favorites.length || 0}</strong> yêu thích
          </Typography>
        </Box>
        <Box textAlign={"center"} display={"flex"} alignItems={"center"}>
          <ChatIcon color="success" sx={{ mr: 0.5 }} />
          <Typography fontSize={"12px"}>
            <strong>{review?.comments.length || 0}</strong> bình luận
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ReviewSujectCard;
