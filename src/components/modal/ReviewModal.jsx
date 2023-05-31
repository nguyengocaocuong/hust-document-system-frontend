import { Avatar, Box, IconButton, Modal, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import CommentIcon from "@mui/icons-material/Comment";
import Comment from "../comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
const style = {
  position: "absolute",
  top: "5%",
  left: "50%",
  transform: "translate(-50%, 0%)",
  maxHeight: "90%",
};
const tempContent = `
<div>
  <h2>Đánh giá Giảng viên - Đỗ Quốc Huy</h2>
  <h3>Cách giảng dạy:</h3>
  <p>
    Giảng viên Đỗ Quốc Huy có phong cách giảng dạy rất truyền cảm hứng và sáng tạo. Anh ấy sử dụng nhiều ví dụ thực tế và minh họa đồ họa để giải thích các khái niệm khó khăn. Bài giảng của anh ấy luôn thú vị và không nhàm chán, giúp học viên tăng cường hiểu biết và áp dụng kiến thức một cách hiệu quả.
  </p>

  <h3>Tính cách:</h3>
  <p>
    Giảng viên Đỗ Quốc Huy rất thân thiện, luôn tạo một môi trường học tập thoải mái và ấm cúng. Anh ấy rất nhiệt tình và luôn sẵn lòng trợ giúp học viên khi có thắc mắc. Sự tận tâm và chu đáo của anh ấy thực sự tạo nên một trải nghiệm học tập tuyệt vời.
  </p>

  <h3>Cách chấm điểm:</h3>
  <p>
    Giảng viên Đỗ Quốc Huy chấm điểm công bằng và minh bạch. Anh ấy cung cấp các tiêu chí rõ ràng để đánh giá bài tập và luôn cung cấp phản hồi chi tiết và xây dựng để học viên có thể cải thiện. Qua đó, anh ấy tạo động lực cho học viên nỗ lực hơn trong quá trình học tập.
  </p>
</div>

`;
function ReviewModal({ modalData, closeModal }) {
  const [isShowComment, setShowComment] = useState(true);
  return (
    <Modal open={modalData.open} onClose={closeModal} sx={{ border: "none" }}>
      <Box
        sx={{ ...style }}
        width={isShowComment ? "55%" : "40%"}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            width: "100%",
            maxHeight: "100%",
            overflow: "auto",
            display: "flex",
          }}
        >
          <Box
            width={isShowComment ? "60%" : "100%"}
            sx={{ borderRight: "1px solid gray" }}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              width={"100%"}
              justifyContent={"space-between"}
              p={2}
              borderBottom={"1px solid gray"}
            >
              <Box display={"flex"} alignItems={"center"}>
                <Avatar sx={{ backgroundColor: red[500], mr: 1 }}>H</Avatar>
                <Box>
                  <Typography variant="h4">Đỗ Quốc Huy</Typography>
                  <Typography>
                    <span style={{ fontSize: "12px", paddingRight: "5px" }}>
                      {" "}
                      Ngày đăng
                    </span>
                    28-10-2000
                  </Typography>
                </Box>
              </Box>
              <Box display={"flex"} alignItems={"ceter"}>
                <Box display={"flex"} alignItems={"center"} mr={2}>
                  <IconButton onClick={() => setShowComment(true)}>
                    <FavoriteIcon />
                  </IconButton>
                  <Typography fontSize={"12px"}>23 lượt thích</Typography>
                </Box>
                {!isShowComment && (
                  <Box display={"flex"} alignItems={"center"}>
                    <IconButton onClick={() => setShowComment(true)}>
                      <CommentIcon />
                    </IconButton>
                    <Typography fontSize={"10px"}>223 bình luận</Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <Box p={2} pt={1}>
              <div
                dangerouslySetInnerHTML={{ __html: tempContent }}
                id="review-content"
              />
            </Box>
          </Box>
          {isShowComment && (
            <Box width={"40%"}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                p={2}
                height={"78px"}
                borderBottom={"1px solid gray"}
              >
                <Typography
                  variant="h4"
                  fontWeight={"bold"}
                  color="text.secondary"
                >
                  Bình luận
                </Typography>
                <IconButton onClick={() => setShowComment(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Comment comments={{ add: () => console.log("add"), data: [] }} />
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
}

export default ReviewModal;
