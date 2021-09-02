import {
  AnimationControls,
  motion,
  useAnimation,
  Variants
} from "framer-motion";
import React from "react";
import { Box, Flex } from "rebass/styled-components";
import styled from "styled-components";
import Typography from "./Typography";

export interface SidebarProps {
  options: { label: string }[];
  setElementToScrollTo: React.Dispatch<React.SetStateAction<string>>;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const optionsVariants: Variants = {
  hidden: (custom) => ({
    opacity: 0,
    y: "100%",
    transition: {
      delay: custom.index * 0.15,
    },
  }),
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom.index * 0.15,
    },
  }),
};

const typographyVariants: Variants = {
  initial: {
    x: "0",
  },
  onHover: {
    x: "-25px",
  },
};

const TypographyPointer = styled(Typography)`
  cursor: pointer;
`;

const Sidebar = ({
  options,
  setElementToScrollTo,
  setMenuOpen,
}: SidebarProps) => {
  const animationArray: AnimationControls[] = [];
  const scrollToElement = (id: string) => {
    setElementToScrollTo(id);
    setMenuOpen(false);
  };

  return (
    <Box mt={{ _: 4, md: 5 }}>
      <Box as="ul" pl={{ _: 0 }}>
        {options.map((option, index) => {
          const id = option.label.toLowerCase().split(" ").join("-");
          animationArray.push(useAnimation());
          return (
            <motion.li
              custom={{ index }}
              key={`${index}-${option.label}`}
              variants={optionsVariants}
              initial="hidden"
              animate="visible"
            >
              <Flex
                my={{ _: 4 }}
                onClick={() => scrollToElement(id)}
                width="100%"
              >
                <TypographyPointer
                  renderAs={motion.div}
                  display="flex"
                  fontColor="textAccent"
                  fontWeight="700"
                  width="50px"
                  fontSize={{ _: "2rem", md: "3rem" }}
                  variants={typographyVariants}
                  animate={animationArray[index]}
                  onMouseEnter={() => animationArray[index].start("onHover")}
                  onMouseLeave={() => animationArray[index].start("initial")}
                >
                  <Box flex="1" textAlign="center">
                    {index + 1}
                  </Box>
                  <Box>.</Box>
                </TypographyPointer>
                <TypographyPointer
                  renderAs={motion.div}
                  fontColor="textPrimary"
                  fontWeight="700"
                  fontSize={{ _: "2rem", md: "3rem" }}
                  variants={typographyVariants}
                  animate={animationArray[index]}
                  onMouseEnter={() => animationArray[index].start("onHover")}
                  onMouseLeave={() => animationArray[index].start("initial")}
                >
                  &nbsp;{option.label}
                </TypographyPointer>
              </Flex>
            </motion.li>
          );
        })}
      </Box>
    </Box>
  );
};

export default Sidebar;
