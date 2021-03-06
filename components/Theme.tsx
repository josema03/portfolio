import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { darkTheme } from "../theme/theme";

const BlackBody = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background.main};
  }
`;

const Theme = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <BlackBody />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
