/**
 * 模拟延时
 * @param {number} delay 延迟时间
 * @returns {Promise<any>}
 */
function sleep(delay) {
  return new Promise((_, reject) => {
    setTimeout(() => reject("接口超时"), delay);
  });
}

/**
 * 模拟请求
 */
function request() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("接口成功"), 1000);
  });
}

/**
 * 判断是否超时
 * @param {() => Promise<any>} requestFn 请求函数
 * @param {number} delay 延迟时长
 * @returns {Promise<any>}
 */
function timeoutPromise(requestFn, delay) {
  return Promise.race([requestFn(), sleep(delay)]);
}

// 不超时，且先于转盘停止前请求回数据
timeoutPromise(request, 2500, 1500).then(
  (res) => console.log(res),
  (err) => console.log(err)
);
