import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearApproveNotification } from "../../store/notificationState";
import CloseIcon from "@mui/icons-material/Close";

function ApproveNofifycation({ notifycation }) {
  const {
    notifications: { APPROVE },
  } = useSelector((state) => state.notificationState);
  const dispatch = useDispatch();
  const { approveType, review } = notifycation;
  const close = () => {
    dispatch(
      clearApproveNotification({ id: notifycation.id, preState: APPROVE })
    );
  };
  return (
    <Box width={"100%"} p={2} sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
        <Box>
          <Typography fontSize={"16px"}>
            Bài reiview{" "}
            {approveType === "REVIEW_TEACHER" ? "giảng viên " : "môn "}{" "}
            <strong>{notifycation.name}</strong>
            <span
              style={{ color: notifycation.approved === "REJECT" ? "red" : "green" }}
            >
              {notifycation.approved === "REJECT"
                ? " đã bị từ chối"
                : " đã được phê duyệt"}
            </span>
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Box pt={2} pr={3} display={"flex"} justifyContent={"end"}>
        <Button variant="outlined">Xem bài viết</Button>
      </Box>
    </Box>
  );
}

export default ApproveNofifycation;
