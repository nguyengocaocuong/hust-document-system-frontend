import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useCommentPostMutation,
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
import Pusher from "pusher-js";

function PostInfo({ postDetail, language }) {
  const { id } = useParams();
  const channelName = `comment-post-${id}`;
  const { user } = useSelector((state) => state.authentication);
  const isOwnerPost = postDetail.owner.id === user.id;
  const [selectedId, setSelectedId] = useState(1);
  const handleSelectedId = (id) => {
    setSelectedId(id === selectedId ? null : id);
  };
  const [favorites, setFavorite] = useState(postDetail.favorites);
  const { data: answers = [], refetch } = useGetAllAnswerForPostQuery(id);
  const [toggleFavoriteAnswerPost] = useToggleFavoriteAnswerPostMutation();
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

  const { data: commentData = [], refetch: refetchComment } =
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

  const [comments, setComments] = useState([]);
  useEffect(() => {
    setComments(commentData);
  }, [commentData]);

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
          comment.id == editedComment.id ? editedComment : comment
        )
      );
    });
    channel.bind("delete-comment", (deletedCommentId) => {
      setComments((preComments) => preComments.filter(comment => comment.id !== deletedCommentId))
    })
    return () => {
      channel.unbind();
      pusherService.unsubscribe(channelName);
      pusherService.disconnect();
    };
  }, []);
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
