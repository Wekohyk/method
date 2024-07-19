// 防抖
export function debounce<T extends (...args: any) => void>(
  this: any,
  fn: T,
  delay: number,
  immediate = false
): T {
  let timeout: any = null;

  const nFn = (...args: any) => {
    const later = () => {
      timeout = null;
      if (!immediate) {
        fn.apply(this, args);
      }
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, delay);

    if (callNow) {
      fn.apply(this, args);
    }
  };
  return nFn as unknown as T;
}

// 节流
export function throttle<T extends (...args: any[]) => any>(
  this: any,
  func: T,
  time: number,
  immediate = false
) {
  if (immediate) {
    let prevTime = 0;
    return (...args: Parameters<T>) => {
      const nowTime = Date.now();
      if (nowTime - prevTime >= time) {
        func.apply(this, args);
        prevTime = nowTime;
      }
    };
  } else {
    let timer: any;
    return (...args: Parameters<T>) => {
      if (!timer) {
        func.apply(this, args);
        timer = setTimeout(() => {
          if (timer) clearInterval(timer);
          timer = null;
        }, time);
      }
    };
  }
}
