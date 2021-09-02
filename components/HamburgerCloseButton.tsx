import { motion, Variants } from "framer-motion";
import React from "react";
import styled from "styled-components";
import useAnimationToggle from "../utils/useAnimationToggle";

interface HamburgerCloseButton {
  isMenuOpen: boolean;
}

const HamburgerCloseIcon = styled.div`
  svg {
    display: block;
    width: 50px;
    height: 50px;
  }

  path,
  line {
    fill: none;
    stroke: white;
    stroke-width: 6px;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const pathVariants: Variants = {
  hamburgerIcon: {
    strokeDasharray: "50px 600px",
    strokeDashoffset: "0px",
    transition: {
      ease: "easeOut",
      duration: 0.4,
    },
  },
  closeIcon: {
    strokeDasharray: "70.71px 600px",
    strokeDashoffset: "-392px",
    transition: {
      ease: "easeOut",
      duration: 0.4,
    },
  },
};

const middleLineVariants: Variants = {
  hamburgerIcon: { strokeDasharray: "50px 60px", strokeDashoffset: "0px" },
  closeIcon: { strokeDasharray: "50px 60px", strokeDashoffset: "51px" },
};

const HamburgerCloseButton = ({ isMenuOpen }: HamburgerCloseButton) => {
  const animateIcon = useAnimationToggle(isMenuOpen, {
    initial: "hamburgerIcon",
    animate: "closeIcon",
  });

  return (
    <HamburgerCloseIcon>
      <svg viewBox="0 0 120 120">
        <g>
          <motion.path
            d="M35,35h50c14.1,0,50.6,13,20.5,53.5s-121.9,21.6-94.4-40.3S111.6,8.4,85,35L35,85"
            variants={pathVariants}
            initial="hamburgerIcon"
            animate={animateIcon}
          />
          <motion.path
            d="M35,85h50c14.1,0,50.6-13,20.5-53.5S-16.4,9.9,11.1,71.8S111.6,111.6,85,85L35,35"
            variants={pathVariants}
            initial="hamburgerIcon"
            animate={animateIcon}
          />
          <motion.line
            x1="35"
            y1="60"
            x2="85"
            y2="60"
            variants={middleLineVariants}
            initial="hamburgerIcon"
            animate={animateIcon}
          />
        </g>
      </svg>
    </HamburgerCloseIcon>
  );
};

export default HamburgerCloseButton;
