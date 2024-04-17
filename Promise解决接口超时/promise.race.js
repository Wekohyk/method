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
  // 假设请求需要 1s
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
// promise.race可以代替手写的超时判断
function timeoutPromise(requestFn, delay) {
  // 如果先返回的是延迟Promise则说明超时了
  // race会直接返回最先执行完的Promise
  return Promise.race([requestFn(), sleep(delay)]);
}

// 超时
timeoutPromise(request, 500).catch((err) => console.log(err)); // 接口超时

// 不超时
timeoutPromise(request, 2000).then((res) => console.log(res)); // 接口成功
