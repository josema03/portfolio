import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { darkTheme } from "../theme/theme";

const Fonts = createGlobalStyle`
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter-100.ttf');
    font-weight: 100;
  }

  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter-200.ttf');
    font-weight: 200;
  }

  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter-300.ttf');
    font-weight: 300;
  }

  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter-400.ttf');
    font-weight: 400;
  }

  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter-500.ttf');
    font-weight: 500;
  }

  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter-600.ttf');
    font-weight: 600;
  }

  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter-700.ttf');
    font-weight: 700;
  }
  
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter-800.ttf');
    font-weight: 800;
  }

  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter-900.ttf');
    font-weight: 900;
  }

  body {
    background-color: black;
  }
`;

const Theme = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Fonts />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
