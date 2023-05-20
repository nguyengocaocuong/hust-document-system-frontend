import { Typography } from "@mui/material";
import React from "react";
import { MenuItem, menuClasses } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
function SidebarItem({
  title,
  to,
  Icon,
  selectedColor,
  subItem = false,
  setting = false,
}) {
  const location = useLocation();
  const isSelected = location.pathname.startsWith(to);
  return (
    <MenuItem
      style={{
        background:
          isSelected &&
          !setting &&
          !subItem &&
          "linear-gradient(90deg, rgba(255,0,4,1) 0%, rgba(255,174,174,0.8856792717086834) 0%, rgba(246,228,228,1) 100%)",
        color: isSelected && selectedColor,
        height: setting ? "37px" : "47px",
        width: "95%",
        borderRadius: "0 5px 5px 0",
        paddingLeft: subItem && !setting && "40px",
        borderLeft:
          isSelected && !setting && !subItem ? "3px solid red" : "none",
      }}
      rootStyles={{
        ["." + menuClasses.button]: {
          "&:hover": {
            color: "red",
          },
        },
      }}
      icon={
        <Icon
          style={{
            fontSize: subItem || setting ? "20px" : "23px",
            color: isSelected && selectedColor,
          }}
        />
      }
      component={<Link to={to} />}
    >
        <Typography style={{ fontSize: subItem || setting ? "15px" : "16px" }}>
          {title}
        </Typography>
    </MenuItem>
  );
}

export default SidebarItem;
