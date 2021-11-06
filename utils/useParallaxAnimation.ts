import { MotionValue, useTransform } from "framer-motion";
import usePositionObserver from "./usePositionObserver";

const useParallaxAnimation = (): [MotionValue, MotionValue, (node: HTMLElement) => void] => {
  const [elementVisibility, _elementProgress, positionObserver] = usePositionObserver();
  const opacityTransform = useTransform(elementVisibility, [0, 1, 2], [0, 1, 0]);
  const yTransform = useTransform(elementVisibility, [0, 1, 2], [100, 0, -100]);

  return [opacityTransform, yTransform, positionObserver];
};

export default useParallaxAnimation;