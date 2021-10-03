import { motion, useViewportScroll } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { Box } from "rebass/styled-components";
import styled, { css } from "styled-components";
import { LayoutState } from "../pages";
import useBreakpoints from "../utils/useBreakpoint";
import Navbar from "./Navbar";
import Sidebar, { SidebarProps } from "./Sidebar";
import SideContentWrapper from "./SideContentWrapper";
import SideEmail from "./SideEmail";
import SideSocial from "./SideSocial";

interface LayoutProps {
  options: SidebarProps["options"];
  email?: { email: string };
  social?: { linkedin: string; github: string };
}

const sidebarWidthSm = 300;
const sidebarWidthLg = 600;

const SidebarWrapper = styled(motion.div)`
  position: fixed;
  top: 64px;
  left: 100vw;
  width: ${sidebarWidthSm}px;
  z-index: 10;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.md}) {
      width: ${sidebarWidthLg}px;
    }
  `};
`;

const Layout = ({
  children,
  options,
  social,
  email,
}: React.PropsWithChildren<LayoutProps>) => {
  const {
    isMenuOpen,
    sidebarTranslationX,
    contentTranslationX,
    setSidebarWidth,
    elementToScrollTo,
    setElementToScrollTo,
  } = useContext(LayoutState);

  const { isBelowBreakpoint } = useBreakpoints();
  const { scrollY } = useViewportScroll();
  const isServerSide = typeof window === "undefined";

  const scrollToElement = () => {
    if (elementToScrollTo !== "") {
      const node =
        elementToScrollTo === "home"
          ? document.getElementsByTagName("body")[0]
          : document.getElementById(elementToScrollTo);

      node?.scrollIntoView({ behavior: "smooth" });
      setElementToScrollTo("");
    }
  };

  useEffect(() => {
    const animateLayout = async () => {
      if (isMenuOpen && isBelowBreakpoint) {
        const { md: isBelowMd } = isBelowBreakpoint;
        setSidebarWidth(isBelowMd ? -sidebarWidthSm : -sidebarWidthLg);
        sidebarTranslationX.set(isBelowMd ? -sidebarWidthSm : -sidebarWidthLg);
      } else {
        sidebarTranslationX.set(0);
      }
      scrollToElement();
    };
    if (!isServerSide) {
      window.addEventListener("resize", animateLayout);
      animateLayout();
    }
    return () => {
      !isServerSide && window.removeEventListener("resize", animateLayout);
    };
  }, [isMenuOpen, isServerSide, isBelowBreakpoint, elementToScrollTo]);

  return (
    <>
      <Navbar />
      <Box overflowX="hidden">
        <motion.div style={{ translateX: contentTranslationX }}>
          {children}
        </motion.div>
      </Box>
      <SidebarWrapper style={{ translateX: sidebarTranslationX }}>
        <Sidebar options={options} />
      </SidebarWrapper>
      <SideContentWrapper side="left">
        <SideSocial {...social} />
      </SideContentWrapper>
      <SideContentWrapper side="right">
        <SideEmail {...email} />
      </SideContentWrapper>
    </>
  );
};

export default Layout;
