type Vector2 = import("@use-gesture/react").Vector2;
const COMPRESS_CANVAS = document.createElement("canvas");
const COMPRESS_CONTEXT = COMPRESS_CANVAS.getContext("2d")!;
export const compressImage = (url: string, maximum: Vector2 = [2000, 2000]) => {
  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const [width, height] = [img.width, img.height];
      const [maxWidth, maxHeight] = maximum;
      const ratio = Math.min(maxWidth / width, maxHeight / height);
      COMPRESS_CONTEXT.clearRect(
        0,
        0,
        COMPRESS_CANVAS.width,
        COMPRESS_CANVAS.height
      );
      COMPRESS_CANVAS.width = width * ratio;
      COMPRESS_CANVAS.height = height * ratio;
      COMPRESS_CONTEXT.drawImage(img, 0, 0, width * ratio, height * ratio);
      COMPRESS_CANVAS.toBlob(
        (blob) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result as string);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob!);
        },
        "image/png",
        1
      );
    };
    img.onerror = reject;
    img.src = url;
  });
};
