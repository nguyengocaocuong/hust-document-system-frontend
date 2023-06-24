import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useCommentPostMutation,
  useCreateAnswerForPostMutation,
  useDeleteCommentPostMutation,
  useFavoritePostMutation,
  useGetAllAnswerForPostQuery,
  useGetAllCommentForPostQuery,
  useHiddenCommentPostMutation,
  useToggleFavoriteAnswerPostMutation,
  useUpdateCommentPostMutation,
} from "../../../services/PostService";
import { convertJsonToFormData } from "../../../utils/ConvertData";
import { useParams } from "react-router-dom";
import Owner from "../../Owner";
import { Box, Chip } from "@mui/material";
import PropperMenu from "../../PropperMenu";
import DetailActions from "../../DetailActions";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import FlagIcon from "@mui/icons-material/Flag";
import Comment from "../../comment";
import DetailtAnswers from "../../DetailAnswers";
import TranslateLanguage from "../../TranslateLanguage";

function PostInfo({ postDetail, language }) {
  const { id } = useParams();
  const { user } = useSelector((state) => state.authentication);
  const isOwnerPost = postDetail.owner.id === user.id;
  const [selectedId, setSelectedId] = useState(1);
  const handleSelectedId = (id) => {
    setSelectedId(id === selectedId ? null : id);
  };
  const [favorites, setFavorite] = useState(postDetail.favorites);
  const { data: answers = [], refetch } = useGetAllAnswerForPostQuery(id);
  const [createAnswerForPost] = useCreateAnswerForPostMutation();
  const [toggleFavoriteAnswerPost] = useToggleFavoriteAnswerPostMutation();
  const addAnswerPost = (data, closeModal) => {
    createAnswerForPost(data).then((response) => {
      refetch();
      closeModal();
    });
  };
  const [favoritePost] = useFavoritePostMutation();
  const toggleFavorite = () => {
    favoritePost(postDetail.id).then((response) => {
      const favorited =
        favorites.find((favorite) => favorite.user.id === user.id) !==
        undefined;
      if (favorited)
        setFavorite(
          favorites.filter((favorite) => favorite.user.id !== user.id)
        );
      else setFavorite([...favorites, { user }]);
    });
  };
  const [commentPost] = useCommentPostMutation();
  const [deleteCommentPost] = useDeleteCommentPostMutation();
  const [updateCommentPost] = useUpdateCommentPostMutation();
  const [hiddenCommentPost] = useHiddenCommentPostMutation();

  const { data: comments = [], refetch: refetchComment } =
    useGetAllCommentForPostQuery(id);
  const addComment = (data, reset) => {
    commentPost({
      postId: id,
      body: convertJsonToFormData(data),
    }).then(() => {
      refetchComment();
      reset();
    });
  };

  const clearComment = (commentId) => {
    deleteCommentPost({ commentId, postId: id }).then(() => refetchComment());
  };
  const editComment = (comment, close) => {
    updateCommentPost({
      commentId: comment.id,
      postId: id,
      body: convertJsonToFormData(comment),
    }).then(() => {
      refetchComment();
      close();
    });
  };
  const toggleFavoriteAnswer = (id) => {
    toggleFavoriteAnswerPost(id).then(() => refetch());
  };
  const hiddenComment = (commentId) => {
    hiddenCommentPost({ commentId, postId: id }).then(() => {
      refetchComment();
    });
  };
  const copyUrl = () => {
    const url = `http://localhost:3000/post/${id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Đã copy vào clipboard");
      })
      .catch((error) => {
        console.error("Lỗi khi sao chép vào clipboard:", error);
      });
  };

  const reportSubjectDocument = () => {};
  const actions = () => [
    {
      Icon: FlagIcon,
      label: "Báo cáo tài liệu",
      action: reportSubjectDocument,
    },
    { Icon: CopyAllIcon, label: "Copy link truy cập", action: copyUrl },
  ];
  return (
    <Box width={`30%`} borderBottom="1px solid #D8D9D9" pb={2}>
      <Owner
        owner={postDetail.owner}
        createdAt={postDetail.createdAt}
        listItem={[
          <Chip
            key={1}
            label={postDetail.subject.name}
            size="small"
            sx={{ maxWidth: "100px" }}
            color="info"
          />,
          <PropperMenu key={2} action={actions()} />,
        ]}
        sx={{ height: "70px" }}
      />
      <DetailActions
        handleSelectedId={handleSelectedId}
        selectedId={selectedId}
        comments={comments}
        answers={answers}
        favorites={{ data: favorites, toggleFavorite }}
      />
      <Box
        width="100%"
        height={"calc(100% - 150px)"}
        overflow={"hidden"}
        mt={1}
      >
        {selectedId === 1 && (
          <DetailtAnswers
            answers={{
              data: answers,
              add: addAnswerPost,
              toggleFavoriteAnswer,
            }}
          />
        )}
        {selectedId === 2 && (
          <Comment
            comments={{
              data: comments,
              isOwner: isOwnerPost,
              add: addComment,
              clear: clearComment,
              edit: editComment,
              hidden: hiddenComment,
            }}
          />
        )}
        {selectedId === 3 && (
          <TranslateLanguage
            value={language.value}
            onClick={language.select}
            reset={language.reset}
          />
        )}
      </Box>
    </Box>
  );
}

export default PostInfo;
