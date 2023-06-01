import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useCommentPostMutation,
  useCreateAnswerForPostMutation,
  useDeleteCommentPostMutation,
  useFavoritePostMutation,
  useGetAllAnswerForPostQuery,
  useGetAllCommentForPostQuery,
} from "../../../services/PostService";
import { convertJsonToFormData } from "../../../utils/ConvertData";
import DocumentDetailInfo from "../../document/DocumentDetailInfo";
import { useParams } from "react-router-dom";

function PostInfo({ postDetail }) {
  const {id} = useParams()
  const { user } = useSelector((state) => state.authentication);
  const [favorites, setFavorite] = useState(postDetail.favoritePostList);
  const {data: answerPost = [], refetch} = useGetAllAnswerForPostQuery(id)
  console.log(answerPost)
  const [createAnswerForPost] = useCreateAnswerForPostMutation();
  const addAnswerPost = (data, closeModal) => {
    createAnswerForPost(data).then((response) => {
      refetch()
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
  const { data: commentData = [], refetch: refetchComment } =
    useGetAllCommentForPostQuery(postDetail.id);
  const addComment = (data, reset) => {
    commentPost({
      postId: postDetail.id,
      body: convertJsonToFormData(data),
    }).then((response) => {
      refetchComment();
      reset();
    });
  };
  const clearComment = (commentId) => {
    deleteCommentPost(commentId).then((response) => refetchComment());
  };
  return (
    <DocumentDetailInfo
      owner={postDetail.owner}
      objectName={postDetail.subject?.name}
      comments={{
        data: commentData,
        add: addComment,
        clear: clearComment,
      }}
      answers={{ data: answerPost, add: addAnswerPost }}
      favorites={{ data: favorites, toggleFavorite }}
    />
  );
}

export default PostInfo;
