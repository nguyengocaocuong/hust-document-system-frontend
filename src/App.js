import React from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BoxFull from "./containers/BoxFull";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <BoxFull>
            <BoxFull maxHeight={"100vh"}>
              <Routes>
                <Route
                  path="sign-in"
                  element={<Signin />}
                />
                <Route
                  path="sign-up"
                  element={<Signup />}
                />
                <Route
                  path="forgot-password"
                  element={<ForgotPassword />}
                />
              </Routes>
            </BoxFull>
          </BoxFull>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
