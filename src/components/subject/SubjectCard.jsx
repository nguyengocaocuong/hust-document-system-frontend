import { Box, IconButton, Stack, Typography } from "@mui/material";
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
  useGetAllSubjectQuery,
} from "../../services/SubjectService";
function SubjectCard({ subject }) {
  const [favoriteSubject] = useFavoriteSubjectMutation();
  const { refetch } = useGetAllSubjectQuery();
  const toggleFavoriteSubject = () => {
    favoriteSubject({
      subjectId: subject?.id,
      body: { notificationType: "ALL" },
    }).then(() => {
      refetch();
    });
  };
  const navigate = useNavigate();
  return (
    <Box
      width={"25%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      mb={3}
    >
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
        width={"90%"}
      >
        <Box width={"100%"} display={"flex"} alignItems={"center"}>
          <MenuBookIcon
            sx={{
              width: "80px",
              height: "80px",
              color: `${colorRanger(subject.id)}`,
            }}
          />
          <Box ml={2}>
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
        </Box>
      </Box>
    </Box>
  );
}

export default SubjectCard;
