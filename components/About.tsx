import { motion, useTransform } from "framer-motion";
import { transparentize } from "polished";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box, Flex, Image } from "rebass/styled-components";
import styled from "styled-components";
import useBreakpoints from "../utils/useBreakpoint";
import { CommonSectionContext } from "./CommonSection";
import Typography from "./Typography";

const TextCard = styled(Box)`
  background-color: ${({ theme }) =>
    transparentize(0.925, theme.colors.background.textContrast!)};
  border-radius: 10px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 65%;
    max-width: 65%;
  } ;
`;

const TextCardContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: auto;
  left: 0;
`;

const ImageContainer = styled(Flex)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: auto;

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
  const { currentWidth, currentHeight, isBelowBreakpoint } = useBreakpoints();
  const [motionRange, setMotionRange] = useState({
    textScroll: {
      input: [0, 1],
      output: [0, 0],
    },
    textCard: {
      input: [0, 1],
      output: [0, 0],
    },
    imageWrapper: {
      input: [0, 0.5, 0.9, 1],
      output: [0, 0, 0, 0],
    },
  });
  const { progress } = useContext(CommonSectionContext);
  const textCard = useRef<HTMLElement>(null);
  const textScrollMotionValue = useTransform(
    progress,
    motionRange.textScroll.input,
    motionRange.textScroll.output
  );
  const textCardMotionValue = useTransform(
    progress,
    motionRange.textCard.input,
    motionRange.textCard.output
  );
  const imageWrapperMotionValue = useTransform(
    progress,
    motionRange.imageWrapper.input,
    motionRange.imageWrapper.output
  );

  const content = {
    text: [
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed volutpat turpis, eu fringilla leo. Curabitur id massa molestie lectus condimentum aliquet. Vestibulum et nunc libero. In sed ipsum maximus, ornare odio in, ullamcorper ipsum. Praesent ut quam tempor elit porta convallis quis nec nisl. Praesent tristique pellentesque vehicula. Integer at blandit nunc. Sed laoreet dui quis mauris pharetra faucibus. Nullam ornare metus justo, at aliquam tellus ullamcorper at.`,
      `Nunc et pulvinar lorem. Morbi nec tempus elit. Nulla ornare lorem metus, et hendrerit libero vulputate quis. Nunc mollis massa lorem, eu gravida sem pretium ac. Nulla eget tristique nunc, et tempus libero. Nulla sollicitudin faucibus metus a elementum. Nunc a consectetur augue. Vestibulum facilisis convallis lorem, vitae pellentesque enim mollis eu. Duis in mauris diam. Fusce bibendum est a dictum semper. Sed eleifend sodales ante vitae commodo. Mauris ornare, orci ut elementum feugiat, orci magna rhoncus velit, et molestie magna tellus sodales justo. Aenean tempus congue rhoncus. Nam non interdum lectus, at eleifend sem. In ullamcorper lobortis molestie. Praesent pharetra ultrices ullamcorper. In at efficitur tortor, at suscipit ante. Nulla luctus leo quam, in dictum ante ultricies quis. Etiam venenatis tellus iaculis purus lobortis luctus.`,
    ],
  };

  const calculateScrollDelta = useCallback(
    (node: HTMLElement) => {
      if (!node || !currentHeight) return;

      const { scrollHeight, clientHeight } = node;
      const { innerWidth } = window;
      const isBelowMd = innerWidth < 768;
      const delta = scrollHeight - clientHeight;
      setMotionRange({
        textScroll: {
          input: isBelowMd ? [0, 1 / 3] : [0, 1],
          output: [0, -delta],
        },
        textCard: {
          input: isBelowMd ? [1 / 3, 2 / 3] : [0, 1],
          output: innerWidth < 768 ? [0, -currentHeight] : [0, 0],
        },
        imageWrapper: {
          input: isBelowMd ? [1 / 3, 2 / 3] : [0, 1],
          output: isBelowMd ? [currentHeight, 0] : [0, 0],
        },
      });
    },
    [currentWidth, currentHeight]
  );

  useEffect(() => {
    if (!textCard.current) return;

    const observer = new ResizeObserver(() => {
      calculateScrollDelta(textCard.current!);
    });

    observer.observe(textCard.current);

    return () => observer.disconnect();
  }, [currentWidth, currentHeight, isBelowBreakpoint?.md]);

  return (
    <>
      <TextCardContainer style={{ translateY: textCardMotionValue }}>
        <TextCard
          p={{ _: 4, md: 5 }}
          maxHeight="100%"
          overflow="hidden"
          ref={textCard}
        >
          <motion.div style={{ translateY: textScrollMotionValue }}>
            {content.text.map((paragraph, index) => (
              <Typography
                fontSize={{ _: 2, md: 3 }}
                lineHeight={{ _: 2, md: 3 }}
                m={{ _: 4, md: 4 }}
                key={`about-paragraph-${index}`}
              >
                {paragraph}
              </Typography>
            ))}
          </motion.div>
        </TextCard>
      </TextCardContainer>
      <ImageContainer alignItems="center" justifyContent="center" p={{ _: 6 }}>
        <motion.div style={{ translateY: imageWrapperMotionValue }}>
          <ImageWrapper>
            <RoundedImage src="assets/potrait-placeholder.png" />
          </ImageWrapper>
        </motion.div>
      </ImageContainer>
    </>
  );
};

export default About;
