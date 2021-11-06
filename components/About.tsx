import { motion } from "framer-motion";
import { transparentize } from "polished";
import React from "react";
import { Box, Flex, Image } from "rebass/styled-components";
import styled from "styled-components";
import useBreakpoints from "../utils/useBreakpoint";
import useParallaxAnimation from "../utils/useParallaxAnimation";
import Typography from "./Typography";

const TextCardContainer = styled(motion.div)`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 65%;
    max-width: 65%;
  } ;
`;

const TextCard = styled(Box)`
  background-color: ${({ theme }) =>
    transparentize(0.925, theme.colors.background.textContrast!)};
  border-radius: 10px;
  width: 100%;
`;

const ImageContainer = styled(Flex)`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 35%;
    max-width: 35%;
  } ;
`;

const RoundedImage = styled(Image)`
  border-radius: 3rem;
`;

const ImageWrapper = styled(Box)`
  position: relative;
  border-radius: 3rem;

  ::after {
    position: absolute;
    top: auto;
    left: auto;
    right: -12.5%;
    bottom: 10%;
    content: "";
    height: 100%;
    width: 100%;
    z-index: -1;
    border-radius: 3rem;
    border: solid white 3px;
    transform-origin: bottom left;
    transition: 0.25s;
  }

  :hover {
    ::after {
      transform: scale(0.95);
    }
  }
`;

const About = () => {
  const { isBelowBreakpoint } = useBreakpoints();
  const [cardOpacity, cardY, observeCard] = useParallaxAnimation();
  const [imageOpacity, imageY, observeImage] = useParallaxAnimation();

  const content = {
    text: [
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed volutpat turpis, eu fringilla leo. Curabitur id massa molestie lectus condimentum aliquet. Vestibulum et nunc libero. In sed ipsum maximus, ornare odio in, ullamcorper ipsum. Praesent ut quam tempor elit porta convallis quis nec nisl. Praesent tristique pellentesque vehicula. Integer at blandit nunc. Sed laoreet dui quis mauris pharetra faucibus. Nullam ornare metus justo, at aliquam tellus ullamcorper at.`,
      `Nunc et pulvinar lorem. Morbi nec tempus elit. Nulla ornare lorem metus, et hendrerit libero vulputate quis. Nunc mollis massa lorem, eu gravida sem pretium ac. Nulla eget tristique nunc, et tempus libero. Nulla sollicitudin faucibus metus a elementum. Nunc a consectetur augue. Vestibulum facilisis convallis lorem, vitae pellentesque enim mollis eu. Duis in mauris diam. Fusce bibendum est a dictum semper. Sed eleifend sodales ante vitae commodo. Mauris ornare, orci ut elementum feugiat, orci magna rhoncus velit, et molestie magna tellus sodales justo. Aenean tempus congue rhoncus. Nam non interdum lectus, at eleifend sem. In ullamcorper lobortis molestie. Praesent pharetra ultrices ullamcorper. In at efficitur tortor, at suscipit ante. Nulla luctus leo quam, in dictum ante ultricies quis. Etiam venenatis tellus iaculis purus lobortis luctus.`,
    ],
  };

  return (
    <Flex flexDirection={isBelowBreakpoint?.md ? "column" : "row"}>
      <TextCardContainer
        style={{
          opacity: cardOpacity,
          translateY: cardY,
        }}
      >
        <TextCard p={{ _: 4, md: 5 }} ref={observeCard}>
          {content.text.map((paragraph, index) => (
            <Typography
              fontSize={{ _: 2 }}
              lineHeight={{ _: 2, md: 3 }}
              m={{ _: 4, md: 4 }}
              key={`about-paragraph-${index}`}
            >
              {paragraph}
            </Typography>
          ))}
        </TextCard>
      </TextCardContainer>
      <ImageContainer alignItems="center" justifyContent="center" p={{ _: 6 }}>
        <motion.div style={{ opacity: imageOpacity, y: imageY }}>
          <ImageWrapper my={{ _: 5 }} ref={observeImage}>
            <RoundedImage src="assets/potrait-placeholder.png" />
          </ImageWrapper>
        </motion.div>
      </ImageContainer>
    </Flex>
  );
};

export default About;
