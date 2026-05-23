"use client";

import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  staggerDelay?: number;
}

export function TextReveal({
  text,
  as: Tag = "h2",
  className = "",
  staggerDelay = 0.04,
}: TextRevealProps) {
  const ref = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const wordInners = el.querySelectorAll<HTMLSpanElement>(".word-inner");
    if (wordInners.length === 0) return;

    const anim = gsap.from(wordInners, {
      yPercent: 110,
      opacity: 0,
      duration: 1,
      stagger: staggerDelay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [text, staggerDelay]);

  const words = text.split(" ");

  return (
    <Tag ref={ref as never} className={className}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span
            className="word-wrap inline-block overflow-hidden align-bottom"
            style={{ padding: "0 0.05em", margin: "0 -0.05em" }}
          >
            <span className="word-inner inline-block">{w}</span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </Tag>
  );
}
