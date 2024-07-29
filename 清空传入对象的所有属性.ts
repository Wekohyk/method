export const resetReactive = <T>(obj: any) => {
  Object.keys(obj).forEach((key) => {
    delete obj[key];
  });
};
const obj = { a: 1, b: 2, c: 3 };
resetReactive(obj);
console.log(obj); // 输出: {}
