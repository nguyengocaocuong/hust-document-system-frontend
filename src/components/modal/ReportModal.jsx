import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeReportModal } from "../../store/modalState";
import ConfirmModal from "./ComfirmModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "90%",
  overflow: "hidden",
  width: "400px",
  backgroundColor: "white",
  borderRadius: 1,
  boxShadow: 24,
  "&:focus": { border: "none" },
};
function ReportModal({ open }) {
  const dispatch = useDispatch();
  const [data, setData] = useState({ reportType: null, body: null });
  const closeModal = () => {
    dispatch(closeReportModal());
  };
  const message = "Bạn có chắc chắn muốn báo cáo tài liệu này không";
  const [confirmState, setConfirmState] = useState({ open: false, item: null });
  const closeConfirmModal = () => setConfirmState({ open: false, item: null });
  const openConfirmModal = (item) => setConfirmState({ open: true, item });
  const onReport = () => {
    console.log("report");
  };
  return (
    <Modal open={open} onClose={closeModal}>
      <Box sx={{ ...style }}>
        <Box display={"flex"} alignItems={"center"} p={2} sx={{}}>
          <Typography
            variant="h3"
            textAlign={"center"}
            fontWeight={"bold"}
            width={"calc(100% - 30px)"}
          >
            Báo cáo
          </Typography>
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box p={2}>
          <Typography
            variant="h4"
            fontWeight={"bold"}
            width={"calc(100% - 30px)"}
          >
            Hãy chọn nội dung báo cáo
          </Typography>
          <Typography width={"calc(100% - 30px)"}>
            Hãy chung tay góp phần làm cho nội dung của trang web được hoàn
            thiện hơn
          </Typography>
        </Box>
        <Box
          maxHeight={"580px"}
          overflow={"auto"}
          sx={{ backgroundColor: "white" }}
        >
          <Box
            width={"100%"}
            p={1.5}
            sx={{
              borderRadius: 1,
              backgroundColor: data.reportType === 1 ? "#f7f7f2" : "inherit",
              "&:hover": { backgroundColor: "#f7f7f2" },
              cursor: "pointer",
            }}
          >
            <Typography
              fontSize={"15px"}
              width={"100%"}
              fontWeight={600}
              onClick={() =>
                setData({
                  ...data,
                  reportType: data.reportType !== 1 ? 1 : null,
                })
              }
            >
              Nội dung bài viết không phù hợp
            </Typography>
            {data.reportType === 1 && (
              <Box px={3} py={1} width={"100%"}>
                <InputBase
                  sx={{
                    width: "100%",
                    backgroundColor: "white",
                    p: 1,
                    borderRadius: 1,
                    my: 1,
                  }}
                  placeholder="Nhập nội dung báo cáo"
                />
                <Box width={"100%"} display={"flex"} justifyContent={"end"}>
                  <Button
                    sx={{ textTransform: "none" }}
                    variant="contained"
                    color={"error"}
                  >
                    Báo cáo
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
          <Box
            width={"100%"}
            p={1.5}
            sx={{
              borderRadius: 1,
              "&:hover": { backgroundColor: "#f7f7f2" },
              cursor: "pointer",
            }}
          >
            <Typography fontSize={"15px"} fontWeight={600}>
              Tài liệu trùng lặp
            </Typography>
          </Box>
          <Box
            width={"100%"}
            p={1.5}
            sx={{
              borderRadius: 1,
              "&:hover": { backgroundColor: "#f7f7f2" },
              cursor: "pointer",
            }}
          >
            <Typography
              fontSize={"15px"}
              fontWeight={600}
              onClick={openConfirmModal}
            >
              Không truy cập được tài liệu
            </Typography>
          </Box>
          <Box
            width={"100%"}
            p={1.5}
            sx={{
              borderRadius: 1,
              "&:hover": { backgroundColor: "#f7f7f2" },
              cursor: "pointer",
            }}
          >
            <Typography
              fontSize={"15px"}
              fontWeight={600}
              onClick={() =>
                setData({
                  ...data,
                  reportType: data.reportType !== 4 ? 4 : null,
                })
              }
            >
              Yêu cầu gỡ tài liệu
            </Typography>
            {data.reportType === 4 && (
              <Box px={3} py={1} width={"100%"}>
                <InputBase
                  sx={{
                    width: "100%",
                    backgroundColor: "white",
                    p: 1,
                    borderRadius: 1,
                    my: 1,
                  }}
                  placeholder="Nhập lý do muốn gỡ"
                />
                <Box width={"100%"} display={"flex"} justifyContent={"end"}>
                  <Button
                    sx={{ textTransform: "none" }}
                    variant="contained"
                    color={"error"}
                  >
                    Báo cáo
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
          {confirmState.open && (
            <ConfirmModal
              message={message}
              open={confirmState.open}
              closeModal={closeConfirmModal}
              action={onReport}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
}

export default ReportModal;
