export default function getRenderingProfile() {
  const connection = navigator.connection;
  const isMobile = window.matchMedia(
    "(max-width: 680px), (max-height: 500px) and (pointer: coarse)",
  ).matches;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const isTablet = isCoarsePointer
    && !isMobile
    && window.matchMedia("(min-width: 681px) and (max-width: 1200px)").matches;
  const dataSaver = connection?.saveData === true;
  const constrained = (
    (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4)
    || (typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 4)
  );

  return {
    lowPower: isMobile || isCoarsePointer || constrained || dataSaver,
    staticScene: isMobile || dataSaver || (constrained && !isTablet),
  };
}
