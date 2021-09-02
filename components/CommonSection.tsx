import React from "react";
import { Box, Flex } from "rebass/styled-components";
import styled from "styled-components";
import Typography from "./Typography";

interface CommonSectionProps {
  index: number;
  title: string;
}

const CommonSection = ({
  index,
  title,
  children,
}: React.PropsWithChildren<CommonSectionProps>) => {
  return (
    <Box
      as="section"
      maxWidth={{ _: "425px", md: "1024px" }}
      width={{ _: "100vw", md: "75vw" }}
      minHeight="100vh"
      mx="auto"
      px={{ _: 4, md: 5 }}
      py={{ _: 5, md: 6 }}
      id={title.toLowerCase().split(" ").join("-")}
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
  );
};

export default CommonSection;
