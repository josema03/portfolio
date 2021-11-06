import { motion, MotionValue } from "framer-motion";
import React, { createContext, useContext } from "react";
import { Box, Flex } from "rebass/styled-components";
import { LayoutState } from "../pages";
import usePositionObserver from "../utils/usePositionObserver";
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

const CommonSection = ({
  index,
  title,
  children,
}: React.PropsWithChildren<CommonSectionProps>) => {
  const componentId = title.toLowerCase().split(" ").join("-");
  const { contentTranslationX } = useContext(LayoutState);
  const [_componentVisibility, componentProgress, observeComponent] =
    usePositionObserver();

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
            mx="auto"
            p={{ _: 4, md: 5 }}
            ref={observeComponent}
          >
            <Flex alignItems="center">
              <Typography
                as="span"
                fontColor="textAccent"
                fontSize={{ _: 3, md: 4 }}
                fontWeight={{ _: "600", md: "700" }}
              >
                {index}.&nbsp;
              </Typography>
              <Typography
                as="h2"
                fontColor="textPrimary"
                fontSize={{ _: 3, md: 4 }}
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
                progress: componentProgress,
                parentId: componentId,
              }}
            >
              <Box py={{ _: 5 }}>{children}</Box>
            </CommonSectionContext.Provider>
          </Flex>
        </Box>
      </motion.div>
    </>
  );
};

export default CommonSection;
