import React from "react";
import { useSelector } from "react-redux";
import { GetSidebarItem } from "../../settings/sidebarSetting";
import { Sidebar as ProSidebar, Menu, sidebarClasses } from "react-pro-sidebar";
import SidebarHeader from "./SidebarHeader";
import SidebarHomeItem from "./SidebarHomeItem";
import SidebarItem from "./SidebarItem";
import SidebarSubItem from "./SidebarSubItem";
import { Box, Divider } from "@mui/material";
function Sidebar() {
  const {
    user: { roleType },
  } = useSelector((state) => state.authentication);
  const [sidebarItem, sidebaerSettingItem] = GetSidebarItem(roleType);
  return (
    <ProSidebar
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: "white",
          height: "100vh",
          maxWidth: "250px",
          border: "1px solid #D8D9D9",
        },
        borderRight:"1px solid #D8D9D9"
      }}
      transitionDuration={500}
    >
      <SidebarHeader />
      <SidebarHomeItem />
      <Box overflow={"auto"} height={"calc(100vh - 300px)"}>
        <Menu>
          {sidebarItem.map((item, index) => {
            return item.type === "ITEM" ? (
              <SidebarItem key={index} {...item} />
            ) : (
              <SidebarSubItem key={index} {...item} />
            );
          })}
        </Menu>
      </Box>
      <Box bottom={0} left={0}>
        <Divider />
        <Menu style={{ marginTop: "15px" }}>
          {sidebaerSettingItem.map((item, index) => (
            <SidebarItem key={index} {...item} setting />
          ))}
        </Menu>
      </Box>
    </ProSidebar>
  );
}

export default Sidebar;
