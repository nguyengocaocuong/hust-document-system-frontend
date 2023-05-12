import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const PropperMenu = ({ icon = <MoreVertIcon />, action }) => {
  const [userSettingEl, setUserSettingEl] = React.useState(null);
  const userSettingOpen = Boolean(userSettingEl);
  const handleClickSettingOpen = (event) => {
    setUserSettingEl(event.currentTarget);
  };
  const handleCloseSettingOpen = () => {
    setUserSettingEl(null);
  };
  return (
    <React.Fragment>
      <IconButton
        onClick={handleClickSettingOpen}
        size="small"
        sx={{ ml: 2 }}
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
        {action.map((ac, index) => (
          <MenuItem onClick={() => ac.handle(handleCloseSettingOpen)} sx={{'&:hover':{backgroundColor:'#DDE2EE'}}}>
            {ac.icon} {ac.label}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};
export default PropperMenu;
