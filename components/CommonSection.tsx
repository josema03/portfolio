import { motion, useTransform, useViewportScroll } from "framer-motion";
import React, { useCallback, useState } from "react";
import { Box, Flex } from "rebass/styled-components";
import styled from "styled-components";
import Typography from "./Typography";

interface CommonSectionProps {
  index: number;
  title: string;
}

const MotionWrapper = styled(motion.div)`
  transform-origin: center top;
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

  const setMotionTransformValues = useCallback((node: HTMLElement) => {
    const { offsetTop, scrollHeight } = node;
    setMotionRange({
      input: [
        0,
        offsetTop - scrollHeight * 0.25,
        offsetTop - scrollHeight * 0.1,
        offsetTop + scrollHeight * 0.85,
        offsetTop + scrollHeight,
      ],
      output: { opacity: [0, 0, 1, 1, 0], scale: [0, 0, 1, 1, 0] },
    });
  }, []);

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
            ref={setMotionTransformValues}
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
    </>
  );
};

export default CommonSection;
