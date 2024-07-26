type Vector2 = import("@use-gesture/react").Vector2;
const MAX_LIMIT = 800;
export const scaleSize = (
  size: Vector2,
  limit: number = MAX_LIMIT
): Vector2 => {
  const max = Math.max(...size);
  if (max <= limit) {
    return size;
  }
  if (size[0] > size[1]) {
    const scale = limit / size[0];
    return [limit, size[1] * scale];
  }
  const scale = limit / size[1];
  return [size[0] * scale, limit];
};
