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
  breakpoints: (string | number)[] & BreakpointsAliases;
  space: string[] | number[];
}

declare module "styled-components" {
  export interface DefaultTheme extends CommonProperties {
    colors: {
      primaryColor: Color;
      secondaryColor?: Color;
      backgroundColor: Color;
      accentColor: Color;
    };
  }
}

const commonProperties: CommonProperties = {
  fontFamily: { heading: "verdana", body: "verdana" },
  fontSizes: ["0.25rem", "0.5rem", "0.75rem", "1rem", "1.5rem", "2rem", "3rem"],
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
    primaryColor: {
      main: "#7232f2",
      light: "#c876ff",
      dark: "#20115b",
      textContrast: "#FFFFFF",
    },
    backgroundColor: {
      main: "#010108",
      textContrast: "#FFFFFF",
    },
    accentColor: {
      main: "#bc7201",
      light: "#e5ab09",
      dark: "#6a2202",
      textContrast: "#010108",
    },
  },
  ...commonProperties,
};
