import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";

interface Breakpoints {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

interface IsBelowBreakpoint {
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
}

const useBreakpoints = (breakpoints?: Breakpoints) => {
  const [currentWidth, setCurrentWidth] = useState<number | undefined>(
    undefined
  );
  const [currentHeight, setCurrentHeight] = useState<number | undefined>(
    undefined
  );
  const [previousHeight, setPreviousHeight] = useState<number | undefined>(
    undefined
  );
  const [isBelowBreakpoint, setIsBelowBreakpoint] = useState<
    IsBelowBreakpoint | undefined
  >(undefined);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const onResize = () => {
        setCurrentWidth(window.innerWidth);
        setPreviousHeight(currentHeight);
        setCurrentHeight(window.innerHeight);
      };

      if (typeof currentWidth === "undefined") {
        onResize();
      }

      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
      };
    }
  });

  useEffect(() => {
    if (!!currentWidth) {
      const breakpointsToMap =
        breakpoints ??
        Object.keys(theme.breakpoints)
          .filter((key) => isNaN(Number(key)))
          .reduce((breakpointsObj, breakpointKey) => {
            const breakpointValue =
              theme.breakpoints[breakpointKey as keyof Breakpoints];
            breakpointsObj[breakpointKey as keyof Breakpoints] =
              typeof breakpointValue === "string"
                ? Number(breakpointValue.split("px")[0])
                : breakpointValue;
            return breakpointsObj;
          }, {} as Breakpoints);

      const isBelowBreakpointValue = Object.keys(breakpointsToMap).reduce(
        (isBelowBreakpointAcc, breakpointKey) => {
          const breakpointValue =
            breakpointsToMap[breakpointKey as keyof Breakpoints];
          isBelowBreakpointAcc[breakpointKey as keyof IsBelowBreakpoint] =
            typeof breakpointValue !== "undefined"
              ? currentWidth < breakpointValue
              : undefined;

          return isBelowBreakpointAcc;
        },
        {} as IsBelowBreakpoint
      );
      setIsBelowBreakpoint(isBelowBreakpointValue);
    }
  }, [currentWidth]);

  return { currentWidth, currentHeight, previousHeight, isBelowBreakpoint };
};

export default useBreakpoints;
