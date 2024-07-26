//确保一个矩形在另一个矩形内完全覆盖，并且居中显示。

type Vector2 = import("@use-gesture/react").Vector2;

export const getCoveredRect = (size: Vector2, boundedSize: Vector2) => {
  const [width, height] = size;
  const [boundedWidth, boundedHeight] = boundedSize;
  const ratio = Math.max(boundedWidth / width, boundedHeight / height);
  const coveredWidth = width * ratio;
  const coveredHeight = height * ratio;
  return {
    width: coveredWidth,
    height: coveredHeight,
    x: (boundedWidth - coveredWidth) / 2,
    y: (boundedHeight - coveredHeight) / 2,
  };
};
