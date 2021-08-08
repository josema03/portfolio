import React from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "../theme/theme";

const Theme = ({ children }: React.PropsWithChildren<{}>) => {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
};

export default Theme;
