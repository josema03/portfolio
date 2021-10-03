import {
  AnimatePresence,
  ForwardRefComponent,
  HTMLMotionProps,
  motion,
  useTransform,
  useViewportScroll,
  Variants,
} from "framer-motion";
import { Easing } from "framer-motion/types/types";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { LayoutState } from "../pages";
import useBreakpoints from "../utils/useBreakpoint";

const StyledSideContentWrapper = styled<
  ForwardRefComponent<
    HTMLDivElement,
    HTMLMotionProps<"div"> & { side: "left" | "right" }
  >
>(motion.div)`
  position: fixed;
  top: auto;
  right: ${({ side }) => (side === "right" ? "5vw" : "auto")};
  bottom: 0px;
  left: ${({ side }) => (side === "left" ? "5vw" : "auto")};
  background-color: transparent;
  z-index: 10;
`;

const sideContentVariants: Variants = {
  hidden: {
    y: "100%",
    transition: {
      duration: 0.05,
    },
  },
  visible: {
    y: "0px",
    transition: {
      duration: 0.3,
    },
  },
};

const SideContentWrapper: React.FunctionComponent<
  React.PropsWithChildren<{ side: "left" | "right" }>
> = ({ children, side }) => {
  const [motionRange, setMotionRange] = useState({
    input: [0, 1],
    output: [100, 100],
  });
  const { contentTranslationX } = useContext(LayoutState);
  const { isBelowBreakpoint, currentHeight, previousHeight } = useBreakpoints();
  const { scrollY } = useViewportScroll();
  const translateYMotionValue = useTransform(
    scrollY,
    motionRange.input,
    motionRange.output,
    {
      ease: (progress: number) => Math.pow(progress, 1 / 2),
    }
  );

  useEffect(() => {
    const heightChange =
      !!previousHeight &&
      !!currentHeight &&
      Math.abs(1 - previousHeight / currentHeight);
    if (!!heightChange && heightChange < 0.1) return;

    currentHeight &&
      setMotionRange({
        input: [0, currentHeight / 2, currentHeight],
        output: [currentHeight, currentHeight / 5, 0],
      });
  }, [currentHeight]);

  return (
    <>
      {!isBelowBreakpoint?.md && (
        <StyledSideContentWrapper
          side={side}
          variants={sideContentVariants}
          style={{
            translateX: contentTranslationX,
            translateY: translateYMotionValue,
          }}
        >
          {children}
        </StyledSideContentWrapper>
      )}
    </>
  );
};

export default SideContentWrapper;
