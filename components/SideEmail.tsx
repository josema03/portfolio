import { motion, Variants } from "framer-motion";
import Link from "next/link";
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

const SideEmail = ({ email }: { email?: string }) => {
  return (
    <Flex flexDirection="column">
      {email && (
        <WriteFromTopToBottom my="2">
          <EmailWrapper>
            <Link href={`mailto:${email}`}>
              <Typography>{email}</Typography>
            </Link>
          </EmailWrapper>
        </WriteFromTopToBottom>
      )}
      <VerticalLine />
    </Flex>
  );
};

export default SideEmail;
