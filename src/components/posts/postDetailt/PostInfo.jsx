import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useCommentPostMutation,
  useCreateAnswerForPostMutation,
  useDeleteCommentPostMutation,
  useFavoritePostMutation,
  useGetAllAnswerForPostQuery,
  useGetAllCommentForPostQuery,
  useToggleFavoriteAnswerPostMutation,
} from "../../../services/PostService";
import { convertJsonToFormData } from "../../../utils/ConvertData";
import DocumentDetailInfo from "../../document/DocumentDetailInfo";
import { useParams } from "react-router-dom";

function PostInfo({ postDetail, language }) {
  const {id} = useParams()
  const { user } = useSelector((state) => state.authentication);
  const [favorites, setFavorite] = useState(postDetail.favoritePostList);
  const {data: answerPost = [], refetch} = useGetAllAnswerForPostQuery(id)
  const [createAnswerForPost] = useCreateAnswerForPostMutation();
  const [toggleFavoriteAnswerPost] = useToggleFavoriteAnswerPostMutation()
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

  const toggleFavoriteAnswer = (id) =>{
    toggleFavoriteAnswerPost(id).then(()=> refetch())
  }
  return (
    <DocumentDetailInfo
      owner={postDetail.owner}
      objectName={postDetail.subject?.name}
      comments={{
        data: commentData,
        add: addComment,
        clear: clearComment,
      }}
      answers={{ data: answerPost, add: addAnswerPost, toggleFavoriteAnswer }}
      favorites={{ data: favorites, toggleFavorite }}
      createdAt={postDetail?.createdAt}
      language={language}
    />
  );
}

export default PostInfo;
