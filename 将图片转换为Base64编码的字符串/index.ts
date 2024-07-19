export function convertImageToBase64(
  url: string,
  clean = true
): Promise<string> {
  return new Promise((resolve, reject) => {
    url = url.replace(
      "top-widgets-oss-cdn.topwidgets.com",
      "top-widgets.oss-cn-shenzhen.aliyuncs.com"
    );
    url = url.replace(
      "storm-oss-cdn.topwidgets.com",
      "resource.topwidgets.com"
    );
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx!.drawImage(img, 0, 0);
      const base64 = canvas.toDataURL("image/png");
      resolve(clean ? cleanBase64(base64) : base64);
    };
    img.onerror = reject;
    img.src = url;
  });
}
export const cleanBase64 = (str: string) => {
  return str.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
};
