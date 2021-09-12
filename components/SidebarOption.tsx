import { motion, useAnimation, Variants } from "framer-motion";
import React from "react";
import { Box, Flex } from "rebass";
import styled from "styled-components";
import Typography from "./Typography";

interface SideOptionProps {
  option: { label: string };
  index: number;
  id: string;
  scrollToElement: (id: string) => void;
}

const typographyVariants: Variants = {
  initial: {
    x: "0",
  },
  onHover: {
    x: "-25px",
  },
};

const TypographyPointer = styled(Typography)`
  cursor: pointer;
`;

const SidebarOption: React.FunctionComponent<SideOptionProps> = ({
  option,
  index,
  id,
  scrollToElement,
}) => {
  const animation = useAnimation();

  return (
    <Flex my={{ _: 2 }} onClick={() => scrollToElement(id)} width="100%">
      <TypographyPointer
        renderAs={motion.div}
        display="flex"
        fontColor="textAccent"
        fontWeight="700"
        width={{ _: "2rem", md: "3rem" }}
        fontSize={{ _: "2rem", md: "3rem" }}
        variants={typographyVariants}
        animate={animation}
        onMouseEnter={() => animation.start("onHover")}
        onMouseLeave={() => animation.start("initial")}
      >
        <Box flex="1" textAlign="center">
          {index + 1}
        </Box>
        <Box>.</Box>
      </TypographyPointer>
      <TypographyPointer
        renderAs={motion.div}
        fontColor="textPrimary"
        fontWeight="700"
        fontSize={{ _: "2rem", md: "3rem" }}
        variants={typographyVariants}
        animate={animation}
        onMouseEnter={() => animation.start("onHover")}
        onMouseLeave={() => animation.start("initial")}
      >
        &nbsp;{option.label}
      </TypographyPointer>
    </Flex>
  );
};

export default SidebarOption;
