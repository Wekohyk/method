/** promise全局请求loading
 * 全局只要有一个接口还在请求中就展示loading
 * 全局所有接口请求完后隐藏loading
 */

class PromiseManager {
  constructor() {
    this.pendingPromise = new Set();
    this.loading = false;
  }

  generateKey() {
    return `${new Date().getTime()}-${parseInt(Math.random() * 1000)}`;
  }

  push(...requestFns) {
    for (const requestFn of requestFns) {
      const key = this.generateKey();
      this.pendingPromise.add(key);
      requestFn().finally(() => {
        this.pendingPromise.delete(key);
        this.loading = this.pendingPromise.size !== 0;
      });
    }
  }
}
