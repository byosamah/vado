"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import {
  fadeInUp,
  fadeIn,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  defaultViewport,
} from "@/lib/animations";

const variants = { fadeInUp, fadeIn, fadeInLeft, fadeInRight };
type VariantName = keyof typeof variants;

type RevealProps = Omit<HTMLMotionProps<"div">, "variants"> & {
  variant?: VariantName | "stagger";
};

export function Reveal({ variant = "fadeInUp", children, ...rest }: RevealProps) {
  const v = variant === "stagger" ? staggerContainer : variants[variant];
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={v}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type RevealItemProps = Omit<HTMLMotionProps<"div">, "variants"> & {
  variant?: VariantName;
};

export function RevealItem({
  variant = "fadeInUp",
  children,
  ...rest
}: RevealItemProps) {
  return (
    <motion.div variants={variants[variant]} {...rest}>
      {children}
    </motion.div>
  );
}
