import { motion, MotionValue } from "framer-motion";
import React, { createContext, useContext } from "react";
import { Box, Flex } from "rebass/styled-components";
import styled from "styled-components";
import { LayoutState } from "../pages";
import Typography from "./Typography";

interface CommonSectionContext {
  progress: MotionValue;
  parentId: string;
}

export const CommonSectionContext = createContext<CommonSectionContext>({
  progress: new MotionValue(0),
  parentId: "",
});

interface CommonSectionProps {
  index: number;
  title: string;
}

const RelativeFlex = styled(Flex)`
  position: relative;
`;

const CommonSection = ({
  index,
  title,
  children,
}: React.PropsWithChildren<CommonSectionProps>) => {
  const { contentTranslationX } = useContext(LayoutState);
  const componentId = title.toLowerCase().split(" ").join("-");

  return (
    <>
      <motion.div
        style={{
          translateX: contentTranslationX,
          paddingTop: "64px",
        }}
        id={componentId}
      >
        <Box width="100vw">
          <Flex
            as="section"
            flexDirection="column"
            maxWidth={{ _: "425px", md: "1024px" }}
            width={{ _: "100vw", md: "75vw" }}
            height="calc(100vh - 64px)"
            maxHeight="calc(100vh - 64px)"
            mx="auto"
            p={{ _: 4, md: 5 }}
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
            <RelativeFlex
              flex="1"
              flexDirection="column"
              maxHeight="100%"
              overflow="visible"
              py={{ _: 4 }}
            >
              {children}
            </RelativeFlex>
          </Flex>
        </Box>
      </motion.div>
    </>
  );
};

export default CommonSection;
