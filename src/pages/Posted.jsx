import React from "react";
import {
  useDeleteReviewSubjectMutation,
  useGetAllReviewSubjectCreatedByUserQuery,
} from "../services/SubjectService";
import {
  useDeleteReviewTeacherMutation,
  useGetAllReviewTeacherCreatedByUserQuery,
} from "../services/TeacherService";
import Table from "../components/Table";
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import subjectIcon from "../assets/images/document/homework.png";
import questionIcon from "../assets/images/question.png";
import { formatTimeAgo } from "../utils/ConvertDate";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import EditOffIcon from "@mui/icons-material/EditOff";
import { useDispatch } from "react-redux";
import {
  openReviewSubjectModal,
  openReviewTeacherModal,
} from "../store/modalState";
import { useState } from "react";
import ConfirmModal from "../components/modal/ComfirmModal";
import {
  useDeletePostMutation,
  useGetAllPostCreatedByUserQuery,
} from "../services/PostService";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const headers = [
  { title: "", width: "119.25px" },
  { title: "Đối tượng", width: "17%" },
  { title: "Loại bài viết", width: "12%" },
  { title: "Nội dung ", width: "20%" },
  { title: "Trạng thái", width: "8%" },
  { title: "Chỉnh sửa", width: "10%" },
  { title: "", width: "15%" },
];

