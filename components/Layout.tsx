import {
  AnimatePresence,
  ForwardRefComponent,
  HTMLMotionProps,
  motion,
  useViewportScroll,
  Variants,
} from "framer-motion";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Flex } from "rebass/styled-components";
import styled, { css, ThemeContext } from "styled-components";
import { LayoutState } from "../pages";
import useAnimationToggle from "../utils/useAnimationToggle";
import useBreakpoints from "../utils/useBreakpoint";
import Navbar from "./Navbar";
import Sidebar, { SidebarProps } from "./Sidebar";
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

const NavbarWrapper = styled(motion.nav)`
  position: fixed;
  z-index: 10;
  top: 0px;
  background: transparent;
  width: 100vw;
  min-width: 100vw;
  height: 64px;
  opacity: 1;
`;

const SideContentWrapper = styled<
  ForwardRefComponent<
    HTMLDivElement,
    HTMLMotionProps<"div"> & { side: "left" | "right" }
  >
>(motion.div)`
  position: fixed;
  top: auto;
  right: ${({ side }) => (side === "right" ? "5vw" : "auto")};
  bottom: 0px;
  left: ${({ side }) => (side === "left" ? "5vw" : "auto")};
  background-color: transparent;
  z-index: 10;
`;

const navbarWrapperVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.05,
    },
  },
};

const sideContentVariants: Variants = {
  hidden: {
    y: "100%",
    transition: {
      duration: 0.05,
    },
  },
  visible: {
    y: "0px",
    transition: {
      duration: 0.3,
    },
  },
};

const Layout = ({
  children,
  options,
  social,
  email,
}: React.PropsWithChildren<LayoutProps>) => {
  const { isMenuOpen, sidebarTranslationX, setSidebarWidth } =
    useContext(LayoutState);
  const [isNavbarVisible, setIsNavbarVisible] = useState<boolean>(true);
  const [canHideNavbar, setCanHideNavbar] = useState<boolean>(false);
  const [canShowSideContent, setCanShowSideContent] = useState<boolean>(false);
  const [elementToScrollTo, setElementToScrollTo] = useState<string>("");
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const { isBelowBreakpoint } = useBreakpoints();
  const { scrollY } = useViewportScroll();
  const animateNavbarWrapper = useAnimationToggle(isNavbarVisible, {
    initial: "hidden",
    animate: "visible",
  });
  const isServerSide = typeof window === "undefined";
  const theme = useContext(ThemeContext);

  const showNavbar = () => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    !isNavbarVisible && setIsNavbarVisible(true);
  };

  const hideNavbar = (timeout: number) => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    const isHeroSection = scrollY.get() < window.innerHeight - 64 * 2;
    if (isNavbarVisible && canHideNavbar && !isHeroSection) {
      timeoutRef.current = setTimeout(() => setIsNavbarVisible(false), timeout);
    }
  };

  const showSideContent = () => {
    const current = scrollY.get();
    if (current > (window.innerHeight * 3) / 5) {
      setCanShowSideContent(true);
    }
    if (current < (window.innerHeight * 3) / 5) {
      setCanShowSideContent(false);
    }
  };

  const scrollToElement = () => {
    if (elementToScrollTo !== "") {
      document
        .getElementById(elementToScrollTo)
        ?.scrollIntoView({ behavior: "smooth" });
      setElementToScrollTo("");
    }
  };

  useEffect(() => {
    const animateLayout = async () => {
      if (isMenuOpen && isBelowBreakpoint) {
        const { md: isBelowMd } = isBelowBreakpoint;
        setCanHideNavbar(false);
        setSidebarWidth(isBelowMd ? -sidebarWidthSm : -sidebarWidthLg);
        sidebarTranslationX.set(isBelowMd ? -sidebarWidthSm : -sidebarWidthLg);
      } else {
        setCanHideNavbar(true);
        sidebarTranslationX.set(0);
        scrollToElement();
      }
    };
    if (!isServerSide) {
      window.addEventListener("resize", animateLayout);
      animateLayout();
    }
    return () => {
      !isServerSide && window.removeEventListener("resize", animateLayout);
    };
  }, [isMenuOpen, isServerSide, isBelowBreakpoint]);

  useEffect(() => {
    const cancelScrollYSubscription = scrollY.onChange(() => {
      const current = scrollY.get();
      const prev = scrollY.getPrevious();
      if (current < prev) {
        showNavbar();
        hideNavbar(2000);
      }
      if (current > prev) {
        hideNavbar(0);
      }
      showSideContent();
    });
    return () => cancelScrollYSubscription();
  }, [isNavbarVisible, canHideNavbar]);

  useEffect(() => {
    showSideContent();
  }, []);

  return (
    <>
      <NavbarWrapper
        variants={navbarWrapperVariants}
        initial="hidden"
        animate={animateNavbarWrapper}
        onMouseEnter={showNavbar}
        onClick={showNavbar}
        onMouseLeave={() => hideNavbar(1000)}
      >
        <Navbar
          isNavbarVisible={isNavbarVisible}
          setIsNavbarVisible={setIsNavbarVisible}
        />
      </NavbarWrapper>
      <Box overflowX="hidden">
        <motion.div style={{ translateX: sidebarTranslationX }}>
          <Flex
            maxWidth="100vw"
            minHeight="calc(100vh - 64px)"
            mt={{ _: "64px" }}
            overflowX="hidden"
            backgroundColor={theme.colors.background.main}
            flexDirection="column"
          >
            {children}
          </Flex>
        </motion.div>
      </Box>
      <SidebarWrapper style={{ translateX: sidebarTranslationX }}>
        <Sidebar
          options={options}
          setElementToScrollTo={setElementToScrollTo}
        />
      </SidebarWrapper>
      <AnimatePresence>
        {!isBelowBreakpoint?.md && !isMenuOpen && canShowSideContent && (
          <SideContentWrapper
            side="left"
            variants={sideContentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <SideSocial {...social} />
          </SideContentWrapper>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isBelowBreakpoint?.md && !isMenuOpen && canShowSideContent && (
          <SideContentWrapper
            side="right"
            variants={sideContentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <SideEmail {...email} />
          </SideContentWrapper>
        )}
      </AnimatePresence>
    </>
  );
};

export default Layout;
