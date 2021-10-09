import {
  motion,
  MotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { transparentize } from "polished";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box, Flex } from "rebass/styled-components";
import styled from "styled-components";
import { LayoutState } from "../pages";
import useBreakpoints from "../utils/useBreakpoint";
import Typography from "./Typography";

interface BreakpointsMapping {
  _: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}
interface CommonSectionContext {
  progress: MotionValue;
  parentId: string;
}

const breakpointsMapping: BreakpointsMapping = {
  _: 0,
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
};

export const CommonSectionContext = createContext<CommonSectionContext>({
  progress: new MotionValue(0),
  parentId: "",
});

interface CommonSectionProps {
  index: number;
  title: string;
}

const MotionWrapper = styled(motion.div)`
  position: fixed;
  top: 64px;
  bottom: auto;
  left: 0;
  z-index: 0;
  transform-origin: top center;
`;

const ContentWrapper = styled(Flex)`
  position: relative;

  ::before,
  ::after {
    content: "";
    position: absolute;
    width: 100%;
    z-index: 10;
  }

  ::before {
    top: 0;
    left: 0;
    right: 0;
    bottom: auto;
    background: ${({ theme }) => `linear-gradient(
      to top,
      ${transparentize(1, theme.colors.background.main)},
      ${transparentize(0, theme.colors.background.main)},
      ${transparentize(0, theme.colors.background.main)}
    )`};
  }

  ::after {
    top: auto;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => `linear-gradient(
      to bottom,
      ${transparentize(1, theme.colors.background.main)},
      ${transparentize(0, theme.colors.background.main)},
      ${transparentize(0, theme.colors.background.main)}
    )`};
  }

  ${({ theme, py }) =>
    Object.entries(py as Object)
      .map(([breakpoint, spacingIndex]) => {
        const breakpointIndex =
          breakpointsMapping[breakpoint as keyof BreakpointsMapping];
        const breakpointValue = theme.breakpoints[breakpointIndex];
        const spacingValue = theme.space[spacingIndex];
        return `
          @media (min-width: ${breakpointValue}) {
            ::before, ::after {
              height: calc( ${spacingValue} * 2 )
            }

            ::before {
              top: calc( -0.75 * ${spacingValue} )
            }

            ::after {
              bottom: calc( -0.75 * ${spacingValue} )
            }
          }
        `;
      })
      .join(";")}
`;

const RelativeFlex = styled(Flex)`
  position: relative;
`;

const CommonSection = ({
  index,
  title,
  children,
}: React.PropsWithChildren<CommonSectionProps>) => {
  const { contentTranslationX } = useContext(LayoutState);
  const { currentWidth, currentHeight, previousHeight } = useBreakpoints();
  const [motionRange, setMotionRange] = useState({
    input: [0, 1],
    output: {
      opacity: [0, 0],
      scale: [1, 1],
      progress: [0, 1],
      translateY: [0, 0],
    },
  });
  const { scrollY } = useViewportScroll();
  const opacityMotionValue = useTransform(
    scrollY,
    motionRange.input,
    motionRange.output.opacity
  );
  const scaleMotionValue = useTransform(
    scrollY,
    motionRange.input,
    motionRange.output.scale
  );
  const translateYMotionValue = useTransform(
    scrollY,
    motionRange.input,
    motionRange.output.translateY
  );
  const componentScrollProgress = useTransform(
    scrollY,
    motionRange.input,
    motionRange.output.progress
  );
  const [componentHeight, setComponentHeight] = useState(0);
  const componentId = useRef(title.toLowerCase().split(" ").join("-")).current;
  const placeholderId = useRef(
    title.toLowerCase().split(" ").concat("placeholder").join("-")
  ).current;

  const getComponentHeight = useCallback((node) => {
    if (!node) return;
    const { scrollHeight } = node;
    setComponentHeight(scrollHeight * 4);
  }, []);

  const setMotionTransformValues = useCallback((node: HTMLElement) => {
    if (!node) return;
    const { offsetTop, scrollHeight } = node;
    const { innerHeight } = window;
    setMotionRange({
      input: [
        0,
        offsetTop - innerHeight - 64,
        offsetTop,
        offsetTop + scrollHeight - innerHeight - 64 * 1.5 * 2,
        offsetTop + scrollHeight - 64 * 1.5,
      ],
      output: {
        opacity: [1, 1, 1, 1, 0],
        scale: [1, 1, 1, 1, 0],
        progress: [0, 0, 0, 1, 1],
        translateY: [innerHeight, innerHeight, 0, 0, 0],
      },
    });
  }, []);

  useEffect(() => {
    const heightChange =
      !!previousHeight &&
      !!currentHeight &&
      Math.abs(1 - previousHeight / currentHeight);
    if (!!heightChange && heightChange < 0.1) return;

    const placeholderElement = document.getElementById(placeholderId);
    !!placeholderElement && setMotionTransformValues(placeholderElement);
  }, [currentHeight, currentWidth]);

  return (
    <>
      <MotionWrapper
        style={{
          opacity: opacityMotionValue,
          scale: scaleMotionValue,
          translateX: contentTranslationX,
          translateY: translateYMotionValue,
        }}
      >
        <Box minWidth="100vw">
          <Flex
            as="section"
            flexDirection="column"
            maxWidth={{ _: "425px", md: "1024px" }}
            width={{ _: "100vw", md: "75vw" }}
            height="calc(100vh - 64px)"
            maxHeight="calc(100vh - 64px)"
            mx="auto"
            p={{ _: 4, md: 5 }}
            id={componentId}
            ref={getComponentHeight}
          >
            <Flex alignItems="center">
              <Typography
                as="span"
                fontColor="textAccent"
                fontSize={{ _: 3, md: 3 }}
                fontWeight={{ _: "600", md: "700" }}
              >
                {index}.&nbsp;
              </Typography>
              <Typography
                as="h2"
                fontColor="textPrimary"
                fontSize={{ _: 3, md: 3 }}
                fontWeight={{ _: "600", md: "700" }}
              >
                {title}
              </Typography>
              <Flex minHeight={{ _: "100%" }} alignItems="center" flex="1">
                <Box
                  minHeight={{ _: "1px", md: "2px" }}
                  width={{ _: "100%" }}
                  mx={{ _: 4 }}
                  backgroundColor="#c0c0c0"
                  content=""
                />
              </Flex>
            </Flex>
            <CommonSectionContext.Provider
              value={{
                progress: componentScrollProgress,
                parentId: componentId,
              }}
            >
              <ContentWrapper flex="1" overflow="hidden" py={{ _: 5 }}>
                <RelativeFlex
                  flex="1"
                  flexDirection="column"
                  maxHeight="100%"
                  overflow="visible"
                >
                  {children}
                </RelativeFlex>
              </ContentWrapper>
            </CommonSectionContext.Provider>
          </Flex>
        </Box>
      </MotionWrapper>
      <Box height={componentHeight} id={placeholderId}></Box>
    </>
  );
};

export default CommonSection;
