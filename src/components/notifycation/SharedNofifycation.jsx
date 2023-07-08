import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { formatTimeAgo } from "../../utils/ConvertDate";
import { useNavigate } from "react-router-dom";
import { getIconForDocByFileName } from "../../utils/DocumentUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSharedNotification,
  toggleNotification,
} from "../../store/notificationState";

function SharedNofifycation({ notification }) {
  const {
    notifications: { SHARED },
  } = useSelector((state) => state.notificationState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const owner = notification.subjectDocument.owner;
  const subjectDocument = notification.subjectDocument;
  const close = () => {
    dispatch(
      clearSharedNotification({ id: notification.id, preState: SHARED })
    );
    dispatch(toggleNotification(true));
  };
  const openSubjectDocument = () => {
    navigate(`/education/subject-document/${notification.subjectDocument.id}`);
    close();
  };
  return (
    <Box
      display={"flex"}
      p={2}
      sx={{ borderBottom: 1, borderColor: "divider" }}
    >
      <Avatar
        src={owner.avatar}
        style={{ marginRight: "10px", width: "50px", height: "50px" }}
      ></Avatar>
      <Box>
        <Typography>
          <strong>{`${owner.firstName} ${owner.lastName}`}</strong>
        </Typography>
        <Typography>vừa chia sẻ tài liệu cho bạn</Typography>
        <Box display={"flex"} py={1.5}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"start"}
            sx={{ boxShadow: 2, p: 1, borderRadius: 2 }}
          >
            <img
              style={{ width: "40px", height: "40px" }}
              src={getIconForDocByFileName(subjectDocument.document.name)}
              alt={subjectDocument.document.name}
            />
            <Box display={"flex"} alignItems={"center"}>
              <Box>
                <Typography fontWeight={"bold"}>
                  {subjectDocument.document.name}
                </Typography>
                <Typography>{formatTimeAgo(notification.sharedAt)}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box display={"flex"} pt={1}>
          <Button
            variant="contained"
            sx={{ textTransform: "none", mr: 1 }}
            onClick={openSubjectDocument}
          >
            Xem tài liệu
          </Button>
          <Button
            variant="outlined"
            sx={{ textTransform: "none" }}
            onClick={close}
          >
            Xem sau
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SharedNofifycation;
