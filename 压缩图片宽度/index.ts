export function compressImageByWidth(
  url: string,
  maxWidth: number,
  quality: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx!.drawImage(img, 0, 0, width, height);
      const base64 = canvas.toDataURL("image/png");
      resolve(base64);
    };
    img.onerror = reject;
    img.src = url;
  });
}
