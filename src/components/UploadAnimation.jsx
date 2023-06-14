import * as React from "react";
import Badge from "@mui/material/Badge";
import { Box, IconButton } from "@mui/material";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";

export default function UploadAnimation({ toggle, total }) {
  return (
    <Box display={"flex"}>
      <Box
        sx={{
          position: "relative",
          "&::after": {
            position: "absolute",
            top: "2px",
            left: "2px",
            width: "38px",
            height: "38px",
            animation: "ripple 1.2s infinite linear",
            borderLeft: "4px solid #3FFF00",
            borderTop: "4px solid #66FF66",
            borderRight: "4px solid #98FB98",
            borderBottom: "4px solid #CCFFCC",
            borderRadius: "50px",
            content: '""',
            zIndex: 1,
          },
          "@keyframes ripple": {
            "0%": {
              transform: "0deg)",
              opacity: 1,
            },
            "100%": {
              transform: "rotate(360deg)",
              opacity: 1,
            },
          },
        }}
      >
        <IconButton
          sx={{
            marginRight: "16px",
            zIndex: 2,
            top: 0,
            left: 0,
            backgroundColor: "transparent",
          }}
          onClick={toggle}
        >
          <Badge badgeContent={total} color="error">
            <NotificationsActiveOutlinedIcon
              style={{
                fontSize: "25px",
                borderRadius: "50%",
                backgroundColor: "transparent",
              }}
            />
          </Badge>
        </IconButton>
      </Box>
    </Box>
  );
}
