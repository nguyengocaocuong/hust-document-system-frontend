import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
const NotificationSharedCard = ({ data }) => {
  return (
    <Box display={"flex"} p={2} sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Avatar
        src={data.by.avartar}
        style={{ marginRight: "10px", width: "50px", height: "50px" }}
      />
      <Box>
        <Typography>
          <strong>{`${data.by.firstName} ${data.by.lastName}`}</strong> vừa chia
          sẻ cho bạn tài liệu <strong>{data.document.name}</strong>
        </Typography>
        <Box display={"flex"} pt={1}>
          <Button variant="contained" sx={{ textTransform: "none", mr: 1 }}>
            Xem tài liệu
          </Button>
          <Button variant="outlined" sx={{ textTransform: "none" }}>
            Xem sau
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
const NotificationApproveCard = ({ data }) => {
  return (
    <Box display={"flex"} p={2} sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Avatar
        src={data.by.avartar}
        style={{ marginRight: "10px", width: "50px", height: "50px" }}
      />
      <Box>
        <Typography>
          <strong>Admin</strong> vừa phê duyệt bài viết{" "}
          <strong>{data.document.name}</strong> của bạn
        </Typography>
        <Box display={"flex"} pt={1}>
          <Button variant="contained" sx={{ textTransform: "none", mr: 1 }}>
            Xem bài viết
          </Button>
          <Button variant="outlined" sx={{ textTransform: "none" }}>
            Đã hiểu
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
function NotificationCard({
  data = {
    type: "SHARED",
    by: {
      firstName: "Nguyen Ngo",
      lastName: "Cao Cuong",
      avartar:
        "https://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg",
    },
    document: { name: "document.pdf", path: "" },
  },
}) {
  return data.type === "SHARED" ? (
    <NotificationSharedCard data={data}/>
  ) : (
    <NotificationApproveCard data={data}/>
  );
}

export default NotificationCard;
