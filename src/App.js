import React from "react";
import { ColorModeContext, useMode } from "./theme";
import { Box, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Box>Welcome</Box>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
