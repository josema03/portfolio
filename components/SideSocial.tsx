import { motion, Variants } from "framer-motion";
import React from "react";
import { Box, Flex } from "rebass";
import Link from "next/link";
import styled from "styled-components";
import GithubIcon from "../social-icons/GithubIcon";
import LinkedInIcon from "../social-icons/LinkedInIcon";
import VerticalLine from "./VerticalLine";

interface SideSocialProps {
  linkedin?: string;
  github?: string;
}

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

const SideSocial = ({ linkedin, github }: SideSocialProps) => {
  return (
    <Flex flexDirection="column">
      {github && (
        <IconWrapper>
          <Box my="1" width="100%">
            <Link href={github}>
              <a target="_blank">
                <GithubIcon />
              </a>
            </Link>
          </Box>
        </IconWrapper>
      )}
      {linkedin && (
        <IconWrapper>
          <Box my="1" width="100%">
            <Link href={linkedin}>
              <a target="_blank">
                <LinkedInIcon />
              </a>
            </Link>
          </Box>
        </IconWrapper>
      )}
      <VerticalLine />
    </Flex>
  );
};

export default SideSocial;
