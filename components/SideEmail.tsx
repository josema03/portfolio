import { motion, Variants } from "framer-motion";
import React from "react";
import { Box, Flex } from "rebass";
import styled from "styled-components";
import Typography from "./Typography";
import VerticalLine from "./VerticalLine";

const emailVariants: Variants = {
  onHover: (custom) => ({
    y: -5,
    color: custom.theme.colors.textAccent.main,
  }),
};

const EmailWrapper = styled(motion.div).attrs(({ theme }) => ({
  whileHover: "onHover",
  variants: emailVariants,
  custom: { theme },
}))`
  cursor: pointer;
  color: white;
`;

const WriteFromTopToBottom = styled(Box)`
  writing-mode: vertical-lr;
`;

const SideEmail = () => {
  return (
    <Flex flexDirection="column">
      <WriteFromTopToBottom my="2">
        <EmailWrapper>
          <Typography>jose.marin1997@gmail.com</Typography>
        </EmailWrapper>
      </WriteFromTopToBottom>
      <VerticalLine />
    </Flex>
  );
};

export default SideEmail;
