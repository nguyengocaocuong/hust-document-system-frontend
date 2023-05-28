import React, { useState } from "react";
import DocumentDetailInfo from "./document/DocumentDetailInfo";
import { convertJsonToFormData } from "../utils/ConvertData";
import {
  useCommentSubjectDocumentMutation,
  useDeleteCommentSubjectDocumentMutation,
  useFavoriteSubjectDocumentMutation,
  useGetAllCommentSubjectDocumentQuery,
} from "../services/SubjectService";
import { useSelector } from "react-redux";
function SubjectDocumentInfo({ subjectDocumentDetail = {} }) {
  const { user } = useSelector((state) => state.authentication);
  const [favorites, setFavorite] = useState(
    subjectDocumentDetail.favoriteSubjectDocumentList
  );
  const [anwerSubjectDocument, setAnswerSubjectDocument] = useState(subjectDocumentDetail.answerSubjectDocumentList)
  const addAnswerSubjectDocument = (newAnswer) => setAnswerSubjectDocument([...anwerSubjectDocument, newAnswer])
  const [favoriteSubjectDocument] = useFavoriteSubjectDocumentMutation();
  const toggleFavorite = () => {
    favoriteSubjectDocument(subjectDocumentDetail.id).then((response) => {
        const favorited = favorites.find(favorite => favorite.user.id === user.id) !== undefined
        if(favorited)
            setFavorite(favorites.filter((favorite) => favorite.user.id !== user.id));
        else 
            setFavorite([...favorites, {user}])
    });
  };
  const [commentSubjectDocument] = useCommentSubjectDocumentMutation();
  const [deleteCommentSubjectDocument] =
    useDeleteCommentSubjectDocumentMutation();

  const { data: commentData = [], refetch: refetchComment } =
    useGetAllCommentSubjectDocumentQuery(subjectDocumentDetail.id);
  const addComment = (data, reset) => {
    commentSubjectDocument(
      convertJsonToFormData({
        subjectDocumentId: subjectDocumentDetail.id,
        ...data,
      })
    ).then((response) => {
      refetchComment();
      reset();
    });
  };
  const clearComment = (commentId) => {
    deleteCommentSubjectDocument(commentId).then((response) =>
      refetchComment()
    );
  };
  return (
    <DocumentDetailInfo
      owner={subjectDocumentDetail.owner}
      objectName={subjectDocumentDetail.subject?.name}
      comments={{
        data: commentData,
        add: addComment,
        clear: clearComment,
      }}
      answers={{data:  anwerSubjectDocument, add: addAnswerSubjectDocument}}
      favorites={{ data: favorites, toggleFavorite }}
    />
  );
}

export default SubjectDocumentInfo;
