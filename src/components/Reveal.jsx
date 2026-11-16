import { motion, useReducedMotion } from "framer-motion";

export default function Reveal({ as = "div", className = "", children, delay = 0, ...props }) {
  const reduceMotion = useReducedMotion();
  const MotionElement = motion[as] || motion.div;

  return (
    <MotionElement
      {...props}
      className={`reveal ${className}`.trim()}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </MotionElement>
  );
}
