import React from "react";
import { ColorModeContext, useMode } from "./theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BoxFull from "./containers/BoxFull";
import Signin from "./pages/Signin";
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
              </Routes>
            </BoxFull>
          </BoxFull>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
