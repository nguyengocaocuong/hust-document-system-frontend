import React, { useEffect, useState } from "react";
import BoxFull from "../components/BoxFull";
import Sidebar from "../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Box } from "@mui/material";
import { useResendJwtTokenMutation } from "../services/AuthService";
import { signOut, updateJwtToken } from "../store/authState";
import Setup from "../pages/Setup";
function WebLayout() {
  const dispatch = useDispatch();
  const [isChecked, setChecked] = useState(false);
  const { isLogin, user } = useSelector((state) => state.authentication);
  const [resendJwtToken] = useResendJwtTokenMutation();
  useEffect(() => {
    if (isLogin)
      resendJwtToken(user.token)
        .then((response) => {
          console.log(response);
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

  const isFristLogin = true;
  return isLogin ? (
    isChecked ? (
      isFristLogin ? (
        <Setup />
      ) : (
        <BoxFull
          maxHeight={"100vh"}
          maxWidth={"100vw"}
          width={"100vw"}
          overflow={"hidden"}
          display={"flex"}
        >
          <Sidebar />
          <BoxFull>
            <Header />
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
