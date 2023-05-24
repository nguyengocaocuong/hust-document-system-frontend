import React from "react";
import { SubMenu } from "react-pro-sidebar";
import { useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";

function SidebarSubItem({ title, to, Icon, selectedColor, data = [] }) {
  const location = useLocation();
  return (
    <SubMenu
      label={title}
      icon={
        <Icon
          style={{
            fontSize: "23px",
            color: location.pathname.startsWith(to) && selectedColor,
          }}
        />
      }
      style={{
        fontSize: "16px",
        color: location.pathname.startsWith(to) && selectedColor,
        width: "95%",
        background: location.pathname.startsWith(to)
          ? "linear-gradient(90deg, rgba(255,0,4,1) 0%, rgba(255,174,174,0.8856792717086834) 0%, rgba(246,228,228,1) 100%)"
          : "transparent",
        borderLeft: location.pathname.startsWith(to) ? "3px solid red" : "none",
        borderRadius:'0 5px 5px 0'
      }}
    >
      {data.map((item, index) => (
        <SidebarItem key={index} {...item} subItem/>
      ))}
    </SubMenu>
  );
}

export default SidebarSubItem;
