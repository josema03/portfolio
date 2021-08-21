import { AnimationControls, useAnimation } from "framer-motion";
import { useEffect } from "react";

const useAnimationToggle = (
  condition: boolean,
  variants: {
    initial: string;
    animate: string;
  }
): AnimationControls => {
  const animate = useAnimation();

  useEffect(() => {
    if (!condition) {
      animate.start(variants.initial);
    } else {
      animate.start(variants.animate);
    }
  }, [condition, animate, variants]);

  return animate;
};

export default useAnimationToggle;
