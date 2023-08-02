import React, { useEffect, useState } from "react";
import BoxFull from "../components/BoxFull";
import Sidebar from "../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Box } from "@mui/material";
import { useResendJwtTokenMutation } from "../services/AuthService";
import { signOut, updateJwtToken } from "../store/authState";
function WebLayout() {
const [sidebarWidth, setSidebarWidth] = useState(0);
  const dispatch = useDispatch();
  const [isChecked, setChecked] = useState(false);
  const { isLogin, user } = useSelector((state) => state.authentication);
  const [resendJwtToken] = useResendJwtTokenMutation();
  useEffect(() => {
    if (isLogin)
      resendJwtToken(user.token)
        .then((response) => {
          if (response.error !== undefined) {
            dispatch(signOut());
          } else {
            dispatch(updateJwtToken(response.data?.token));
            setChecked(true);
          }
        })
        .catch(() => {
          setChecked(false);
        });
  }, [isLogin, user, dispatch, resendJwtToken]);
  return isLogin ? (
    isChecked ? (
      !user.setup ? (
        <Navigate to={"/set-up"} />
      ) : (
        <BoxFull
          maxHeight={"100vh"}
          maxWidth={"100vw"}
          width={"100vw"}
          overflow={"hidden"}
          display={"flex"}
        >
          <Sidebar setSidebarWidth={setSidebarWidth} />
          <BoxFull>
            <Header sidebarWidth={sidebarWidth} />
            <Box
              width={"100%"}
              height={"calc(100vh - 72px)"}
              overflow={"hidden"}
            >
              <Outlet />
            </Box>
          </BoxFull>
        </BoxFull>
      )
    ) : (
      <></>
    )
  ) : (
    <Navigate to={"/sign-in"} replace />
  );
}

export default WebLayout;
