/** all
 * 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
 * 返回一个新的Promise，只有当所有Promise都成功时，新Promise才会成功，否则失败
 * 新Promise的成功值为所有Promise的成功值组成的数组
 * 新Promise的失败值为第一个失败Promise的失败值
 */
function all(promises) {
  const result = [];
  let count = 0;
  return new WekoPromise((resolve, reject) => {
    const addData = (index, value) => {
      result[index] = value;
      count++;
      if (count === promises.length) resolve(result);
    };
    promises.forEach((promise, index) => {
      if (promise instanceof WekoPromise) {
        promise.then(
          (res) => {
            addData(index, res);
          },
          (err) => reject(err)
        );
      } else {
        addData(index, promise);
      }
    });
  });
}

/** race
 * 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
 * 返回一个新的Promise，只要有一个Promise成功或失败，新Promise就会成功或失败
 * 新Promise的成功值为第一个成功Promise的成功值
 * 新Promise的失败值为第一个失败Promise的失败值
 * 只要有一个Promise成功或失败，其他Promise的状态就不会再改
 */
function race(promises) {
  return new WekoPromise((resolve, reject) => {
    promises.forEach((promise) => {
      if (promise instanceof WekoPromise) {
        promise.then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
      } else {
        resolve(promise);
      }
    });
  });
}

/** allSettled
 * 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
 * 返回一个新的Promise，只有当所有Promise都结束时，新Promise才会结束
 * 新Promise的成功值为所有Promise的状态组成的数组
 * 新Promise的失败值为第一个失败Promise的失败值
 * 新Promise的状态为fulfilled
 * 新Promise的成功值为所有Promise的状态组成的数组
 * 新Promise的失败值为第一个失败Promise的失败值
 * 新Promise的状态为rejected
 * 新Promise的成功值为所有Promise的状态组成的数组
 * 新Promise的失败值为第一个失败Promise的失败值
 */
function allSettled(promises) {
  const result = [];
  let count = 0;
  return new WekoPromise((resolve, reject) => {
    const addData = (index, value, status) => {
      result[index] = { status, value };
      count++;
      if (count === promises.length) resolve(result);
    };
    promises.forEach((promise, index) => {
      if (promise instanceof WekoPromise) {
        promise.then(
          (res) => {
            addData(index, res, "fulfilled");
          },
          (err) => addData(index, err, "rejected")
        );
      } else {
        addData(index, promise, "fulfilled");
      }
    });
  });
}

/** any
 * 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
 * 返回一个新的Promise，只要有一个Promise成功，新Promise就会成功
 * 新Promise的成功值为第一个成功Promise的成功值
 * 新Promise的失败值为所有Promise的失败值组成的数组
 */
function any(promises) {
  const errors = [];
  return new WekoPromise((resolve, reject) => {
    promises.forEach((promise) => {
      if (promise instanceof WekoPromise) {
        promise.then(
          (res) => {
            resolve(res);
          },
          (err) => {
            errors.push(err);
            if (errors.length === promises.length) reject(errors);
          }
        );
      } else {
        resolve(promise);
      }
    });
  });
}

/** Promise.resolve
 * 接收一个参数，返回一个成功的Promise
 */
function resolve(value) {
  return new WekoPromise((resolve) => {
    resolve(value);
  });
}

/** Promise.reject
 * 接收一个参数，返回一个失败的Promise
 */
function reject(reason) {
  return new WekoPromise((resolve, reject) => {
    reject(reason);
  });
}

/** Promise.all
 * 接收一个Promise数组，返回一个新的Promise
 */
function all(promises) {
  const result = [];
  let count = 0;
  return new WekoPromise((resolve, reject) => {
    const addData = (index, value) => {
      result[index] = value;
      count++;
      if (count === promises.length) resolve(result);
    };
    promises.forEach((promise, index) => {
      if (promise instanceof WekoPromise) {
        promise.then(
          (res) => {
            addData(index, res);
          },
          (err) => reject(err)
        );
      } else {
        addData(index, promise);
      }
    });
  });
}
