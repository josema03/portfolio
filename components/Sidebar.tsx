import { motion, useAnimation, Variants } from "framer-motion";
import React, { useContext, useEffect } from "react";
import { Box } from "rebass/styled-components";
import { LayoutState } from "../pages";
import SidebarOption from "./SidebarOption";

export interface SidebarProps {
  options: { label: string }[];
  setElementToScrollTo: React.Dispatch<React.SetStateAction<string>>;
}

const optionsVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
    x: "100%",
    transition: {
      duration: 0,
    },
  },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      y: {
        delay: custom.index * 0.15,
      },
      opacity: {
        delay: custom.index * 0.15,
      },
      x: {
        duration: 0,
      },
    },
  }),
};

const Sidebar = ({ options, setElementToScrollTo }: SidebarProps) => {
  const { setIsMenuOpen, sidebarWidth, sidebarTranslationX } =
    useContext(LayoutState);
  const animateOptions = useAnimation();

  useEffect(() => {
    const subscription = sidebarTranslationX.onChange(() => {
      const curr = sidebarTranslationX.get();
      const prev = sidebarTranslationX.getPrevious();
      prev < 0 && curr >= 0 && animateOptions.start("hidden");
      prev > sidebarWidth * 0.8 &&
        curr < sidebarWidth * 0.8 &&
        animateOptions.start("visible");
    });
    return () => subscription();
  });

  const scrollToElement = (id: string) => {
    setElementToScrollTo(id);
    setIsMenuOpen(false);
  };

  return (
    <Box mt={{ _: 4, md: 5 }}>
      <Box as="ul" pl={{ _: 0 }}>
        {options.map((option, index) => {
          const id = option.label
            .toLowerCase()
            .split(" ")
            .concat("placeholder")
            .join("-");
          return (
            <motion.li
              custom={{ index }}
              key={`${index}-${option.label}`}
              variants={optionsVariants}
              initial="hidden"
              animate={animateOptions}
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
