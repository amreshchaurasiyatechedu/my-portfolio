import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Reveal({ as = "div", className = "", children, delay = 0, ...props }) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let context;
    let disposed = false;
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        });
        timeline.fromTo(
          element,
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            delay: Math.max(0, delay),
            ease: "power3.out",
            onComplete: () => gsap.set(element, { clearProps: "transform,opacity,visibility" }),
          },
        );

        const track = element.querySelector("[data-reveal-line]");
        if (track) {
          timeline.fromTo(
            track,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 1,
              ease: "power2.out",
              transformOrigin: "top center",
              onComplete: () => gsap.set(track, { clearProps: "transform" }),
            },
            0.1,
          );
        }

        const nodes = element.querySelectorAll("[data-reveal-node]");
        if (nodes.length) {
          timeline.fromTo(
            nodes,
            { autoAlpha: 0, scale: 0.65 },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.42,
              stagger: 0.16,
              ease: "back.out(1.7)",
              onComplete: () => gsap.set(nodes, { clearProps: "transform,opacity,visibility" }),
            },
            0.28,
          );
        }

        const mask = element.querySelector("[data-reveal-mask]");
        if (mask) {
          timeline.fromTo(
            mask,
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: 0.85,
              ease: "power3.out",
              onComplete: () => gsap.set(mask, { clearProps: "clipPath" }),
            },
            0.08,
          );
        }

        const image = element.querySelector("[data-reveal-image]");
        if (image) {
          timeline.fromTo(
            image,
            { clipPath: "inset(12% 0 0 0 round 12px)", scale: 1.035 },
            {
              clipPath: "inset(0% 0 0 0 round 12px)",
              scale: 1,
              duration: 1,
              ease: "power3.out",
              onComplete: () => gsap.set(image, { clearProps: "transform,clipPath" }),
            },
            0,
          );
        }
      }, element);
    }).catch((error) => {
      console.error("Unable to initialize scroll reveal animations.", error);
    });

    return () => {
      disposed = true;
      context?.revert();
    };
  }, [delay]);

  const Element = as;
  return <Element {...props} ref={elementRef} className={`reveal ${className}`.trim()}>{children}</Element>;
}
