import { motion, Variants } from "framer-motion";
import React, { useContext } from "react";
import { Box, Flex } from "rebass/styled-components";
import styled from "styled-components";
import { LayoutState } from "../pages";
import HamburgerCloseButton from "./HamburgerCloseButton";
import Logo from "./Logo";

const NavbarComponent = styled(Flex)`
  background: ${({ theme }) => theme.colors.background.main};
  color: ${({ theme }) => theme.colors.background.textContrast};

  &::after {
    content: "";
    position: absolute;
    height: 0.5px;
    width: 100vw;
    bottom: 0;
    background: ${({ theme }) =>
      `linear-gradient(to right, ${theme.colors.primary.light}, ${theme.colors.primary.dark})`};
    z-index: 15;
  }

  div {
    cursor: pointer;
  }
`;

const MotionNavbar = styled(motion.div)`
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 10;
  top: 0px;
  background: transparent;
  width: 100vw;
  min-width: 100vw;
  height: 64px;
`;

const navbarVariants: Variants = {
  hidden: {
    y: "-100%",
    // opacity: 1,
    // transition: {
    //   duration: 0.25,
    //   ease: "easeIn",
    // },
  },
  visible: {
    y: "0%",
    // opacity: 1,
    transition: {
      duration: 0.75,
      ease: "easeIn",
    },
  },
};

// const useNavbar = () => {
//   const { isMenuOpen, sidebarTranslationX } = useContext(LayoutState);
//   const { scrollY } = useViewportScroll();
//   const [isNavbarVisible, setIsNavbarVisible] = useState<boolean>(true);
//   const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

//   const showNavbar = () => {
//     timeoutRef.current && clearTimeout(timeoutRef.current);
//     !isNavbarVisible && setIsNavbarVisible(true);
//   };

//   const hideNavbar = (timeout: number) => {
//     timeoutRef.current && clearTimeout(timeoutRef.current);
//     const isHeroSection = scrollY.get() < window.innerHeight - 64 * 2;
//     if (isNavbarVisible && !isMenuOpen && !isHeroSection) {
//       timeoutRef.current = setTimeout(() => {
//         sidebarTranslationX.get() === 0 && setIsNavbarVisible(false), timeout;
//       }, timeout);
//     }
//   };

//   useEffect(() => {
//     const cancelScrollYSubscription = scrollY.onChange(() => {
//       const current = scrollY.get();
//       const prev = scrollY.getPrevious();
//       if (current < prev) {
//         showNavbar();
//         hideNavbar(2000);
//       }
//       if (current > prev) {
//         hideNavbar(0);
//       }
//     });
//     return () => cancelScrollYSubscription();
//   }, [isNavbarVisible, !isMenuOpen]);

//   return { isNavbarVisible };
// };

const Navbar = () => {
  const { isMenuOpen, setIsMenuOpen, setElementToScrollTo } =
    useContext(LayoutState);
  // const { isNavbarVisible } = useNavbar();
  // const animateNavbar = useAnimationToggle(isNavbarVisible, {
  //   initial: "hidden",
  //   animate: "visible",
  // });

  const scrollToTop = () => {
    setElementToScrollTo("home");
    setIsMenuOpen(false);
  };

  return (
    <MotionNavbar variants={navbarVariants} initial="hidden" animate="visible">
      <NavbarComponent
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        height="100%"
      >
        <Box mx={{ _: 4, md: 5 }} id="logo-and-title" onClick={scrollToTop}>
          <Logo />
        </Box>
        <Box
          mx={{ _: 4, md: 6 }}
          id="hamburger-close-icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <HamburgerCloseButton />
        </Box>
      </NavbarComponent>
    </MotionNavbar>
  );
};

export default Navbar;
