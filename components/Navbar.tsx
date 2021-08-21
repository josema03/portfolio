import React from "react";
import { Box } from "rebass/styled-components";
import styled from "styled-components";
import HamburgerCloseButton from "./HamburgerCloseButton";
import Logo from "./Logo";

interface NavbarProps {
  isMenuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarComponent = styled.nav`
  display: flex;
  position: fixed;
  z-index: 10;
  top: 0px;
  background: ${({ theme }) => theme.colors.background.main};
  color: ${({ theme }) => theme.colors.background.textContrast};
  width: 100vw;
  min-width: 100vw;
  height: 64px;
  align-items: center;
  justify-content: space-between;
  opacity: 1;

  &::after {
    content: "";
    position: absolute;
    height: 1px;
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

const Navbar = ({ isMenuOpen, setMenuOpen }: NavbarProps) => {
  return (
    <NavbarComponent>
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
  );
};

export default Navbar;
