// 处理角度的周期性特性（即 0 度和 360 度是相同的角度），确保在跨越 0 度或 360 度时仍能正确判断角度是否在目标范围内。

export const isCloseToAngle = (
  angle: number,
  target: number,
  threshold = 4
) => {
  let lower = target - threshold;
  let upper = target + threshold;
  if (lower < 0) {
    lower += 360;
    return angle >= lower || angle <= upper;
  }
  if (upper >= 360) upper -= 360;
  return angle >= lower && angle <= upper;
};
