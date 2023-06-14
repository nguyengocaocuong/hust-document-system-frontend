import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import avatar0 from "../../assets/images/avatar/05.jpg";
import avatar1 from "../../assets/images/avatar/06.jpg";
import avatar2 from "../../assets/images/avatar/07.jpg";
import avata3 from "../../assets/images/avatar/1.jpg";
import Owner from "../Owner";
import { useDispatch } from "react-redux";
import { openReportModal } from "../../store/modalState";
import PropperMenu from "../PropperMenu";
import FlagIcon from "@mui/icons-material/Flag";
import CopyAllIcon from "@mui/icons-material/CopyAll";

const avatars = [avatar0, avatar1, avatar2, avata3];
function ReviewTeacherCard({ openModal, review }) {
  const avatar = review?.teacher.avatar
    ? review?.teacher.avatar
    : avatars[Math.round((Math.random() * 10) % 3)];
  const handleClickReportIcon = () => {
    dispatch(openReportModal({ data: "1" }));
  };
  const dispatch = useDispatch();

  const copyUrl = () => {
    const url = `http://localhost:3000/review?id=${review.id}&type=REVIEW_TEACHER`;
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
      action: handleClickReportIcon,
    },
  ];
  return (
    <Box
      sx={{
        borderRadius: "25px",
        "&:hover": { boxShadow: 4 },
        transition: "box-shadow 0.4s",
        overflow: "hidden",
        boxShadow: 2,
        mt: 3,
        cursor: "pointer",
        backgroundColor: "#F3F3F3",
      }}
      width={"100%"}
      onClick={() => openModal(review)}
    >
      <Owner
        owner={review.owner}
        createdAt={review.createdAt}
        listItem={[<PropperMenu key={1} action={actions()} />]}
      />
      <Typography textAlign={"center"} textTransform={"capitalize"}>
        Giảng viên
      </Typography>
      <Box display={"flex"} justifyContent={"center"} py={1}>
        <Avatar
          src={avatar}
          sx={{
            width: "50px",
            height: "50px",
            boxShadow: 4,
          }}
          variant="rounded"
        />
      </Box>
      <Box>
        <Typography textAlign={"center"} textTransform={"capitalize"}>
          <strong>{review?.teacher?.name}</strong>
        </Typography>
        <div
          style={{
            width: "calc(100% - 16px)",
            height: "150px",
            maxHeight: "150px",
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
              <strong>{review?.favorites?.length || 0}</strong> yêu thích
            </Typography>
          </Box>
          <Box textAlign={"center"} display={"flex"} alignItems={"center"}>
            <ChatIcon color="success" sx={{ mr: 0.5 }} />
            <Typography fontSize={"12px"}>
              <strong>{review?.comments?.length || 0}</strong> bình luận
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ReviewTeacherCard;
