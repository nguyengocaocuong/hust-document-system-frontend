import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

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
function ConfirmModal({ open, closeModal, message, action }) {
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
              Xác nhận hành động
            </Typography>
            <IconButton onClick={closeModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography width={"calc(100% - 30px)"}>{message}</Typography>
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
            color="error"
            sx={{ mx: 2 }}
            onClick={() => {
              action(true);
            }}
          >
            Xác nhận
          </Button>
          <Button variant="outlined" color="primary" onClick={closeModal}>
            Hủy bỏ
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ConfirmModal;
