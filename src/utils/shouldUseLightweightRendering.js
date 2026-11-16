export default function shouldUseLightweightRendering() {
  const connection = navigator.connection;

  return (
    window.matchMedia("(pointer: coarse)").matches
    || (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4)
    || (typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 4)
    || connection?.saveData === true
  );
}
