import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSidebarItem } from "../../settings/SidebarSettingJson";
import { Sidebar as ProSidebar, Menu, sidebarClasses } from "react-pro-sidebar";
import SidebarHeader from "./SidebarHeader";
import SidebarHomeItem from "./SidebarHomeItem";
import SidebarItem from "./SidebarItem";
import SidebarSubItem from "./SidebarSubItem";
import { Box, Divider, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { MenuItem, menuClasses } from "react-pro-sidebar";
import { signOut } from "../../store/authState";
import { useNavigate } from "react-router-dom";
import { useProSidebar } from "react-pro-sidebar";
import { useRef } from "react";
import { useEffect } from "react";
function Sidebar({ setSidebarWidth }) {
  const { collapsed } = useProSidebar();
  const {
    user: { roleType },
  } = useSelector((state) => state.authentication);
  const [sidebarItem, sidebarSettingItem] = GetSidebarItem(roleType);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/");
  };
  const sidebarRef = useRef();
  useEffect(() => {
    const updateElementAWidth = () => {
      if (sidebarRef.current) {
        setSidebarWidth(sidebarRef.current.getBoundingClientRect().width);
      }
    };

    updateElementAWidth();

    const observer = new ResizeObserver(updateElementAWidth);
    if (sidebarRef.current) {
      observer.observe(sidebarRef.current);
    }
    return () => {
    // eslint-disable-next-line
      if (sidebarRef.current) observer.unobserve(sidebarRef.current);
    };
    // eslint-disable-next-line
  }, [sidebarRef]);
  return (
    <ProSidebar
      defaultCollapsed={window.innerWidth <= 1100}
      ref={sidebarRef}
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: "white",
          height: "100vh",
          maxWidth: "250px",
          border: "1px solid #D8D9D9",
        },
        borderRight: "1px solid #D8D9D9",
      }}
      transitionDuration={500}
    >
      <SidebarHeader />
      <SidebarHomeItem />
      <Box overflow={"auto"} height={"calc(100vh - 263px)"}>
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
      <Box bottom={0} left={0} position={"absolute"}>
        <Divider />
        <Menu style={{ marginTop: "15px" }}>
          {sidebarSettingItem.map((item, index) => (
            <SidebarItem key={index} {...item} setting />
          ))}
          <MenuItem
            style={{
              height: "37px",
              width: "95%",
              borderRadius: "0 5px 5px 0",
            }}
            rootStyles={{
              ["." + menuClasses.button]: {
                "&:hover": {
                  color: "red",
                },
              },
            }}
            icon={
              <LogoutIcon
                style={{
                  fontSize: "20px",
                }}
              />
            }
            component={<Box onClick={handleSignOut} />}
          >
            <Typography
              style={{
                fontSize: "15px",
                display: collapsed ? "none" : "block",
              }}
            >
              Thoát
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </ProSidebar>
  );
}

export default Sidebar;
