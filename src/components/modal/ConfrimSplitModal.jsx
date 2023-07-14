import {
  Box,
  Button,
  IconButton,
  InputBase,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

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
function ConfrimSplitModal({ open, closeModal, action }) {
  const [page, setPage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const parseInputString = () => {
    if (page === "") {
      setErrorMessage("Bạn chưa chọn trang muốn dịch");
      return;
    }
    const result = [];

    const segments = page.split(",");
    segments.forEach((segment) => {
      if (segment.includes("-")) {
        const [start, end] = segment.split("-");
        const parsedStart = parseInt(start.trim(), 10);
        const parsedEnd = parseInt(end.trim(), 10);
        if (!isNaN(parsedStart) && !isNaN(parsedEnd)) {
          for (let i = parsedStart; i <= parsedEnd; i++) {
            result.push(i);
          }
        }
      } else {
        const parsedValue = parseInt(segment.trim(), 10);
        if (!isNaN(parsedValue)) {
          result.push(parsedValue);
        }
      }
    });
    if (result.length > 15) {
      setErrorMessage(
        "Số trang tối đa 15 trang, bạn đang chọn " + result.length + " trang"
      );
      return;
    }
    action(true, result);
  };
  return (
    <Modal open={open} onClose={closeModal}>
      <Box sx={{ ...style }}>
        <Box p={2}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            py={1}
          >
            <Typography
              variant="h4"
              fontWeight={"bold"}
              width={"calc(100% - 30px)"}
            >
              Chọn trang muốn dịch
            </Typography>
            <IconButton onClick={closeModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography width={"calc(100% - 30px)"} sx={{ pb: 1 }}>
            Kích thước file quá lớn, bạn hãy chọn trang cụ thể muốn dịch
          </Typography>
          <InputBase
            placeholder="1,2 2-4"
            value={page}
            onChange={(e) => {
              setPage(e.target.value);
              setErrorMessage("");
            }}
            sx={{
              width: "100%",
              height: "40px",
              p: 2,
              border: "1px solid gray",
            }}
          />
          <Typography color={"error"} fontSize="13px" textAlign={"end"}>
            {errorMessage}
          </Typography>
        </Box>
        <Box
          maxHeight={"580px"}
          overflow={"auto"}
          sx={{ backgroundColor: "white" }}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"end"}
          p={2}
        >
          <Button
            variant="contained"
            color="warning"
            sx={{ mx: 2 }}
            onClick={parseInputString}
          >
            Dịch tài liệu
          </Button>
          <Button variant="outlined" color="primary" onClick={closeModal}>
            Hủy bỏ
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ConfrimSplitModal;
