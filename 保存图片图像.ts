// 该方法首先检查背景 URL 是否以 'image://' 开头，如果是则直接返回。否则，它会获取图像数据，将其编码为 Base64 字符串并保存。如果保存失败，则抛出错误；如果成功，则返回并设置背景图像。

import { Base64 } from "js-base64";

async function saveBackground() {
  if (this.backgroundUrl?.startsWith("image://")) {
    return this.backgroundUrl;
  }
  const buffer = await fetch(this.backgroundUrl!).then((res) =>
    res.arrayBuffer()
  );
  // tw.widget.saveImage() 方法用于保存图像数据，它接受一个对象作为参数，该对象包含图像数据的 Base64 字符串。如果保存成功，则返回一个包含图像 URL 的对象；否则返回一个空对象。
  const result = await tw.widget.saveImage({
    data: Base64.fromUint8Array(new Uint8Array(buffer)),
  });
  if (!result.value) {
    throw new Error("Save Background Image Failed");
  }
  return (this.background = result.value);
}
