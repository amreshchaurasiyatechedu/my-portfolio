import { useEffect, useRef } from "react";

export default function AmbientBackground() {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(pointer: fine)").matches) {
      return undefined;
    }

    let frameId = 0;
    let pointerX = 0;
    let pointerY = 0;
    const updatePointerLight = (event) => {
      pointerX = ((event.clientX / window.innerWidth) - 0.5) * 72;
      pointerY = ((event.clientY / window.innerHeight) - 0.5) * 56;
      if (frameId) return;

      frameId = window.requestAnimationFrame(() => {
        background.style.setProperty("--ambient-pointer-x", `${pointerX}px`);
        background.style.setProperty("--ambient-pointer-y", `${pointerY}px`);
        frameId = 0;
      });
    };

    window.addEventListener("pointermove", updatePointerLight, { passive: true });
    return () => {
      window.removeEventListener("pointermove", updatePointerLight);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="ambient-background" ref={backgroundRef} aria-hidden="true">
      <div className="ambient-mesh" />
      <div className="ambient-pointer-light" />
      <div className="ambient-orb ambient-orb-blue" />
      <div className="ambient-orb ambient-orb-cyan" />
      <div className="ambient-orb ambient-orb-violet" />
      <svg className="ambient-network" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <g className="ambient-network-lines">
          <path d="M70 155 205 94 335 163 472 112 608 190 745 116 882 176 1032 108 1162 164" />
          <path d="M70 155 125 326 265 374 335 163 405 342 545 398 608 190 676 352 812 405 882 176 948 354 1090 399 1162 164" />
          <path d="M125 326 78 522 230 580 265 374 405 342 450 574 545 398 676 352 718 584 812 405 948 354 992 580 1090 399 1130 552" />
          <path d="M78 522 230 580 376 690 450 574 590 684 718 584 850 690 992 580 1130 552 1165 700" />
        </g>
        <g className="ambient-network-nodes">
          <circle cx="70" cy="155" r="2" /><circle cx="205" cy="94" r="2" />
          <circle cx="335" cy="163" r="2" /><circle cx="472" cy="112" r="2" />
          <circle cx="608" cy="190" r="2" /><circle cx="745" cy="116" r="2" />
          <circle cx="882" cy="176" r="2" /><circle cx="1032" cy="108" r="2" />
          <circle cx="1162" cy="164" r="2" /><circle cx="125" cy="326" r="2" />
          <circle cx="265" cy="374" r="2" /><circle cx="405" cy="342" r="2" />
          <circle cx="545" cy="398" r="2" /><circle cx="676" cy="352" r="2" />
          <circle cx="812" cy="405" r="2" /><circle cx="948" cy="354" r="2" />
          <circle cx="1090" cy="399" r="2" /><circle cx="78" cy="522" r="2" />
          <circle cx="230" cy="580" r="2" /><circle cx="450" cy="574" r="2" />
          <circle cx="590" cy="684" r="2" /><circle cx="718" cy="584" r="2" />
          <circle cx="850" cy="690" r="2" /><circle cx="992" cy="580" r="2" />
          <circle cx="1130" cy="552" r="2" />
        </g>
      </svg>
      <div className="ambient-grid" />
    </div>
  );
}
