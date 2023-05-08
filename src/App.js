import React from "react";
import { ColorModeContext, useMode } from "./theme";
import { Box, ThemeProvider } from "@mui/material";
function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <Box>Welcome</Box>
        </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App;
