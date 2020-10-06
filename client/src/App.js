import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Main from "./components/Main";
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import CustomeTheme from "./components/CustomeTheme";
function App() {
  return (
    <ThemeProvider theme={CustomeTheme}>
      <ColorModeProvider>
        <CSSReset />
        <Main />
      </ColorModeProvider>
    </ThemeProvider>
  );
}
export default App;
