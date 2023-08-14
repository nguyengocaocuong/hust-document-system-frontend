import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import BoxFull from "../components/BoxFull";
import MultipleSelect from "../components/MultipleSelect";
import Pusher from "pusher-js";
import { useState } from "react";
import Owner from "../components/Owner";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PropperMenu from "../components/PropperMenu";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  useApproveCommentForReviewSubjectMutation,
  useGetAllBabCommentForReviewSubjectQuery,
  useHiddenCommentForReviewSubjectMutation,
} from "../services/AdminCommentReviewSubjectService";
import {
  useApproveCommentForReviewTeacherMutation,
  useGetAllBabCommentForReviewTeacherQuery,
  useHiddenCommentForReviewTeacherMutation,
} from "../services/AdminCommentReviewTeacherService";
function BabComment() {
  const { data: babCommentReviewSubject = [] } =
    useGetAllBabCommentForReviewSubjectQuery();
  const { data: babCommentReviewTeacher = [] } =
    useGetAllBabCommentForReviewTeacherQuery();
  const [badComments, setBabComments] = useState([]);
  useEffect(() => {
    setBabComments([
      ...babCommentReviewSubject.map((comment) => ({
        type: "REVIEW_SUBJECT",
        ...comment,
      })),
      ...babCommentReviewTeacher.map((comment) => ({
        type: "REVIEW_TEACHER",
        ...comment,
      })),
    ]);
  }, [babCommentReviewSubject, babCommentReviewTeacher]);
  useEffect(() => {
    const pusherService = new Pusher("070ff19e8a1a4c8d4553", {
      cluster: "ap1",
    });

    const channelBadComment = pusherService.subscribe("bad-comment");
    channelBadComment.bind(`new-bad-comment`, (babComment) => {
      setBabComments((preState) => [...preState, babComment]);
    });
    return () => {
      channelBadComment.unbind();
      pusherService.unsubscribe("bad-comment");
      pusherService.disconnect();
    };
  }, []);
  const removeBabComment = (comment) => {
    setBabComments((preBabComments) =>
      preBabComments.filter(
        (babComment) =>
          !(babComment.id === comment.id && babComment.type === comment.type)
      )
    );
  };
  const [approveCommentForReviewSubject] =
    useApproveCommentForReviewSubjectMutation();
  const [approveCommentForReviewTeacher] =
    useApproveCommentForReviewTeacherMutation();
  const approveComment = (comment) => {
    if (comment.type === "REVIEW_SUBJECT") {
      approveCommentForReviewSubject(comment.id).then((response) => {
        if (response.data?.responseCode === 200) {
          removeBabComment(comment);
        }
      });
    } else {
      approveCommentForReviewTeacher(comment.id).then((response) => {
        if (response.data?.responseCode === 200) {
          removeBabComment(comment);
        }
      });
    }
  };

  const [hiddenCommentForReviewSubject] =
    useHiddenCommentForReviewSubjectMutation();
  const [hiddenCommentForReviewTeacher] =
    useHiddenCommentForReviewTeacherMutation();
  const hiddenComment = (comment) => {
    if (comment.type === "REVIEW_SUBJECT") {
      hiddenCommentForReviewSubject(comment.id).then((response) => {
        if (response.data?.responseCode === 200) {
          removeBabComment(comment);
        }
      });
    } else {
      hiddenCommentForReviewTeacher(comment.id).then((response) => {
        if (response.data?.responseCode === 200) {
          removeBabComment(comment);
        }
      });
    }
  };
  const actions = (comment) => {
    let action = [
      {
        Icon: CheckCircleOutlineIcon,
        label: "Chấp nhận",
        action: () => approveComment(comment),
      },
      {
        Icon: VisibilityOffIcon,
        label: "Ẩn comment",
        action: () => hiddenComment(comment),
      },
    ];
    return action;
  };

  return (
    <BoxFull sx={{ backgroundColor: "white" }}>
      <Box
        display={"flex"}
        alignItems={"center"}
        height={"60px"}
        sx={{ backgroundColor: "#F0F0F0" }}
        px={2}
      >
        <Typography fontSize={"17px"} fontWeight={"bold"} mr={1}>
          Chọn loại bài viết
        </Typography>
        <MultipleSelect items={[]} />
        <Typography fontSize={"17px"} fontWeight={"bold"} mr={1}>
          Chọn đối tượng bị báo cáo
        </Typography>
        <MultipleSelect items={[]} />
      </Box>
      <Box
        height={"calc(100% - 120px)"}
        width={"100%"}
        overflow={"auto"}
        p={2}
        pt={4}
      >
        <Grid container spacing={2} width={"100%"}>
          {badComments.map((babComment, index) => (
            <Grid item xl={3} md={4} sm={6} key={index}>
              <Box
                bgcolor={"#F0F0F0"}
                borderRadius={2}
                sx={{
                  cursor: "pointer",
                  "&:hover": { boxShadow: 2 },
                  transition: "box-shadow 0.4s",
                }}
              >
                <Owner
                  owner={babComment.owner}
                  createdAt={babComment.createdAt}
                  listItem={[
                    <PropperMenu key={1} action={actions(babComment)} />,
                  ]}
                />
                <Box p={2} pt={0} pl={4}>
                  <Typography fontWeight={700} noWrap>{babComment.comment}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </BoxFull>
  );
}

export default BabComment;
