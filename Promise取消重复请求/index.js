/** 取消重复请求
 * 1. 保证只有一个请求在执行
 * 2. 如果有新请求，取消之前的请求
 * 3. 如果请求已经完成，不会取消
 * 4. 如果请求已经取消，不会执行回调
 * 5. 如果请求失败，不会执行回调
 * 6. 如果请求成功，执行回调
 * 7. 如果请求被取消，执行回调
 * 8. 如果请求被取消，不会执行回调
 */

class CancelablePromise {
  constructor() {
    this.pendingPromise = null;
    this.reject = null;
  }

  request(requestFn) {
    if (this.pendingPromise) {
      this.cancel("取消重复请求");
    }

    const promise = new Promise((_, reject) => (this.reject = reject));
    this.pendingPromise = Promise.race([requestFn(), promise]);
    return this.pendingPromise;
  }

  cancel(reason) {
    this.reject(reason);
    this.pendingPromise = null;
  }
}

function request(delay) {
  return () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve("最后赢家是我");
      }, delay);
    });
}

const cancelPromise = new CancelablePromise();

// 模拟频繁请求5次
for (let i = 0; i < 5; i++) {
  cancelPromise
    .request(request(2000))
    .then((res) => console.log(res)) // 最后一个 最后赢家是我
    .catch((err) => console.error(err)); // 前四个 取消重复请求
}