function Posted() {
  const message =
    "Bài viết sau khi xóa không thể khôi phục lại, bạn có chắc chắn muốn xóa bài viết này không?";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewReview = (item) => {
    if (item.type === "TEACHER") {
      dispatch(openReviewTeacherModal(item));
    } else if (item.type === "POST") {
    } else {
      dispatch(openReviewSubjectModal(item));
    }
  };
  const [deleteReviewSubject] = useDeleteReviewSubjectMutation();
  const [deleteReviewTeacher] = useDeleteReviewTeacherMutation();
  const [deletePost] = useDeletePostMutation();
  const copyUrl = (item) => {
    let url;
    if (item.type !== "POST")
      url = `${document.location.origin}/review?id=${item.id}&type=${item.type}`;
    else url = `${document.location.origin}/post/${item.id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Đã copy vào clipboard");
      })
      .catch((error) => {
        console.error("Lỗi khi sao chép vào clipboard:", error);
      });
  };
  const { data: reviewSubject = [], refetch: refetchAllReviewSubject } =
    useGetAllReviewSubjectCreatedByUserQuery();
  const { data: reviewTeacher = [], refetch: refetchAllReviewTeacher } =
    useGetAllReviewTeacherCreatedByUserQuery();
  const { data: post = [], refetch: refetchAllPost } =
    useGetAllPostCreatedByUserQuery();
  const items = [
    ...reviewTeacher.map((item) => ({
      type: "TEACHER",
      ...item,
    })),
    ...reviewSubject.map((item) => ({
      type: "SUBJECT",
      ...item,
    })),
    ...post.map((item) => ({
      type: "POST",
      ...item,
    })),
  ].sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();
    return timeB - timeA;
  });
  const [open, setOpen] = useState({ open: false, item: null });
  const closeModal = () => setOpen({ open: false, item: null });
  const openModal = (item) => setOpen({ open: true, item });
  const onDelete = () => {
    if (open.item.type === "SUBJECT") {
      deleteReviewSubject({
        reviewSubjectId: open.item.id,
        subjectId: open.item.subject.id,
      }).then(() => {
        closeModal();
        refetchAllReviewSubject();
      });
    } else if (open.item.type === "POST") {
      deletePost(open.item.id).then(() => {
        closeModal();
        refetchAllPost();
      });
    } else {
      deleteReviewTeacher({
        reviewTeacherId: open.item.id,
        teacherId: open.item.teacher.id,
      }).then(() => {
        closeModal();
        refetchAllReviewTeacher();
      });
    }
  };

  const edit = (item) => {
    switch (item.type) {
      case "TEACHER":
        navigate("/writing", {
          state: {
            type: "REVIEW_TEACHER",
            reviewTeacher: item,
            update: true,
          },
        });
        break;
      case "SUBJECT":
        navigate("/writing", {
          state: {
            type: "REVIEW_SUBJECT",
            reviewSubject: item,
            update: true,
          },
        });
        break;
      case "POST":
        navigate("/writing", {
          state: {
            type: "POST",
            post: item,
            update: true,
          },
        });
        break;
      default:
        console.log();
    }
  };
  const renderItem = (item, key) => (
    <Box
      key={key}
      pl={1}
      pr={1}
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      sx={{
        borderBottom: "1px solid #D9DFED",
        transition: "backgroundColor 0.4s",
        "&:hover": { backgroundColor: "#D9DFED" },
        cursor: "pointer",
      }}
      height={"110px"}
      maxHeight={"110px"}
      justifyContent={"space-between"}
      onClick={() => viewReview(item)}
    >
      <Box
        width={"110px"}
        overflow={"hidden"}
        display={"flex"}
        alignItems={"center"}
      >
        <Box
          width={"105px"}
          height={"105px"}
          overflow={"hidden"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={
              item.type === "TEACHER"
                ? item?.teacher.avatar
                : item.type === "SUBJECT"
                ? subjectIcon
                : questionIcon
            }
            width={"80%"}
            height={"auto"}
            style={{
              maxHeight: "80%",
            }}
            alt=""
          />
        </Box>
      </Box>
      <Typography
        sx={{ fontWeight: "bold", width: "17%" }}
        color={"primary.main"}
      >
        {item?.type === "TEACHER" ? item.teacher.name : item.subject.name}
      </Typography>
      <Box width={"12%"}>
        <Typography fontWeight={700}>
          {item.type === "TEACHER"
            ? "Review giảng viên"
            : item.type === "SUBJECT"
            ? "Review môn học"
            : "Hỏi bài tập"}
        </Typography>
      </Box>
      <Box width={"20%"}>
        {item.type !== "POST" ? (
          <Box
            sx={{
              width: "100%",
              height: "100px",
              overflow: "hidden",
              background: "white",
              padding: "0 3px",
              borderRadius: "8px",
              "&:hover": {
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              },
            }}
            dangerouslySetInnerHTML={{ __html: item?.review }}
            id="review-content"
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "110px",
              overflow: "hidden",
              background: "white",
              borderRadius: "8px",
              "&:hover": {
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              },
            }}
          >
            <img
              src={item?.document.path}
              style={{ width: "100%", maxHeight: "98%" }}
              alt={item?.document.name}
            />
          </Box>
        )}
      </Box>
      <Box width={"8%"}>
        <Chip
          label={item.done ? "Hoàn thành" : "Đang viết"}
          color={item.done ? "success" : "warning"}
        />
      </Box>
      <Typography sx={{ fontSize: "13px" }} width={"10%"}>
        {formatTimeAgo(item?.createdAt)}
      </Typography>
      <Box
        width={"15%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"end"}
        onClick={(e) => e.stopPropagation()}
      >
        <Box
          sx={{
            opacity: "0.3",
            transition: "opacity 0.4s",
            "&:hover": {
              opacity: 1,
              backgroundColor: "white",
            },
            borderRadius: "25px",
            px: 1.5,
          }}
        >
          <Tooltip title={"Chỉnh sửa bài viết"}>
            <IconButton onClick={() => edit(item)}>
              <EditOffIcon
                color={"warning"}
                sx={{ width: "18px", height: "18px" }}
              />
            </IconButton>
          </Tooltip>
          {item.done && (
            <Tooltip title={"Xem bài viết"}>
              <IconButton onClick={() => viewReview(item)}>
                <RemoveRedEyeIcon
                  color={"success"}
                  sx={{ width: "18px", height: "18px" }}
                />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title={"Copy link truy cập"}>
            <IconButton onClick={() => copyUrl(item)}>
              <CopyAllIcon
                color={"info"}
                sx={{ width: "18px", height: "18px" }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Xóa bài viết"}>
            <IconButton onClick={() => openModal(item)}>
              <DeleteIcon
                color={"error"}
                sx={{ width: "18px", height: "18px" }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
  return (
    <Box
      width={"100%"}
      height={"calc(100vh - 72px)"}
      overflow={"hidden"}
      sx={{ backgroundColor: "white" }}
    >
      <Box p={2} height={"120px"} boxShadow={2}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"start"}
          pb={2}
        >
          <Typography variant="h3" color={"text.secondary"}>
            Danh sách bài đăng của bạn
          </Typography>
        </Box>
        <Stack
          spacing={4}
          direction={"row"}
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
        >
          <Stack
            direction={"row"}
            spacing={0.5}
            display={"flex"}
            alignItems={"center"}
          >
            <Typography fontSize={"17px"} fontWeight={"bold"} mr={1}>
              Loại bài viết
            </Typography>
            <Select
              isClearable
              options={[
                { label: "Tất cả", value: "ALL" },
                { label: "Hỏi bài tập", value: "POST" },
                { label: "Review giảng viên", value: "TEACHER" },
                { label: "Review môn học", value: "SUBJECT" },
              ]}
              styles={{
                control: (styles) => ({
                  ...styles,
                  minHeight: "40px",
                  width: "300px",
                }),
                multiValueLabel: (styles) => ({
                  ...styles,
                  fontSize: "18px",
                }),
                singleValue: (styles) => ({
                  ...styles,
                  fontSize: "18px",
                }),
                placeholder: (styles) => ({ ...styles, fontSize: "18px" }),
              }}
              placeholder={"Loại bài viết"}
            />
          </Stack>
          <Stack
            direction={"row"}
            spacing={0.5}
            display={"flex"}
            alignItems={"center"}
          >
            <Typography fontSize={"17px"} fontWeight={"bold"} mr={1}>
              Đối tượng
            </Typography>
            <Select
              options={[{ label: "Tất cả", value: "ALL" }]}
              isMulti
              styles={{
                control: (styles) => ({
                  ...styles,
                  minHeight: "40px",
                  maxHeight: "100%",
                  minWidth: "300px",
                }),
                multiValueLabel: (styles) => ({
                  ...styles,
                  fontSize: "18px",
                }),
                placeholder: (styles) => ({ ...styles, fontSize: "18px" }),
              }}
              placeholder={"Đối tượng"}
            />
          </Stack>
          <Stack
            direction={"row"}
            spacing={0.5}
            display={"flex"}
            alignItems={"center"}
          >
            <Typography fontSize={"17px"} fontWeight={"bold"} mr={1}>
              Trạng thái
            </Typography>
            <Select
              options={[
                { label: "Tất cả", value: "ALL" },
                { label: "Mới đăng", value: "NEW" },
                { label: "Đã phê duyệt", value: "APPROVED" },
                { label: "Bị từ chối", value: "REJECT" },
              ]}
              isMulti
              styles={{
                control: (styles) => ({
                  ...styles,
                  minHeight: "40px",
                  maxHeight: "100%",
                  minWidth: "300px",
                }),
                multiValueLabel: (styles) => ({
                  ...styles,
                  fontSize: "18px",
                }),
                placeholder: (styles) => ({ ...styles, fontSize: "18px" }),
              }}
              placeholder={"Trạng thái bài viết"}
            />
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 8px 5px 0px rgba(155, 155, 155, 0.1) inset",
          WebkitBoxShadow: "0px 8px 5px 0px rgba(155, 155, 155, 0.1) inset",
          MozBoxShadow: "0px 8px 5px 0px rgba(155, 155, 155, 0.1) inset",
        }}
        width={"100%"}
      >
        <Table
          headers={headers}
          items={items}
          renderItem={renderItem}
          pageSize={Math.floor((window.innerHeight - 222) / 111)}
          itemHeight={111}
        />
      </Box>

      {open.open && (
        <ConfirmModal
          message={message}
          open={open.open}
          closeModal={closeModal}
          action={onDelete}
        />
      )}
    </Box>
  );
}

export default Posted;
