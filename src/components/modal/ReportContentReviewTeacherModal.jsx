import React from "react";
import { useDispatch } from "react-redux";
import { closeReportContentReviewSubjectModal } from "../../store/modalState";
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
  // const {
  //   reportContentReviewSubjectModal: {
  //     dataModal = {
  //       message:
  //         "Bài viết này có nội dung không lành mạnh, ad hãy gỡ bài này đi nhé",
  //       reviewSubject: { review: "faf faf f à safdf sà" },
  //       createdAt: new Date(),
  //       owner: { firstName: "Nguyễn Đức", lastName: "Hiếu", avatar: "" },
  //     },
  //   },
  // } = useSelector((state) => state.modalState);
  const dataModal = {
    message:
      "Bài viết này có nội dung không lành mạnh, ad hãy gỡ bài này đi nhé",
    reviewSubject: {
      review: `<div class="container section-title-container">
    <h3 class="section-title section-title-normal"><span class="section-title-main">GIỚI THIỆU</span></h3>
    </div>
    <p>Đỗ Quốc Huy tốt nghiệp đại học v&agrave; thạc sĩ ng&agrave;nh C&ocirc;ng nghệ th&ocirc;ng tin tại Đại học B&aacute;ch khoa H&agrave; Nội năm 2006 v&agrave; 2008. Trong khoảng thời gian từ 2006-2009 &ocirc;ng l&agrave; giảng vi&ecirc;n Khoa C&ocirc;ng nghệ th&ocirc;ng tin trường Đại học B&aacute;ch khoa H&agrave; Nội. &Ocirc;ng nhận bằng tiến sĩ ng&agrave;nh Th&ocirc;ng tin tại Học viện Kỹ thuật Toyota (TTI) v&agrave;o năm 2013. Từ năm 2014 đến 2017, &ocirc;ng l&agrave; nghi&ecirc;n cứu sinh sau Tiến sĩ tại trung t&acirc;m nghi&ecirc;n cứu cho xe th&ocirc;ng minh tại TTI. Hiện nay, &ocirc;ng đang l&agrave; giảng vi&ecirc;n tại bộ m&ocirc;n Khoa học M&aacute;y t&iacute;nh thuộc trường Đại học B&aacute;ch khoa H&agrave; Nội Lĩnh vực nghi&ecirc;n cứu bao gồm c&aacute;c vấn đề li&ecirc;n quan đến b&agrave;i to&aacute;n t&igrave;m đường cho xe tự h&agrave;nh, an to&agrave;n th&ocirc;ng tin v&agrave; hệ điều h&agrave;nh.</p>
    <div class="container section-title-container">
    <h3 class="section-title section-title-normal"><span class="section-title-main">C&Aacute;C C&Ocirc;NG TR&Igrave;NH KHOA HỌC TI&Ecirc;U BIỂU</span></h3>
    </div>
    <ul>
    <li>Human Drivers Based Active-Passive Model for Automated Lane Change. Quoc Huy Do, Hossein Tehrani Niknejad, Seiichi Mita, Masumi Egawa, Kenji Muto, Keisuke Yoneda, IEEE Intell. Transport. Syst. Mag. 9(1): 42-56 (2017)</li>
    <li>General behavior and motion model for automated lane change. Hossein Tehrani Niknejad, Quoc Huy Do, Masumi Egawa, Kenji Muto, Keisuke Yoneda, Seiichi Mita Intelligent Vehicles Symposium 2015: 1154-1159</li>
    <li>Narrow passage path planning using fast marching method and support vector machine, Quoc Huy Do, Seiichi Mita, Keisuke Yoneda, Intelligent Vehicles Symposium 2014: 630-635</li>
    <li>Dynamic and Safe Path Planning Based on Support Vector Machine among Multi Moving Obstacles for Autonomous Vehicles. Quoc Huy Do, Seiichi Mita, Hossein Tehrani Niknejad, Long Han, IEICE Transactions 96-D(2): 314-328 (2013)</li>
    <li>A Practical and Optimal Path Planning for Autonomous Parking Using Fast Marching Algorithm and Support Vector Machine. Quoc Huy Do, Seiichi Mita, Keisuke Yoneda, IEICE Transactions 96-D(12): 2795-2804 (2013)</li>
    <li>Vehicle path planning with maximizing safe margin for driving using Lagrange multipliers. Quoc Huy Do, Hossein Tehrani Niknejad, Keisuke Yoneda, Ryohei Sakai, Seiichi Mita, Intelligent Vehicles Symposium 2013: 171-176</li>
    </ul>
    <div class="container section-title-container">
    <h3 class="section-title section-title-normal"><span class="section-title-main">GIẢNG DẠY (2018/2019)</span></h3>
    </div>
    <ul>
    <li>IT3070: Hệ Điều H&agrave;nh</li>
    <li>IT4778: Lập tr&igrave;nh hệ thống</li>
    <li>IT3220: Lập tr&igrave;nh C (Intro)</li>
    <li>IT3230: Lập tr&igrave;nh C (Basic)</li>
    </ul> `,
    },
    createdAt: new Date(),
    owner: { firstName: "Nguyễn Đức", lastName: "Hiếu", avatar: "" },
  };

  const [openConfirm, setOpen] = useState({ open: false, item: null });
  const closeConfirmModal = () => setOpen({ open: false, item: null });
  const openConfirmModal = (item) => setOpen({ open: true, item });

  const onHidden = () => {
    alert("hidden");
    closeConfirmModal();
  };
  const closeModal = () => {
    dispatch(closeReportContentReviewSubjectModal());
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
          maxHeight={"580px"}
          overflow={"auto"}
          sx={{
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Owner owner={dataModal.owner} createdAt={dataModal.createdAt} />
          <Box p={2} pt={1} sx={{ backgroundColor: "white", borderRadius: 1 }}>
            <div
              dangerouslySetInnerHTML={{
                __html: dataModal.reviewSubject.review,
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
