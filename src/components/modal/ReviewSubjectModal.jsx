import { Box, Divider, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Comment from "../comment";
import { useState } from "react";
import {
  useCreateCommentReviewSubjectMutation,
  useDeleteCommentReviewSubjectMutation,
  useGetAllCommentForReviewSubjectQuery,
  useGetAllFavoritereviewSubjectQuery,
  useToggleFavoriteReviewSubjectMutation,
} from "../../services/SubjectService";
import FlagIcon from "@mui/icons-material/Flag";
import Owner from "../Owner";
import Actions from "../Actions";
import { useDispatch, useSelector } from "react-redux";
import {
  closeReviewSubjectModal,
  openReportModal,
} from "../../store/modalState";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import PropperMenu from "../PropperMenu";
import { convertJsonToFormData } from "../../utils/ConvertData";
import { useEffect } from "react";
import Pusher from "pusher-js";

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

function ReviewSubjectModal({ open }) {
  const { user } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const {
    reviewSubjectModal: { dataModal },
  } = useSelector((state) => state.modalState);
  const closeModal = () => {
    dispatch(closeReviewSubjectModal());
  };

  const [isShowComment, setShowComment] = useState(false);
  const [createCommentReviewSubject] = useCreateCommentReviewSubjectMutation();

  const {
    data: favoritesReviewSubject = [],
    refetch: refetchFavoriteReviewSubject,
  } = useGetAllFavoritereviewSubjectQuery(dataModal.id);

  const [toggleFavoriteReviewSubject] =
    useToggleFavoriteReviewSubjectMutation();

  const [deleteCommentReviewSubject] = useDeleteCommentReviewSubjectMutation();

  const {
    data: commentsReviewSubject = [],
    refetch: refeatchCommentReviewSubject,
  } = useGetAllCommentForReviewSubjectQuery(dataModal.id);

  const addComment = (data, reset) => {
    createCommentReviewSubject({
      id: dataModal.id,
      body: convertJsonToFormData(data),
    }).then(() => {
      refeatchCommentReviewSubject();
      reset();
    });
  };
  const handleClickCommentButton = () => setShowComment(!isShowComment);
  const handleClickFavoriteButton = () => {
    toggleFavoriteReviewSubject(dataModal.id).then(() => {
      refetchFavoriteReviewSubject();
    });
  };
  const deleteComment = (id) => {
    deleteCommentReviewSubject({
      reviewSubjectId: dataModal.id,
      commentId: id,
    }).then(() => refeatchCommentReviewSubject());
  };

  const report = () => {
    dispatch(openReportModal({}));
  };
  const copyUrl = () => {
    const url = `http://localhost:3000/review?id=${dataModal.id}&type=REVIEW_SUBJECT`;
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
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(commentsReviewSubject);
  }, [commentsReviewSubject]);

  const channelName = `comment-review-subject-${dataModal.id}`;
  useEffect(() => {
    const pusherService = new Pusher("070ff19e8a1a4c8d4553", {
      cluster: "ap1",
    });
    const channel = pusherService.subscribe(channelName);
    channel.bind("new-comment", (newComment) => {
      setComments((preComments) => [...preComments, newComment]);
    });
    channel.bind("edit-comment", (editedComment) => {
      setComments((preComments) =>
        preComments.map((comment) =>
          comment.id === editedComment.id ? editedComment : comment
        )
      );
    });
    channel.bind("delete-comment", (deletedCommentId) => {
      setComments((preComments) =>
        preComments.filter((comment) => comment.id !== deletedCommentId)
      );
    });
    channel.bind("hidden-comment", (hiddenedCommentId) => {
      setComments((preComments) =>
        preComments.filter(
          (comment) =>
            comment.id !== hiddenedCommentId || (comment.owner.id = user.id)
        )
      );
    });
    return () => {
      channel.unbind();
      pusherService.unsubscribe(channelName);
      pusherService.disconnect();
    };
  }, [channelName, user]);
  return (
    <Modal open={open} onClose={closeModal} sx={{ border: "none" }}>
      <Box sx={{ ...style }}>
        <Box display={"flex"} alignItems={"center"} p={2} sx={{}}>
          <Typography
            variant="h4"
            textAlign={"center"}
            width={"calc(100% - 30px)"}
          >
            Review môn <strong>{dataModal.subject.name}</strong>
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
              data: favoritesReviewSubject || [],
              onClick: handleClickFavoriteButton,
            }}
            comment={{
              data: comments || [],
              onClick: handleClickCommentButton,
            }}
          />
          {isShowComment && (
            <Comment
              mainColor="white"
              comments={{
                add: addComment,
                data: comments || [],
                clear: deleteComment,
              }}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
}

export default ReviewSubjectModal;
