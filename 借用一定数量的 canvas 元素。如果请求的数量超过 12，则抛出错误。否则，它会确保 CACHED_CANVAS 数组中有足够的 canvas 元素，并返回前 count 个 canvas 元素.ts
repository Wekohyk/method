// 借用一定数量的 canvas 元素。如果请求的数量超过 12，则抛出错误。否则，它会确保 CACHED_CANVAS 数组中有足够的 canvas 元素，并返回前 count 个 canvas 元素。

const CACHED_CANVAS: HTMLCanvasElement[] = [];
export const borrowCanvas = (count: number) => {
  if (count > 12) {
    throw new Error("Maximum canvas count is 12");
  }
  while (CACHED_CANVAS.length < count) {
    CACHED_CANVAS.push(document.createElement("canvas"));
  }
  return CACHED_CANVAS.slice(0, count);
};
