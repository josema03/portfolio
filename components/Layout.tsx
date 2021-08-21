import { AnimatePresence, motion, useAnimation, Variants } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { Box, Flex } from "rebass/styled-components";
import styled, { css, ThemeContext } from "styled-components";
import Navbar from "./Navbar";
import Sidebar, { SidebarProps } from "./Sidebar";

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

const contentVariants: Variants = {
  open: {
    x: `-${sidebarWidthSm}px`,
    opacity: 0.75,
  },
  openDesktop: {
    x: `-${sidebarWidthLg}px`,
    opacity: 0.75,
  },
  close: {
    x: 0,
    opacity: 1,
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

const Layout = ({
  children,
  options,
}: React.PropsWithChildren<LayoutProps>) => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const animateContent = useAnimation();
  const isServerSide = typeof window === "undefined";
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const animateLayout = async () => {
      if (isMenuOpen) {
        const breakpoint =
          typeof theme.breakpoints.md === "string"
            ? Number(theme.breakpoints.md.split("px")[0])
            : theme.breakpoints.md;
        const isLowerThanMd = breakpoint
          ? window.innerWidth < breakpoint
          : undefined;
        await animateContent.start(isLowerThanMd ? "open" : "openDesktop");
      } else {
        animateContent.start("close");
      }
    };
    if (!isServerSide) {
      window.addEventListener("resize", animateLayout);
      animateLayout();
    }
    return () => {
      if (!isServerSide) {
        window.removeEventListener("resize", animateLayout);
      }
    };
  }, [isMenuOpen, animateContent, isServerSide, theme.breakpoints]);

  return (
    <>
      <Navbar isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
      <Flex
        maxWidth="100vw"
        minHeight="calc(100vh - 64px)"
        mt={{ _: "64px" }}
        overflowX="hidden"
        backgroundColor={theme.colors.background.main}
      >
        <motion.div
          variants={contentVariants}
          initial={false}
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
