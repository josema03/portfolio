import React, { useEffect } from "react";
import styled from "styled-components";
import { Box } from "rebass/styled-components";
import HamburgerCloseButton from "./HamburgerCloseButton";

interface NavbarProps {
  isMenuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarComponent = styled.nav`
  display: flex;
  position: fixed;
  top: 0px;
  background: ${({ theme }) => theme.colors.backgroundColor.main};
  color: ${({ theme }) => theme.colors.backgroundColor.textContrast};
  width: 100vw;
  min-width: 100vw;
  height: 64px;
  align-items: center;
  justify-content: space-between;

  &::after {
    content: "";
    position: absolute;
    height: 4px;
    width: 100vw;
    bottom: -1px;
    background: ${({ theme }) =>
      `linear-gradient(to right, ${theme.colors.primaryColor.light}, ${theme.colors.primaryColor.dark})`};
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
        Holis
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
