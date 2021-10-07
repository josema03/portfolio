import { motion, useTransform } from "framer-motion";
import { transparentize } from "polished";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box } from "rebass/styled-components";
import styled from "styled-components";
import { CommonSectionContext } from "./CommonSection";
import Typography from "./Typography";

const TextCard = styled(Box)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${({ theme }) =>
    transparentize(0.925, theme.colors.background.textContrast!)};
  border-radius: 10px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 65%;
    max-width: 65%;
  } ;
`;

const About = () => {
  const [motionRange, setMotionRange] = useState({
    input: [0.1, 0.8],
    output: [0, 0],
  });
  const { progress } = useContext(CommonSectionContext);
  const textCard = useRef<HTMLElement>(null);
  const translateYMotionValue = useTransform(
    progress,
    motionRange.input,
    motionRange.output
  );

  const content = {
    text: [
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed volutpat turpis, eu fringilla leo. Curabitur id massa molestie lectus condimentum aliquet. Vestibulum et nunc libero. In sed ipsum maximus, ornare odio in, ullamcorper ipsum. Praesent ut quam tempor elit porta convallis quis nec nisl. Praesent tristique pellentesque vehicula. Integer at blandit nunc. Sed laoreet dui quis mauris pharetra faucibus. Nullam ornare metus justo, at aliquam tellus ullamcorper at.`,
      `Nunc et pulvinar lorem. Morbi nec tempus elit. Nulla ornare lorem metus, et hendrerit libero vulputate quis. Nunc mollis massa lorem, eu gravida sem pretium ac. Nulla eget tristique nunc, et tempus libero. Nulla sollicitudin faucibus metus a elementum. Nunc a consectetur augue. Vestibulum facilisis convallis lorem, vitae pellentesque enim mollis eu. Duis in mauris diam. Fusce bibendum est a dictum semper. Sed eleifend sodales ante vitae commodo. Mauris ornare, orci ut elementum feugiat, orci magna rhoncus velit, et molestie magna tellus sodales justo. Aenean tempus congue rhoncus. Nam non interdum lectus, at eleifend sem. In ullamcorper lobortis molestie. Praesent pharetra ultrices ullamcorper. In at efficitur tortor, at suscipit ante. Nulla luctus leo quam, in dictum ante ultricies quis. Etiam venenatis tellus iaculis purus lobortis luctus.`,
    ],
  };

  const calculateScrollDelta = useCallback((node: HTMLElement) => {
    if (!node) return;

    const { scrollHeight, clientHeight } = node;
    const delta = scrollHeight - clientHeight;
    const output = [0, -delta];
    setMotionRange({
      ...motionRange,
      output,
    });
  }, []);

  useEffect(() => {
    if (!textCard.current) return;

    const observer = new ResizeObserver(() => {
      calculateScrollDelta(textCard.current!);
    });

    observer.observe(textCard.current);

    return () => observer.disconnect();
  }, []);

  return (
    <TextCard
      p={{ _: 4, md: 5 }}
      maxHeight="100%"
      overflow="hidden"
      ref={textCard}
    >
      <motion.div style={{ translateY: translateYMotionValue }}>
        {content.text.map((paragraph, index) => (
          <Typography
            fontSize={{ _: 2, md: 3}}
            lineHeight={{ _: 2, md: 3 }}
            m={{ _: 4, md: 4 }}
            key={`about-paragraph-${index}`}
          >
            {paragraph}
          </Typography>
        ))}
      </motion.div>
    </TextCard>
  );
};

export default About;
