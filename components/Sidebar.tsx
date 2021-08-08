import { motion, Variants } from "framer-motion";
import React from "react";
import { Box } from "rebass/styled-components";
import Typography from "./Typography";

export interface SidebarProps {
  options: { label: string }[];
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

const Sidebar = ({ options }: SidebarProps) => {
  return (
    <Box mt={{ _: 4, md: 5 }}>
      <Box as="ul" pl={{ _: 0 }}>
        {options.map((option, index) => {
          return (
            <motion.li
              custom={{ index }}
              key={`${index}-${option.label}`}
              variants={optionsVariants}
              initial="hidden"
              animate="visible"
            >
              <Typography heading fontSize={{ _: 4, md: 6 }} my={{ _: 4 }}>
                {option.label}
              </Typography>
            </motion.li>
          );
        })}
      </Box>
    </Box>
  );
};

export default Sidebar;
