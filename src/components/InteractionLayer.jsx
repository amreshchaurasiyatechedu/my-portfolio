import { useEffect, useRef } from "react";

export default function InteractionLayer() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!cursor || !canHover.matches || reduceMotion.matches) return undefined;

    let frameId = 0;
    let pointerX = -100;
    let pointerY = -100;
    let magneticTarget = null;
    document.documentElement.classList.add("custom-cursor-enabled");

    const resetMagnet = () => {
      if (!magneticTarget) return;
      magneticTarget.style.setProperty("--magnetic-x", "0px");
      magneticTarget.style.setProperty("--magnetic-y", "0px");
      magneticTarget = null;
    };

    const handlePointerMove = (event) => {
      if (event.pointerType !== "mouse") return;

      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frameId) {
        frameId = window.requestAnimationFrame(() => {
          cursor.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
          frameId = 0;
        });
      }

      const eventTarget = event.target instanceof Element ? event.target : null;
      const magnetic = eventTarget?.closest(".button, .nav-cta") || null;
      if (magneticTarget && magneticTarget !== magnetic) resetMagnet();
      if (magnetic) {
        const bounds = magnetic.getBoundingClientRect();
        magneticTarget = magnetic;
        magnetic.style.setProperty("--magnetic-x", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 8}px`);
        magnetic.style.setProperty("--magnetic-y", `${((event.clientY - bounds.top) / bounds.height - 0.5) * 6}px`);
      }

      cursor.classList.add("is-visible");
      cursor.classList.toggle("is-interactive", Boolean(eventTarget?.closest("a, button, [role='button']")));
      cursor.classList.toggle("is-text", Boolean(eventTarget?.closest("input, textarea, select, [contenteditable='true']")));
    };

    const hideCursor = () => {
      cursor.classList.remove("is-visible", "is-interactive", "is-text", "is-pressed");
      resetMagnet();
      pointerX = -100;
      pointerY = -100;
      if (!frameId) {
        frameId = window.requestAnimationFrame(() => {
          cursor.style.transform = "translate3d(-100px, -100px, 0)";
          frameId = 0;
        });
      }
    };

    const handlePointerDown = () => cursor.classList.add("is-pressed");
    const handlePointerUp = () => cursor.classList.remove("is-pressed");

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("blur", hideCursor);
    document.documentElement.addEventListener("pointerleave", hideCursor);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("blur", hideCursor);
      document.documentElement.removeEventListener("pointerleave", hideCursor);
      document.documentElement.classList.remove("custom-cursor-enabled");
      resetMagnet();
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="custom-cursor" ref={cursorRef} aria-hidden="true">
      <span className="custom-cursor-ring" />
      <span className="custom-cursor-dot" />
    </div>
  );
}
