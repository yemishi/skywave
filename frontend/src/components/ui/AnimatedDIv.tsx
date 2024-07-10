import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface PropsType extends HTMLMotionProps<"div"> {
  children?: ReactNode;
  toRight?: boolean;
  toLeft?: boolean;
}

export default function AnimatedDiv({
  toRight,
  toLeft,
  children,
  ...props
}: PropsType) {
  const initialX = toRight ? -100 : toLeft ? 100 : 0;
  const exitX = toRight ? 100 : toLeft ? -100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: exitX }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
