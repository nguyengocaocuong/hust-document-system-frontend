import { Box, Divider, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Comment from "../comment";
import { useState } from "react";
import {
  useCreateCommentReviewTeacherMutation,
  useDeleteCommentReviewTeacherMutation,
  useGetAllCommentForReviewTeacherQuery,
  useGetAllFavoritereviewTeacherQuery,
  useToggleFavoriteReviewTeacherMutation,
} from "../../services/TeacherService";
import Owner from "../Owner";
import Actions from "../Actions";
import { useDispatch, useSelector } from "react-redux";
import {
  closeReviewTeacherModal,
  openReportModal,
} from "../../store/modalState";
import PropperMenu from "../PropperMenu";
import FlagIcon from "@mui/icons-material/Flag";
import CopyAllIcon from "@mui/icons-material/CopyAll";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "90%",
  overflow: "hidden",
  width: "45%",
  minWidth: "600px",
  backgroundColor: "#f7f7f2",
  borderRadius: 1,
  boxShadow: 24,
};

function ReviewTeacherModal({ open }) {
  const dispatch = useDispatch();
  const {
    reviewTeacherModal: { dataModal },
  } = useSelector((state) => state.modalState);
  const closeModal = () => {
    dispatch(closeReviewTeacherModal());
  };

  const [isShowComment, setShowComment] = useState(false);
  const [createCommentReviewTeacher] = useCreateCommentReviewTeacherMutation();
  const {
    data: favoritesReviewTeacher = [],
    refetch: refetchFavoriteReviewTeacher,
  } = useGetAllFavoritereviewTeacherQuery(dataModal.id);
  const [toggleFavoriteReviewTeacher] =
    useToggleFavoriteReviewTeacherMutation();
  const [deleteCommentReviewTeacher] = useDeleteCommentReviewTeacherMutation();
  const {
    data: commentsReviewTeacher = [],
    refetch: refeatchCommentReviewTeacher,
  } = useGetAllCommentForReviewTeacherQuery(dataModal.id);
  const addComment = (data) => {
    const formData = new FormData();
    formData.append("comment", data.comment);
    if (data.parentCommentId) {
      formData.append("parentCommentId", data.parentCommentId);
    }
    createCommentReviewTeacher({
      id: dataModal.id,
      body: formData,
    }).then((response) => refeatchCommentReviewTeacher());
  };
  const handleClickCommentButton = () => setShowComment(!isShowComment);
  const handleClickFavoriteButton = () => {
    toggleFavoriteReviewTeacher(dataModal.id).then(() => {
      refetchFavoriteReviewTeacher();
    });
  };
  const deleteComment = (id) => {
    deleteCommentReviewTeacher(id).then(() => refeatchCommentReviewTeacher());
  };
  const handleClickReportIcon = () => {
    dispatch(openReportModal({ data: "1" }));
  };
  const copyUrl = () => {
    const url = `http://localhost:3000/review?id=${dataModal.id}&type=REVIEW_TEACHER`;
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
    <Modal open={open} onClose={closeModal} sx={{ border: "none" }}>
      <Box sx={{ ...style }}>
        <Box display={"flex"} alignItems={"center"} p={2} sx={{}}>
          <Typography
            variant="h4"
            textAlign={"center"}
            width={"calc(100% - 30px)"}
          >
            Review giảng viên
            <strong>{dataModal.teacher.name}</strong>
          </Typography>
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box
          maxHeight={"580px"}
          overflow={"auto"}
          sx={{
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Owner
            owner={dataModal.owner}
            createdAt={dataModal.createdAt}
            listItem={[<PropperMenu key={1} action={actions()} />]}
          />
          <Box p={2} pt={1} sx={{ backgroundColor: "white", borderRadius: 1 }}>
            <div
              dangerouslySetInnerHTML={{ __html: dataModal.review }}
              id="review-content"
            />
          </Box>
          <Actions
            favorite={{
              data: favoritesReviewTeacher || [],
              onClick: handleClickFavoriteButton,
            }}
            comment={{
              data: commentsReviewTeacher || [],
              onClick: handleClickCommentButton,
            }}
          />
          {isShowComment && (
            <Comment
              mainColor="white"
              comments={{
                add: addComment,
                data: commentsReviewTeacher || [],
                clear: deleteComment,
              }}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
}

export default ReviewTeacherModal;
