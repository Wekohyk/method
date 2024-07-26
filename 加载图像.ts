// 创建一个新的图像对象并设置其 src 属性来加载图像。它返回一个 Promise，当图像成功加载时，Promise 会被解析并返回图像对象；如果加载失败，Promise 会被拒绝。

export const loadImage = (url: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
};
