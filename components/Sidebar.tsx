import {
  AnimationControls,
  motion,
  useAnimation,
  Variants,
} from "framer-motion";
import React from "react";
import { Box } from "rebass/styled-components";
import styled from "styled-components";
import SidebarOption from "./SidebarOption";
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

const Sidebar = ({
  options,
  setElementToScrollTo,
  setMenuOpen,
}: SidebarProps) => {
  const scrollToElement = (id: string) => {
    setElementToScrollTo(id);
    setMenuOpen(false);
  };

  return (
    <Box mt={{ _: 4, md: 5 }}>
      <Box as="ul" pl={{ _: 0 }}>
        {options.map((option, index) => {
          const id = option.label.toLowerCase().split(" ").join("-");
          return (
            <motion.li
              custom={{ index }}
              key={`${index}-${option.label}`}
              variants={optionsVariants}
              initial="hidden"
              animate="visible"
            >
              <SidebarOption
                option={option}
                index={index}
                id={id}
                scrollToElement={scrollToElement}
              />
            </motion.li>
          );
        })}
      </Box>
    </Box>
  );
};

export default Sidebar;
