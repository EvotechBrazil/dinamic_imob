"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  staggerDelay?: number;
}

/**
 * TextReveal — anima palavras word-by-word slide-up + fade in quando
 * o elemento entra no viewport. Usa framer-motion's useInView (com
 * once:true) — robusto contra elementos já visíveis no mount, sem o
 * bug "aparece, pisca e some" que a versão GSAP+ScrollTrigger tinha
 * quando o elemento estava parcialmente em view antes do effect rodar.
 */
export function TextReveal({
  text,
  as: Tag = "h2",
  className = "",
  staggerDelay = 0.04,
}: TextRevealProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "0px 0px -10% 0px",
  });
  const words = text.split(" ");

  return (
    <Tag ref={ref as never} className={className}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span
            className="word-wrap inline-block overflow-hidden align-bottom"
            style={{ padding: "0 0.05em", margin: "0 -0.05em" }}
          >
            <motion.span
              className="word-inner inline-block"
              initial={{ y: "110%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
              transition={{
                duration: 0.9,
                delay: i * staggerDelay,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </Tag>
  );
}
