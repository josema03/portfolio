import { motion, Variants } from "framer-motion";
import React from "react";
import { Box, Flex } from "rebass";
import styled from "styled-components";
import GithubIcon from "../social-icons/GithubIcon";
import LinkedInIcon from "../social-icons/LinkedInIcon";
import VerticalLine from "./VerticalLine";

const iconVariants: Variants = {
  onHover: (custom) => ({
    y: -5,
    color: custom.theme.colors.textAccent.main,
  }),
};

const IconWrapper = styled(motion.div).attrs(({ theme }) => ({
  whileHover: "onHover",
  variants: iconVariants,
  custom: { theme },
}))`
  width: 30px;
  cursor: pointer;
  color: white;
`;

const SideSocial = () => {
  return (
    <Flex flexDirection="column">
      <IconWrapper>
        <Box my="1" width="100%">
          <GithubIcon />
        </Box>
      </IconWrapper>
      <IconWrapper>
        <Box my="1" width="100%">
          <LinkedInIcon />
        </Box>
      </IconWrapper>
      <VerticalLine />
    </Flex>
  );
};

export default SideSocial;
