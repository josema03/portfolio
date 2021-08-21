import { DefaultTheme } from "styled-components";

interface Color {
  main: string;
  light?: string;
  dark?: string;
  textContrast?: string;
}

interface BreakpointsAliases {
  _?: string | number;
  xs?: string | number;
  sm?: string | number;
  md?: string | number;
  lg?: string | number;
  xl?: string | number;
}

interface CommonProperties {
  fontFamily: { heading: string; body: string };
  fontSizes: (string | number)[];
  lineHeights: (string | number)[];
  breakpoints: (string | number)[] & BreakpointsAliases;
  space: string[] | number[];
}

declare module "styled-components" {
  export interface DefaultTheme extends CommonProperties {
    colors: {
      primary: Color;
      secondary?: Color;
      background: Color;
      accent: Color;
      textPrimary: Color;
      textSecondary: Color;
      textAccent: Color;
    };
  }
}

const commonProperties: CommonProperties = {
  fontFamily: { heading: "Inter", body: "Inter" },
  fontSizes: ["0.25rem", "0.5rem", "1rem", "2rem", "4rem", "6rem", "8rem"],
  lineHeights: ["0.25rem", "0.5rem", "1rem", "2rem", "4rem", "6rem", "8rem"],
  breakpoints: ["0px", "320px", "425px", "768px", "1024px", "1200px"],
  space: ["0rem", "0.1rem", "0.2rem", "0.4rem", "0.8rem", "1.6rem", "3.2rem"],
};

commonProperties.breakpoints._ = commonProperties.breakpoints[0];
commonProperties.breakpoints.xs = commonProperties.breakpoints[1];
commonProperties.breakpoints.sm = commonProperties.breakpoints[2];
commonProperties.breakpoints.md = commonProperties.breakpoints[3];
commonProperties.breakpoints.lg = commonProperties.breakpoints[4];
commonProperties.breakpoints.xl = commonProperties.breakpoints[5];

export const darkTheme: DefaultTheme = {
  colors: {
    primary: {
      main: "#7232f2",
      light: "#c876ff",
      dark: "#20115b",
      textContrast: "#ffffff",
    },
    background: {
      main: "#010108",
      textContrast: "#ffffff",
    },
    accent: {
      main: "#bc7201",
      light: "#e5ab09",
      dark: "#6a2202",
      textContrast: "#010108",
    },
    textPrimary: {
      main: "#ffffff",
    },
    textSecondary: {
      main: "#c0c0c0",
    },
    textAccent: {
      main: "#e5ab09",
    },
  },
  ...commonProperties,
};
