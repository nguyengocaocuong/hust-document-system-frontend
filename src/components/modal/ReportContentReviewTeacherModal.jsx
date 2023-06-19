import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeReportContentReviewTeacherModal } from "../../store/modalState";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Owner from "../Owner";
import { useState } from "react";
import ConfirmModal from "./ComfirmModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "90%",
  overflow: "hidden",
  width: "45%",
  minWidth: "650px",
  maxWidth: "800px",
  backgroundColor: "#f7f7f2",
  borderRadius: 1,
  boxShadow: 24,
};

function ReportContentReviewTeacherModal({ open }) {
  const dispatch = useDispatch();
  const {
    reportContentReviewTeacherModal: { dataModal },
  } = useSelector((state) => state.modalState);

  const [openConfirm, setOpen] = useState({ open: false, item: null });
  const closeConfirmModal = () => setOpen({ open: false, item: null });
  const openConfirmModal = (item) => setOpen({ open: true, item });

  const onHidden = () => {
    alert("hidden");
    closeConfirmModal();
  };
  const closeModal = () => {
    dispatch(closeReportContentReviewTeacherModal());
  };
  return (
    <Modal open={open} onClose={closeModal} sx={{ border: "none" }}>
      <Box sx={{ ...style }}>
        <Box display={"flex"} alignItems={"center"} p={2} sx={{}}>
          <Typography
            variant="h4"
            textAlign={"center"}
            width={"calc(100% - 30px)"}
          >
            Báo cáo nội dung bài review giảng viên <strong>Đỗ Quốc Huy</strong>
          </Typography>
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box
          maxHeight={"500px"}
          overflow={"auto"}
          sx={{
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Owner owner={dataModal.owner} createdAt={dataModal.createdAt} />
          <Box p={2} pt={1} sx={{ backgroundColor: "white", borderRadius: 1 }}>
            <div
              dangerouslySetInnerHTML={{
                __html: dataModal.reviewTeacher.review,
              }}
              id="review-content"
            />
          </Box>
        </Box>
        <Divider />
        <Box height={"150px"} p={1} boxShadow={24}>
          <Typography
            p={1}
            fontSize={"17px"}
            color={"white"}
            height={"80px"}
            sx={{ backgroundColor: "#707070", borderRadius: 2 }}
          >
            {dataModal.message}
          </Typography>
          <Box
            display={"flex"}
            alignItems={"center"}
            height={"65px"}
            width={"100%"}
            justifyContent={"space-between"}
            py={1.5}
          >
            <Box
              sx={{
                width: "65%",
                borderRadius: "25px",
                border: "1px solid gray",
              }}
              px={2}
              py={0.5}
            >
              <InputBase
                placeholder="Hãy nhập lý do nếu bạn muốn ẩn bài viết"
                sx={{ width: "100%" }}
              />
            </Box>
            <Stack spacing={2} direction={"row"}>
              <Button
                variant="contained"
                color="warning"
                onClick={openConfirmModal}
              >
                Ẩn bài viết
              </Button>
              <Button variant="outlined">Từ chối</Button>
            </Stack>
          </Box>
        </Box>
        {openConfirm.open && (
          <ConfirmModal
            message={"Bạn có chắc chắn muốn ẩn bài viết này không?"}
            open={openConfirm.open}
            closeModal={closeConfirmModal}
            action={onHidden}
          />
        )}
      </Box>
    </Modal>
  );
}

export default ReportContentReviewTeacherModal;
