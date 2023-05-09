import React from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BoxFull from "./containers/BoxFull";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import { useSelector } from "react-redux";
import UserLayout from "./layouts/UserLayout";
import WebLayout from "./layouts/WebLayout";
import { ProSidebarProvider } from "react-pro-sidebar";
import Home from "./pages/Home";
import PostDetailt from "./components/posts/postDetailt";
function App() {
  const [theme, colorMode] = useMode();
  const { isLogin, user } = useSelector((state) => state.authentication);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ProSidebarProvider>
            <CssBaseline />
            <BoxFull>
              <BoxFull maxHeight={"100vh"}>
                <Routes>
                  <Route path="/" element={<WebLayout />}>
                    {isLogin && user?.roleType === "ADMIN" ? (
                      <Route path="/" element={<div>Admin Layout</div>}></Route>
                    ) : (
                      <Route path="/" element={<UserLayout />}>
                        <Route index element={<Home />}/>
                        <Route
                            path="post/:id"
                            element={<PostDetailt />}
                          ></Route>
                      </Route>
                    )}
                  </Route>
                  <Route path="sign-in" element={<Signin />} />
                  <Route path="sign-up" element={<Signup />} />
                  <Route path="forgot-password" element={<ForgotPassword />} />
                </Routes>
              </BoxFull>
            </BoxFull>
          </ProSidebarProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
