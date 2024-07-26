// 通过加载图像来获取其宽度和高度，并返回一个包含这些信息的 Promise。

interface ImageMetadata {
  width: number;
  height: number;
}
export const getImageMetadata = (url: string) => {
  return new Promise<ImageMetadata>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = reject;
    img.src = url;
  });
};
