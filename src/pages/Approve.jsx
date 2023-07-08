import {
  Box,
  Divider,
  Grid,
  IconButton,
  Pagination,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import BoxFull from "../components/BoxFull";
import MultipleSelect from "../components/MultipleSelect";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import BoxBetween from "../components/BoxBetween";
import { useState } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Owner from "../components/Owner";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import { useGetAllNewReviewTeacherQuery } from "../services/AdminReviewTeacherService";
import { useGetAllNewReviewSubjectQuery } from "../services/AdminReviewSubjectService";
import { useDispatch } from "react-redux";
import {
  openNewReviewSubjectModal,
  openNewReviewTeacherModal,
} from "../store/modalState";
import ConfirmModal from "../components/modal/ComfirmModal";
import {
  useApproveReviewSubjectMutation,
  useRejectReviewSubjectMutation,
} from "../services/AdminSubjectService";
import {
  useApproveReviewTeacherMutation,
  useRejectReviewTeacherMutation,
} from "../services/AdminTeacherService";
import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
function Approve() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const pageSize = 6;
  const { data: reviewTeacher = [] } = useGetAllNewReviewTeacherQuery();
  const { data: reviewSubject = [] } = useGetAllNewReviewSubjectQuery();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    setReviews([
      ...reviewTeacher.map((review) => ({ ...review, type: "REVIEW_TEACHER" })),
      ...reviewSubject.map((review) => ({ ...review, type: "REVIEW_SUBJECT" })),
    ]);
  }, [reviewSubject, reviewTeacher]);
  const [page, setPage] = useState(1);
  const currentData = [];
  for (
    let i = pageSize * (page - 1);
    i < page * pageSize && i < reviews.length;
    i++
  ) {
    currentData.push(reviews[i]);
  }
  const openCheckReview = (review) => {
    if (review.type === "REVIEW_SUBJECT") {
      dispatch(openNewReviewSubjectModal(review));
    } else {
      dispatch(openNewReviewTeacherModal(review));
    }
  };
  const [open, setOpen] = useState({ open: false, item: null });
  const closeModal = () => setOpen({ open: false, item: null, type: null });

  const approveHandleClick = (item) => {
    setMessage(
      "Nếu bạn đồng ý, bài viết này sẽ hiển thị với mọi người. Bạn có chắc chắn đồng ý hiển thị bài viết này không?"
    );
    setOpen({ open: true, item: item, type: "APPROVE" });
  };
  const rejectHandleClick = (item) => {
    setMessage(
      "Bạn đang từ chối xác nhận bài viết này, bài viết này bị ẩn với mọi người. Bạn có chắc chắn từ chối bài viết này không?"
    );
    setOpen({ open: true, item: item, type: "REJECT" });
  };
  const removeItem = (item, type) => {
    setReviews((preReviews) =>
      preReviews.filter(
        (review) => !(review.type === type && review.id === item.id)
      )
    );
  };
  const [approveReviewSubject] = useApproveReviewSubjectMutation();
  const [rejectReviewSubject] = useRejectReviewSubjectMutation();
  const [approveReviewTeacher] = useApproveReviewTeacherMutation();
  const [rejectReviewTeacher] = useRejectReviewTeacherMutation();
  const onConfirm = () => {
    if (open.item === undefined) return;
    if (open.type === "REJECT") {
      if (open.item.type === "REVIEW_SUBJECT") {
        rejectReviewSubject(open.item.id).then((response) => {
          removeItem(response.data.content, "REVIEW_SUBJECT");
          closeModal();
        });
      } else {
        rejectReviewTeacher(open.item.id).then((response) => {
          removeItem(response.data.content, "REVIEW_Teacher");
          closeModal();
        });
      }
    }
    if (open.type === "APPROVE") {
      if (open.item.type === "REVIEW_SUBJECT") {
        approveReviewSubject(open.item.id).then((response) => {
          removeItem(response.data.content, "REVIEW_SUBJECT");
          closeModal();
        });
      } else {
        approveReviewTeacher(open.item.id).then((response) => {
          removeItem(response.data.content, "REVIEW_Teacher");
          closeModal();
        });
      }
    }
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
      <Box height={"calc(100% - 120px)"} width={"100%"} overflow={"auto"} p={2}>
        <BoxBetween>
          <Box height={"550px"} width="100%">
            <Grid container spacing={2} width={"100%"}>
              {currentData.map((review, index) => (
                <Grid item xl={4} md={6} sm={12} key={index}>
                  <Box
                    width={"100%"}
                    height={"280px"}
                    sx={{
                      backgroundColor: "#F0F0F0",
                      "&:hover": { boxShadow: 4 },
                      cursor: "pointer",
                      transition: "box-shadow 0.4s",
                    }}
                    borderRadius={1}
                    overflow={"hidden"}
                  >
                    <Owner
                      owner={review.owner}
                      createdAt={review.createdAt}
                      listItem={[
                        <IconButton
                          key={1}
                          onClick={() => {
                            removeItem(review, review.type);
                          }}
                        >
                          <CloseIcon />
                        </IconButton>,
                      ]}
                    />
                    <Box
                      p={1}
                      pt={0}
                      height={"150px"}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"space-between"}
                      overflow={"hidden"}
                    >
                      <Box
                        width={"100%"}
                        height={"100%"}
                        dangerouslySetInnerHTML={{
                          __html: review?.review,
                        }}
                        sx={{ backgroundColor: "white", borderRadius: 2, p: 1 }}
                      ></Box>
                    </Box>
                    <Divider />
                    <Box
                      height={"55px"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      px={2}
                    >
                      <Box display={"flex"} alignItems={"center"} width={"65%"}>
                        <Typography
                          fontSize={"15px"}
                          overflow={"hidden"}
                          width={"100%"}
                          noWrap
                        >
                          {review.type === "REVIEW_SUBJECT"
                            ? `Môn học `
                            : `Giảng viên `}
                          <strong>
                            {review.type === "REVIEW_SUBJECT"
                              ? review.subject?.name
                              : review.teacher?.name}
                          </strong>
                        </Typography>
                      </Box>
                      <Box display={"flex"} alignItems={"center"}>
                        <Tooltip title="Xem bài viết">
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            sx={{
                              backgroundColor: "white",
                              width: "35px",
                              height: "35px",
                              cursor: "pointer",
                              borderRadius: 1,
                              boxShadow: 1,
                            }}
                            onClick={() => openCheckReview(review)}
                          >
                            <RemoveRedEyeOutlinedIcon color="warning" />
                          </Box>
                        </Tooltip>
                        <Tooltip title="Phê duyệt">
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            sx={{
                              backgroundColor: "white",
                              width: "35px",
                              cursor: "pointer",
                              height: "35px",
                              borderRadius: 1,
                              boxShadow: 1,
                            }}
                            mx={1}
                            onClick={() => approveHandleClick(review)}
                          >
                            <OfflinePinIcon color="success" />
                          </Box>
                        </Tooltip>
                        <Tooltip title="Từ chối">
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            sx={{
                              backgroundColor: "white",
                              width: "35px",
                              cursor: "pointer",
                              height: "35px",
                              borderRadius: 1,
                              boxShadow: 1,
                            }}
                            onClick={() => rejectHandleClick(review)}
                          >
                            <RemoveCircleOutlineIcon color="error" />
                          </Box>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </BoxBetween>
      </Box>
      <Box
        height={"60px"}
        display={"flex"}
        justifyContent={"end"}
        alignItems={"center"}
        px={3}
      >
        <Pagination
          page={page}
          onChange={(e, value) => setPage(value)}
          count={Math.ceil(reviews.length / pageSize)}
          color="primary"
          shape="rounded"
        />
      </Box>
      {open.open && (
        <ConfirmModal
          message={message}
          open={open.open}
          closeModal={closeModal}
          action={onConfirm}
        />
      )}
    </BoxFull>
  );
}

export default Approve;
