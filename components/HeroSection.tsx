import { motion, Variants } from "framer-motion";
import React from "react";
import { Box, Flex, Image } from "rebass/styled-components";
import styled from "styled-components";
import Canvas from "./Cavas";
import Typography from "./Typography";

interface HeroSectionProps {
  intro: string;
  name: string;
  description: string;
}

const RelativeBox = styled(Box)`
  position: relative;
`;

const RelativeFlex = styled(Flex)`
  position: relative;
`;

const TextContainer = styled(Box)`
  z-index: 1;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(100vh - 64px);
  z-index: 0;
`;

const Faint = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  height: 100%;
  width: 100%;
  background: radial-gradient(
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.95),
    rgba(0, 0, 0, 1)
  );
`;

const AstronautFaint = styled.div`
  position: absolute;
  bottom: -7.5px;
  left: 0;
  z-index: 1;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 1)
  );
`;

const typographyVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "200px",
  },
  visible: (custon) => ({
    opacity: 1,
    y: "0",
    transition: {
      delay: custon.index * 0.15,
      duration: 0.5,
    },
  }),
};

const HeroSection = ({
  intro,
  name,
  description,
}: HeroSectionProps): JSX.Element => {
  return (
    <RelativeBox
      overflow="hidden"
      height="calc(100vh - 64px)"
      id="home"
      mt="64px"
    >
      <Background>
        <Faint />
        <Canvas />
      </Background>
      <Flex
        height="calc(100vh - 64px)"
        width="100vw"
        maxWidth="100vw"
        px={{ _: 5, md: 6 }}
        flexDirection={{ _: "column", md: "row" }}
        justifyContent={{ _: "space-between" }}
      >
        <TextContainer flex="1" pt={{ _: 5, md: 6 }}>
          <Box pt={{ _: 5, md: 6 }}>
            <motion.div
              custom={{ index: 1 }}
              variants={typographyVariants}
              initial="hidden"
              animate="visible"
            >
              <Typography
                fontColor="textAccent"
                fontWeight={{ _: "600" }}
                fontSize={{ _: 2, xl: 3 }}
                my={{ _: 1, xl: 2 }}
              >
                {intro}
              </Typography>
            </motion.div>
            <motion.div
              custom={{ index: 2 }}
              variants={typographyVariants}
              initial="hidden"
              animate="visible"
            >
              <Typography
                fontColor="textPrimary"
                fontWeight={{ _: "900" }}
                fontSize={{ _: 4, xl: 5 }}
                lineHeight={{ _: 4, xl: 5 }}
                my={{ _: 1, xl: 2 }}
              >
                {name}
              </Typography>
            </motion.div>
            <motion.div
              custom={{ index: 3 }}
              variants={typographyVariants}
              initial="hidden"
              animate="visible"
            >
              <Typography
                fontColor="textSecondary"
                fontWeight={{ _: "600" }}
                fontSize={{ _: 2, xl: 3 }}
                my={{ _: 1, xl: 2 }}
              >
                {description}
              </Typography>
            </motion.div>
          </Box>
        </TextContainer>
        <RelativeFlex ml={{ _: "-8vw", md: 0 }} alignItems="flex-end">
          <AstronautFaint />
          <motion.div
            animate={{
              y: ["10%", "5%", "10%", "7%", "10%", "4%", "8%", "4%", "10%"],
            }}
            initial={{ y: "10%" }}
            transition={{
              repeat: Infinity,
              type: "spring",
              stiffness: -100,
              duration: 10,
            }}
          >
            <Image
              src="/assets/astronaut.svg"
              width={{ _: "100vw", md: "50vw" }}
            />
          </motion.div>
        </RelativeFlex>
      </Flex>
    </RelativeBox>
  );
};

export default HeroSection;
