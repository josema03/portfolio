import { MotionValue, useTransform, useViewportScroll } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import useBreakpoints from "./useBreakpoint";

const usePositionObserver = (): [MotionValue, MotionValue, (node: HTMLElement) => void] => {
  const { currentWidth } = useBreakpoints();
  const [motionRange, setMotionRange] = useState({
    visibility: {
      input: [0, 1],
      output: [0, 0]
    },
    progress: {
      input: [0, 1],
      output: [0, 0]
    }
  });
  const [elementNode, setElementNode] = useState<HTMLElement | null>(null);
  const [updateCallbackCount, setUpdateCallbackCount] = useState<number>(0);
  const { scrollY } = useViewportScroll();
  const elementVisibility = useTransform(scrollY, motionRange.visibility.input, motionRange.visibility.output);
  const elementProgress = useTransform(scrollY, motionRange.progress.input, motionRange.progress.output);

  const observePosition = useCallback((node: HTMLElement) => {
    if (!node) return;

    setElementNode(node);
    const body = document.getElementsByTagName("body")[0];
    const { y: bodyOffset } = body.getBoundingClientRect();
    const { y: nodeOffsetTop, height: scrollHeight } = node.getBoundingClientRect();
    const { innerHeight: windowHeight } = window;
    const offsetTop = Math.abs(bodyOffset - nodeOffsetTop);

    setMotionRange({
      visibility: {
        input: [
          offsetTop - windowHeight,
          offsetTop - windowHeight * 2 / 3,
          offsetTop - 64 + scrollHeight - windowHeight * 2 / 3,
          offsetTop - 64 + scrollHeight
        ],
        output: [0, 1, 1, 2]
      },
      progress: {
        input: [0, offsetTop - windowHeight, offsetTop - windowHeight + scrollHeight],
        output: [0, 0, 1]
      }
    });
  }, [currentWidth, updateCallbackCount]);

  useEffect(() => {
    if (!elementNode) return;
    const observer = new IntersectionObserver((a) => {
      setUpdateCallbackCount(updateCallbackCount + 1);
    });
    observer.observe(elementNode);
    return () => observer.disconnect();
  }, [elementNode]);

  return [elementVisibility, elementProgress, observePosition];
};

export default usePositionObserver;