import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Tooltip from "@mui/material/Tooltip";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import { colorRanger } from "../../utils/Colorrange";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  useFavoriteSubjectMutation,
  // useGetAllSubjectQuery,
} from "../../services/SubjectService";
import PropperMenu from "../PropperMenu";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import { useDispatch } from "react-redux";
import { openSubjectDocumentModal } from "../../store/modalState";
function SubjectCard({ subject }) {
  const dispatch = useDispatch();
  const [favoriteSubject] = useFavoriteSubjectMutation();
  // const { refetch } = useGetAllSubjectQuery();
  const navigate = useNavigate();
  const toggleFavoriteSubject = () => {
    favoriteSubject({
      subjectId: subject?.id,
      body: { notificationType: "ALL" },
    }).then(() => {
      // refetch();
    });
  };
  const onAddSubjectDocument = () => {
    dispatch(
      openSubjectDocumentModal({
        subjectName: subject?.name,
        subjectId: subject.id,
        acceptedFiles: [],
        subjectDocumentType: "EXAM",
      })
    );
  };
  const onAddReviewSubject = () => {
    navigate("/writing", {
      state: {
        type: "REVIEW_SUBJECT",
        reviewSubject: { subject: { id: subject.id } },
      },
    });
  };
  const actions = () => {
    let action = [
      {
        Icon: AddIcon,
        label: "Thêm tài liệu",
        action: onAddSubjectDocument,
      },
      {
        Icon: CreateIcon,
        label: "Viết bài",
        action: onAddReviewSubject,
      },
    ];
    return action;
  };
  return (
    <Grid item xs={12} md={6} lg={4} xl={3}>
      <Box
        onClick={() => navigate(`/education/${subject.id}`)}
        p={1}
        borderRadius={"25px"}
        sx={{
          backgroundColor: "#F7F9FC",
          boxShadow: 1,
          cursor: "pointer",
          transition: "box-shadow 0.4s ease-in-out",
          "&:hover": { boxShadow: 5 },
        }}
        width={"100%"}
        height={"120px"}
      >
        <Box
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          height={"100%"}
        >
          <MenuBookIcon
            sx={{
              width: "80px",
              height: "80px",
              color: `${colorRanger(subject.id)}`,
            }}
          />
          <Box pl={2} width={"calc(100% - 120px)"}>
            <Stack spacing={0.5}>
              <Typography
                variant="h5"
                color={"text.secondary"}
                textTransform={"uppercase"}
              >
                <strong>{subject.subjectCode}</strong>
              </Typography>
              <Typography variant="h6" noWrap fontWeight={100}>
                <strong>{subject.name}</strong>
              </Typography>
              <Box display={"flex"} alignItems={"center"} pt={1} width={"100%"}>
                <Tooltip title="Yêu thích">
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    pr={1}
                    color={"red"}
                  >
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavoriteSubject();
                      }}
                    >
                      <FavoriteBorderIcon sx={{ color: "red" }} />
                    </IconButton>{" "}
                    <strong>{subject.totalFavorite}</strong>
                  </Box>
                </Tooltip>
                <Tooltip title="Bình luận">
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    pr={1}
                    color={"primary.main"}
                  >
                    <IconButton>
                      <InsertCommentOutlinedIcon
                        sx={{ color: "primary.main" }}
                      />
                    </IconButton>{" "}
                    <strong>{subject.totalComment}</strong>
                  </Box>
                </Tooltip>
                <Tooltip title="Tài liệu">
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    color={"success.main"}
                  >
                    <IconButton>
                      <QuestionAnswerOutlinedIcon
                        sx={{ color: "success.main" }}
                      />
                    </IconButton>{" "}
                    <strong>{subject.totalDocument}</strong>
                  </Box>
                </Tooltip>
              </Box>
            </Stack>
          </Box>
          <Box width={"40px"} height={"100%"}>
            <PropperMenu action={actions()} />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}

export default SubjectCard;
