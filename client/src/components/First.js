import React from "react";
import {
  Box,
  Button,
  useColorMode,
  IconButton,
  useTheme,
  Text,
  theme,
} from "@chakra-ui/core";
function First() {
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();
  return (
    <Box>
      <IconButton
        icon={colorMode === "light" ? "moon" : "sun"}
        onClick={toggleColorMode}
      ></IconButton>
      <Button {...theme.btnBorder}>add</Button>
      <Button {...theme.btnBorder1}>add</Button>
      <Text>gt</Text>
    </Box>
  );
}

export default First;
