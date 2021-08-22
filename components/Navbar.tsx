import { animate, motion, Variants } from "framer-motion";
import React from "react";
import { Box, Flex } from "rebass/styled-components";
import styled from "styled-components";
import HamburgerCloseButton from "./HamburgerCloseButton";
import Logo from "./Logo";

interface NavbarProps {
  isMenuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarComponent = styled(Flex)`
  background: ${({ theme }) => theme.colors.background.main};
  color: ${({ theme }) => theme.colors.background.textContrast};
  opacity: 1;

  &::after {
    content: "";
    position: absolute;
    height: 1.5px;
    width: 100vw;
    bottom: -1px;
    background: ${({ theme }) =>
      `linear-gradient(to right, ${theme.colors.primary.light}, ${theme.colors.primary.dark})`};
    z-index: 10;
  }

  div {
    cursor: pointer;
  }
`;

const MotionNavbar = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const navbarVariants: Variants = {
  hidden: {
    y: "-100px",
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeIn",
    },
  },
  visible: {
    y: "0px",
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeIn",
    },
  },
};

const Navbar = ({ isMenuOpen, setMenuOpen }: NavbarProps) => {
  return (
    <MotionNavbar variants={navbarVariants} initial="hidden" animate="visible">
      <NavbarComponent
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        height="100%"
      >
        <Box mx={{ _: 4, md: 6 }} id="logo-and-title">
          <Logo />
        </Box>
        <Box
          mx={{ _: 4, md: 6 }}
          id="hamburger-close-icon"
          onClick={() => setMenuOpen(!isMenuOpen)}
        >
          <HamburgerCloseButton isMenuOpen={isMenuOpen} />
        </Box>
      </NavbarComponent>
    </MotionNavbar>
  );
};

export default Navbar;
