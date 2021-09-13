import {
  AnimatePresence,
  ForwardRefComponent,
  HTMLMotionProps,
  motion,
  useAnimation,
  useViewportScroll,
  Variants,
} from "framer-motion";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Flex } from "rebass/styled-components";
import styled, { css, ThemeContext } from "styled-components";
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
  min-width: ${sidebarWidthSm}px;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.md}) {
      min-width: ${sidebarWidthLg}px;
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
`;

const contentVariants: Variants = {
  open: {
    x: `-${sidebarWidthSm}px`,
    opacity: 0.2,
    transition: {
      opacity: {
        duration: 0.1,
      },
    },
  },
  openDesktop: {
    x: `-${sidebarWidthLg}px`,
    opacity: 0.2,
    transition: {
      opacity: {
        duration: 0.1,
      },
    },
  },
  close: {
    x: 0,
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const sidebarVariants: Variants = {
  open: {
    x: "-100%",
    transition: {
      when: "beforeChildren",
      staggerChildren: 3,
    },
  },
  close: {
    x: "100%",
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

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
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState<boolean>(true);
  const [canHideNavbar, setCanHideNavbar] = useState<boolean>(false);
  const [canShowSideContent, setCanShowSideContent] = useState<boolean>(false);
  const [elementToScrollTo, setElementToScrollTo] = useState<string>("");
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const { isBelowBreakpoint } = useBreakpoints();
  const { scrollY } = useViewportScroll();
  const animateContent = useAnimation();
  const animateSidebar = useAnimation();
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
        animateSidebar.start("open");
        await animateContent.start(isBelowMd ? "open" : "openDesktop");
      } else {
        setCanHideNavbar(true);
        animateSidebar.start("close");
        await animateContent.start("close");
      }
    };
    if (!isServerSide) {
      window.addEventListener("resize", animateLayout);
      animateLayout();
    }
    return () => {
      !isServerSide && window.removeEventListener("resize", animateLayout);
    };
  }, [isMenuOpen, animateContent, isServerSide, isBelowBreakpoint]);

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
          isMenuOpen={isMenuOpen}
          setMenuOpen={setMenuOpen}
          isNavbarVisible={isNavbarVisible}
          setIsNavbarVisible={setIsNavbarVisible}
        />
      </NavbarWrapper>
      <Box overflowX="hidden">
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate={animateContent}
        >
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
      <SidebarWrapper
        variants={sidebarVariants}
        initial="close"
        animate={animateSidebar}
      >
        <Sidebar
          options={options}
          setElementToScrollTo={setElementToScrollTo}
          setMenuOpen={setMenuOpen}
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
