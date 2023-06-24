import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Typography } from "@mui/material";

const renderAction = (items) =>
  items.map(({ Icon, label, action }) => ({
    icon: <Icon sx={{ fontSize: "13px", marginRight: "5px" }} />,
    label: <Typography sx={{ fontSize: "13px" }}>{label}</Typography>,
    handle: (close) => {
      action();
      close();
    },
  }));
const PropperMenu = ({ icon = <MoreVertIcon />, action }) => {
  const [userSettingEl, setUserSettingEl] = React.useState(null);
  const userSettingOpen = Boolean(userSettingEl);
  const handleClickSettingOpen = (event) => {
    event.stopPropagation();
    setUserSettingEl(event.currentTarget);
  };
  const handleCloseSettingOpen = (e) => {
    e?.stopPropagation();
    setUserSettingEl(null);
  };
  return action === undefined || action.length === 0 ? (
    <></>
  ) : (
    <React.Fragment>
      <IconButton
        onClick={handleClickSettingOpen}
        aria-controls={userSettingOpen ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={userSettingOpen ? "true" : undefined}
      >
        {icon}
      </IconButton>
      <Menu
        anchorEl={userSettingEl}
        id="account-menu"
        open={userSettingOpen}
        onClose={handleCloseSettingOpen}
        onClick={handleCloseSettingOpen}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {renderAction(action).map((ac, index) => (
          <MenuItem
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              ac.handle(handleCloseSettingOpen);
            }}
            sx={{ "&:hover": { backgroundColor: "#DDE2EE" } }}
          >
            {ac.icon} {ac.label}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};
export default PropperMenu;
