import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ScrollProgress() {
  const progressRef = useRef(null);

  useEffect(() => {
    let trigger;
    let disposed = false;
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      if (disposed || !progressRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const setProgress = gsap.quickSetter(progressRef.current, "scaleX");
      trigger = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => setProgress(self.progress),
        onRefresh: (self) => setProgress(self.progress),
      });
    }).catch((error) => {
      console.error("Unable to initialize the scroll progress indicator.", error);
    });

    return () => {
      disposed = true;
      trigger?.kill();
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true"><span ref={progressRef} /></div>;
}
