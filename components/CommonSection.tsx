import { motion, useTransform, useViewportScroll } from "framer-motion";
import React, {
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

const CommonSection = ({
  index,
  title,
  children,
}: React.PropsWithChildren<CommonSectionProps>) => {
  const { sidebarTranslationX } = useContext(LayoutState);
  const { currentWidth, currentHeight } = useBreakpoints();
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
    setComponentHeight(scrollHeight * 2);
  }, []);

  const setMotionTransformValues = useCallback((node: HTMLElement) => {
    if (!node) return;
    const { offsetTop, scrollHeight } = node;
    const { innerHeight } = window;
    setMotionRange({
      input: [
        0,
        offsetTop - innerHeight - 64,
        offsetTop - 64,
        offsetTop + scrollHeight - innerHeight,
        offsetTop + scrollHeight,
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
    const placeholderElement = document.getElementById(placeholderId);
    !!placeholderElement && setMotionTransformValues(placeholderElement);
  }, [currentHeight, currentWidth]);

  return (
    <>
      <MotionWrapper
        style={{
          opacity: opacityMotionValue,
          scale: scaleMotionValue,
          translateX: sidebarTranslationX,
          translateY: translateYMotionValue,
        }}
      >
        <Box minWidth="100vw">
          <Box
            as="section"
            maxWidth={{ _: "425px", md: "1024px" }}
            width={{ _: "100vw", md: "75vw" }}
            minHeight="calc(100vh - 64px)"
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
            {React.Children.map(children, (child) => {
              React.isValidElement(child) &&
                React.cloneElement(child, { componentScrollProgress });
            })}
          </Box>
        </Box>
      </MotionWrapper>
      <Box height={componentHeight} id={placeholderId}></Box>
    </>
  );
};

export default CommonSection;
