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
