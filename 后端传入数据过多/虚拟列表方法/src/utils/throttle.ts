// throttle function
export const throttle = <T>(
  func: (this: T, ...args: any[]) => void,
  delay: number,
) => {
  let lastCall = 0;
  return function (this: T, ...args: any[]) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func.apply(this, args);
  };
};
