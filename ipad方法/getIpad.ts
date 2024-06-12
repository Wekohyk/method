export const onOrientationChange = (callback: () => void) => {
  const mql = window.matchMedia("(orientation: portrait)");
  mql.addEventListener("change", () => {
    callback();
  });
};
export function getOrientation() {
  const isLandscape = window.matchMedia("(orientation: landscape)").matches;
  return isLandscape ? "landscape" : "portrait";
}
export const getRealWidthAndHeight = () => {
  const orientation = getOrientation();
  if (orientation === "landscape") {
    const width = Math.max(window.screen.width, window.screen.height);
    const height = Math.min(window.screen.width, window.screen.height);
    return {
      width,
      height,
    };
  } else {
    const width = Math.min(window.screen.width, window.screen.height);
    const height = Math.max(window.screen.width, window.screen.height);
    return {
      width,
      height,
    };
  }
};
