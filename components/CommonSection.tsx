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
import Typography from "./Typography";

interface CommonSectionProps {
  index: number;
  title: string;
}

const MotionWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
`;

const CommonSection = ({
  index,
  title,
  children,
}: React.PropsWithChildren<CommonSectionProps>) => {
  const { sidebarTranslationX } = useContext(LayoutState);
  const [motionRange, setMotionRange] = useState({
    input: [0, 1],
    output: {
      opacity: [0, 0],
      scale: [1, 1],
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
  const [componentHeight, setComponentHeight] = useState(0);
  const componentId = useRef(title.toLowerCase().split(" ").join("-")).current;
  const placeholderId = useRef(
    title.toLowerCase().split(" ").concat("placeholder").join("-")
  ).current;

  const getComponentHeight = useCallback((node) => {
    const { scrollHeight } = node;
    setComponentHeight(scrollHeight);
  }, []);

  const setMotionTransformValues = useCallback((node: HTMLElement) => {
    if (motionRange.input.length > 2) return;
    const { offsetTop, scrollHeight } = node;
    const { innerHeight } = window;
    setMotionRange({
      input: [
        0,
        offsetTop - innerHeight * 0.15,
        offsetTop,
        offsetTop + scrollHeight - innerHeight * 0.7,
        offsetTop + scrollHeight - innerHeight * 0.15,
      ],
      output: { opacity: [0, 1, 1, 1, 0], scale: [0, 0, 1, 1, 0] },
    });
  }, []);

  useEffect(() => {
    const placeholderElement = document.getElementById(placeholderId);
    const observer = new MutationObserver((_, observer) => {
      placeholderElement && setMotionTransformValues(placeholderElement);
    });
    observer.observe(placeholderElement!, {
      childList: false,
      characterData: false,
      attributes: true,
    });
  });

  return (
    <>
      <MotionWrapper
        style={{
          opacity: opacityMotionValue,
          scale: scaleMotionValue,
          translateX: sidebarTranslationX,
        }}
      >
        <Box minWidth="100vw">
          <Box
            as="section"
            maxWidth={{ _: "425px", md: "1024px" }}
            width={{ _: "100vw", md: "75vw" }}
            minHeight="100vh"
            mx="auto"
            px={{ _: 4, md: 5 }}
            py={{ _: 2, md: 4 }}
            id={componentId}
            ref={getComponentHeight}
          >
            <Box py={{ _: 5, md: 6 }}>
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
              {children}
            </Box>
          </Box>
        </Box>
      </MotionWrapper>
      <Box height={componentHeight} id={placeholderId}></Box>
    </>
  );
};

export default CommonSection;
