import { motion, useTransform, useViewportScroll } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { Box, Flex } from "rebass/styled-components";
import styled from "styled-components";
import Typography from "./Typography";

interface CommonSectionProps {
  index: number;
  title: string;
}

const MotionWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  background-color: red;
`;

const CommonSection = ({
  index,
  title,
  children,
}: React.PropsWithChildren<CommonSectionProps>) => {
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

  const getComponentHeight = useCallback((node) => {
    const { scrollHeight } = node;
    setComponentHeight(scrollHeight);
  }, []);

  const setMotionTransformValues = useCallback((node: HTMLElement) => {
    if (motionRange.input.length > 2) return;
    const { offsetTop, scrollHeight } = node;
    setMotionRange({
      input: [
        0,
        offsetTop,
        offsetTop + 200,
        offsetTop + scrollHeight - 200,
        offsetTop + scrollHeight,
      ],
      output: { opacity: [0, 1, 1, 1, 0], scale: [0, 0, 1, 1, 0] },
    });
  }, []);

  useEffect(() => {
    const falseElement = document.getElementById(
      title.toLowerCase().split(" ").join("-").concat("false")
    );
    const observer = new MutationObserver((_, observer) => {
      falseElement && setMotionTransformValues(falseElement);
    });
    observer.observe(falseElement!, {
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
            id={title.toLowerCase().split(" ").join("-")}
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
      <Box
        height={componentHeight}
        id={title.toLowerCase().split(" ").join("-").concat("false")}
      ></Box>
    </>
  );
};

export default CommonSection;
