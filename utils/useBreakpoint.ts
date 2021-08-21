import { useEffect, useState } from "react";

const useBreakpoint = (breakpoint: number) => {
  const [currentWidth, setCurrentWidth] = useState<number | undefined>(
    undefined
  );
  const [isBelowBreakpoint, setIsBelowBreakpoint] = useState<
    boolean | undefined
  >(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const onResize = () => {
        setCurrentWidth(window.innerWidth);
        setIsBelowBreakpoint(window.innerWidth < breakpoint);
      };

      if (
        typeof currentWidth === "undefined" ||
        typeof isBelowBreakpoint === "undefined"
      ) {
        onResize();
      }

      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
      };
    }
  });

  return { currentWidth, isBelowBreakpoint };
};

export default useBreakpoint;
