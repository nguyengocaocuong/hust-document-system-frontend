import {
  Box,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PropperMenu from "../PropperMenu";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import { useDispatch } from "react-redux";
import { openSubjectDocumentModal } from "../../store/modalState";
import CodeIcon from "@mui/icons-material/Code";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";

function SubjectCard({ subject }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <Grid item xs={6} md={6} lg={4} xl={4} width={"100%"}>
      <Box
        onClick={() => navigate(`/education/${subject.id}`)}
        p={1}
        borderRadius={2}
        sx={{
          backgroundColor: "#F7F9FC",
          boxShadow: 1,
          cursor: "pointer",
          transition: "box-shadow 0.4s",
          "&:hover": { boxShadow: 5 },
        }}
        width={"100%"}
      >
        <Box
          width={"100%"}
          display={"flex"}
          alignItems={"start"}
          height={"100%"}
          justifyContent={"space-between"}
        >
          <Stack spacing={1.5} pl={2} width={"calc(100% - 40px)"}>
            <Typography
              variant="h4"
              textTransform={"uppercase"}
              color={"#D8D9D9"}
            >
              Thông tin môn học
            </Typography>
            <Stack spacing={1}>
              <Stack direction={"row"} spacing={2}>
                <CodeIcon style={{ width: "25px", height: "25px" }} />
                <Divider orientation="vertical" flexItem />
                <Typography variant="h5" color={"text.secondary"}>
                  Mã học phần <strong>{subject.subjectCode}</strong>
                </Typography>
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <HistoryEduIcon style={{ width: "25px", height: "25px" }} />
                <Divider orientation="vertical" flexItem />
                <Typography variant="h5" noWrap fontWeight={100}>
                  <strong>
                    <i>{subject.institute?.institute}</i>
                  </strong>
                </Typography>
              </Stack>
              <Typography variant="h5" noWrap fontWeight={100}>
                Học phần <strong>{subject.name}</strong>
              </Typography>
            </Stack>
            <Divider />
            <Stack spacing={1.5} direction={"row"}>
              <Chip
                color="error"
                icon={<FavoriteBorderIcon />}
                label={`${subject.totalFavorite} yêu thích`}
              />
              <Chip
                color="success"
                icon={<QuestionAnswerOutlinedIcon />}
                label={`${subject.totalDocument} tài liệu`}
              />
              <Chip
                color="info"
                icon={<InsertCommentOutlinedIcon />}
                label={`${subject.totalComment} bình luận`}
              />
            </Stack>
          </Stack>
          <Box width={"40px"} height={"100%"}>
            <PropperMenu action={actions()} />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}

export default SubjectCard;
