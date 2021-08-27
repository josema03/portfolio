import {
  AnimatePresence,
  motion,
  useAnimation,
  useViewportScroll,
  Variants,
} from "framer-motion";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Flex } from "rebass/styled-components";
import styled, { css, ThemeContext } from "styled-components";
import useAnimationToggle from "../utils/useAnimationToggle";
import useBreakpoints from "../utils/useBreakpoint";
import Navbar from "./Navbar";
import Sidebar, { SidebarProps } from "./Sidebar";
import SideSocial from "./SideSocial";
import Typography from "./Typography";

interface LayoutProps {
  options: SidebarProps["options"];
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
  },
};

const Layout = ({
  children,
  options,
}: React.PropsWithChildren<LayoutProps>) => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState<boolean>(true);
  const [canHideNavbar, setCanHideNavbar] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const { isBelowBreakpoint } = useBreakpoints();
  const { scrollY } = useViewportScroll();
  const animateContent = useAnimation();
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

  useEffect(() => {
    const animateLayout = async () => {
      if (isMenuOpen && isBelowBreakpoint) {
        const { md: isBelowMd } = isBelowBreakpoint;
        setCanHideNavbar(false);
        await animateContent.start(isBelowMd ? "open" : "openDesktop");
      } else {
        setCanHideNavbar(true);
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
      } else if (current > prev) {
        hideNavbar(0);
      }
    });
    return () => cancelScrollYSubscription();
  }, [isNavbarVisible, canHideNavbar]);

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
      <Flex
        maxWidth="100vw"
        minHeight="calc(100vh - 64px)"
        mt={{ _: "64px" }}
        overflowX="hidden"
        backgroundColor={theme.colors.background.main}
      >
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate={animateContent}
        >
          <Box maxWidth="100vw" minWidth="100vw">
            {children}
          </Box>
        </motion.div>
        <AnimatePresence>
          {isMenuOpen && (
            <SidebarWrapper
              variants={sidebarVariants}
              initial="close"
              animate="open"
              exit="close"
            >
              <Sidebar options={options} />
            </SidebarWrapper>
          )}
        </AnimatePresence>
      </Flex>
    </>
  );
};

export default Layout;
