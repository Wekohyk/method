# 获取图片中的文字

想要获取图片中的文字需要使用到包 -- tesseract.js

**下载**

```node
npm i tesseract.js
```

**使用方法**

- 识别出中文为: 'chi_sim'
- 识别出英文为: 'eng'
- 同时识别出中文和英文: 'eng+chi_sim'

```ts
import Tesseract from 'tesseract.js';

Tesseract.recognize('想要识别的图片url', '识别出中文还是英文').then({
  data: { text } => {
    console.log(text);
  }
}).catch(error => {
    console.log(error)
});
```

##

## 获取图片中的中英文内容方法在 src/utils/gitImgText.ts

```ts
import { ref } from 'vue';
import Tesseract from 'tesseract.js';

const allImgs = ref<any[]>([]);
// get all images
export const getImgText = async (
  requestImgs: {
    (): {
      name: string;
      src: string;
    }[];
    (): any;
  },
  language: string,
) => {
  const res = requestImgs();
  allImgs.value = await Promise.all(
    res.map(data => {
      return resolveImg(data, language);
    }),
  );
};

// get image text
const resolveImg = (
  obj: {
    name: string;
    src: string;
  },
  language: string,
) => {
  const data = { ...obj };
  return Tesseract.recognize(data.src, language)
    .then(({ data: { text } }) => {
      console.log(text);
      return { ...data, keyword: text };
    })
    .catch(() => {
      console.log('Acquisition failure');
      return { ...data, keyword: data.src };
    });
};
```

## 使用此方法必须传递两个参数

```ts
// 第一个是数据, 第二个是想要取出图片中的英文还是中文
onMounted(() => {
  // get english
  getImgText(requestImgsEn, 'eng');
  // get chinese
  getImgText(requestImgsZh, 'chi_sim');
});
```

**传递的数据格式需要按照这种形式**

```ts
const requestImgsEn = () => {
  return ['/text1_en.jpeg', '/text2_en.jpeg', '/text3_en.jpeg'].map(img => ({
    name: img,
    src: img,
  }));
};

const requestImgsZh = () => {
  return ['/text1_zh.jpeg', '/text2_zh.jpg', '/text3_zh.jpeg'].map(img => ({
    name: img,
    src: img,
  }));
};
```
