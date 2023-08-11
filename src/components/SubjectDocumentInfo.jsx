import React, { useState } from "react";
import { convertJsonToFormData } from "../utils/ConvertData";
import {
  useCommentSubjectDocumentMutation,
  useDeleteCommentSubjectDocumentMutation,
  useFavoriteSubjectDocumentMutation,
  useGetAllAnswerSubjectDocumentQuery,
  useGetAllCommentSubjectDocumentQuery,
  useHiddenCommentSubjectDocumentMutation,
  useToggleFavoriteAnswerSubjectDocumentMutation,
  useUpdateCommentSubjectDocumentMutation,
  useUploadAnswerForSubjectDocumentMutation,
} from "../services/SubjectService";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import Owner from "./Owner";
import PropperMenu from "./PropperMenu";
import DetailActions from "./DetailActions";
import DetailtAnswers from "./DetailAnswers";
import Comment from "./comment";
import TranslateLanguage from "./TranslateLanguage";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import FlagIcon from "@mui/icons-material/Flag";
import { useEffect } from "react";
import Pusher from "pusher-js";
import DownloadIcon from "@mui/icons-material/Download";
import { saveAs } from "file-saver";
import { openDownloadModal, openReportModal } from "../store/modalState";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
function SubjectDocumentInfo({
  subjectDocumentDetail = {},
  onShowAnnotate,
  language,
  setLanguage,
  resetLanguage,
  onAddAnnotate,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authentication);
  const isOwnerSubjectDocument = subjectDocumentDetail.owner.id === user.id;
  const [favorites, setFavorite] = useState(subjectDocumentDetail.favorites);
  const [selectedId, setSelectedId] = useState(1);
  const handleSelectedId = (id) => {
    setSelectedId(id === selectedId ? null : id);
  };
  const [toggleFavoriteAnswerSubjectDocument] =
    useToggleFavoriteAnswerSubjectDocumentMutation();
  const [uploadAnswerForSubjectDocument] =
    useUploadAnswerForSubjectDocumentMutation();
  const { data: answers = [], refetch } = useGetAllAnswerSubjectDocumentQuery(
    subjectDocumentDetail.id
  );
  const addAnswerSubjectDocument = (newAnswer, closeModal) => {
    uploadAnswerForSubjectDocument(newAnswer).then(() => {
      closeModal();
      refetch();
    });
  };
  const [favoriteSubjectDocument] = useFavoriteSubjectDocumentMutation();
  const toggleFavoriteAnswer = (id) => {
    toggleFavoriteAnswerSubjectDocument(id).then(() => {
      refetch();
    });
  };
  const toggleFavorite = () => {
    favoriteSubjectDocument(subjectDocumentDetail.id).then(() => {
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

  const { data: commentSubjectDocuments = [], refetch: refetchComment } =
    useGetAllCommentSubjectDocumentQuery(subjectDocumentDetail.id);
  const [commentSubjectDocument] = useCommentSubjectDocumentMutation();
  const [deleteCommentSubjectDocument] =
    useDeleteCommentSubjectDocumentMutation();
  const [updateCommentSubjectDocument] =
    useUpdateCommentSubjectDocumentMutation();
  const [hiddenCommentSubjectDocument] =
    useHiddenCommentSubjectDocumentMutation();

  const addComment = (data, reset) => {
    const body = convertJsonToFormData(data);
    commentSubjectDocument({
      subjectDocumentId: subjectDocumentDetail.id,
      body,
    }).then(() => {
      refetchComment();
      reset();
    });
  };
  const editComment = (comment) => {
    const body = convertJsonToFormData(comment);
    updateCommentSubjectDocument({
      subjectDocumentId: subjectDocumentDetail.id,
      commentId: comment.id,
      body,
    }).then(() => refetchComment());
  };
  const hiddenComment = (commentId) => {
    hiddenCommentSubjectDocument({
      subjectDocumentId: subjectDocumentDetail.id,
      commentId,
    }).then(() => refetchComment());
  };
  const deleteComment = (commentId) => {
    deleteCommentSubjectDocument({
      commentId,
      subjectDocumentId: subjectDocumentDetail.id,
    }).then(() => refetchComment());
  };
  const copyUrl = () => {
    const url = `http://localhost:3000/education/subject-document/${subjectDocumentDetail.id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Đã copy vào clipboard");
      })
      .catch((error) => {
        console.error("Lỗi khi sao chép vào clipboard:", error);
      });
  };
  const reportSubjectDocument = () => {
    dispatch(
      openReportModal({
        object: subjectDocumentDetail,
        type: "SUBJECT_DOCUMENT",
      })
    );
  };
  const download = () => {
    fetch(
      `https://hust-document-system-backend-vxw4qk34wa-as.a.run.app/api/v1/users/subjects/subjectDocument/${subjectDocumentDetail.id}/download`,
      {
        method: "GET",
        headers: {
          "X-HUST-DOCUMENT-KEY": user.token,
        },
      }
    )
      .then((response) => {
        const contentLength = response.headers.get("Content-Length");
        let loadedBytes = 0;

        const reader = response.body.getReader();

        return new Response(
          new ReadableStream({
            async start(controller) {
              while (true) {
                const { done, value } = await reader.read();

                if (done) {
                  controller.close();
                  break;
                }
                loadedBytes += value.length;
                const percentCompleted = Math.round(
                  (loadedBytes * 100) / contentLength
                );
                console.log(`Đã tải về: ${percentCompleted}%`);

                controller.enqueue(value);
              }
            },
          })
        );
      })
      .then((response) => response.blob())
      .then((blobData) => {
        saveAs(blobData, subjectDocumentDetail.document.name);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const downloadMul = () => {
    dispatch(
      openDownloadModal({ subjectDocumentId: subjectDocumentDetail.id })
    );
  };
  const annotateDocument = () => {
    onAddAnnotate();
  };
  const actions = () => {
    const action = [
      {
        Icon: DownloadIcon,
        label: "Tải xuống",
        action: download,
      },
      {
        Icon: NoteAddIcon,
        label: "Ghi chú lên tài liệu",
        action: annotateDocument,
      },
      {
        Icon: DownloadIcon,
        label: "Tải kèm đáp án",
        action: downloadMul,
      },

      { Icon: CopyAllIcon, label: "Copy link truy cập", action: copyUrl },
    ];
    if (subjectDocumentDetail.owner.id !== user.id) {
      action.push({
        Icon: FlagIcon,
        label: "Báo cáo tài liệu",
        action: reportSubjectDocument,
      });
    }
    return action;
  };

  const [comments, setComments] = useState([]);
  useEffect(() => {
    setComments(commentSubjectDocuments);
  }, [commentSubjectDocuments]);

  const channelName = `comment-subject-document-${subjectDocumentDetail.id}`;
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
    <Box width={`100%`} borderBottom="1px solid #D8D9D9" pb={2} height={"100%"}>
      <Owner
        owner={subjectDocumentDetail.owner}
        createdAt={subjectDocumentDetail.createdAt}
        listItem={[<PropperMenu key={2} action={actions()} />]}
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
              onShowAnnotate: onShowAnnotate,
              data: answers,
              add: addAnswerSubjectDocument,
              toggleFavoriteAnswer,
            }}
          />
        )}
        {selectedId === 2 && (
          <Comment
            comments={{
              data: comments,
              isOwner: isOwnerSubjectDocument,
              add: addComment,
              clear: deleteComment,
              edit: editComment,
              hidden: hiddenComment,
            }}
          />
        )}
        {selectedId === 3 && (
          <TranslateLanguage
            value={language}
            onClick={setLanguage}
            reset={resetLanguage}
          />
        )}
      </Box>
    </Box>
  );
}

export default SubjectDocumentInfo;
