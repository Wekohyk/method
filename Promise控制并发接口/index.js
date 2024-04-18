/** Promise控制并发(如果需要一次性发送过多请求，可以使用Promise控制并发， 先发送一部分请求，等这一部分请求完成后再发送下一部分请求)
 * 1. 限制并发数
 * 2. 任务完成后，返回结果
 * 3. 任务失败后，返回失败原因
 * 4. 任务完成后，继续添加任务
 * 5. 任务失败后，继续添加任务
 */
class Scheduler {
  constructor(limit) {
    this.dataList = [];
    // 限制并发数
    this.limit = limit;
    this.count = 0;
  }

  // 添加任务的方法
  add(time, order) {
    const promiseCreator = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(order);
          resolve();
        }, time);
      });
    };
    this.dataList.push(promiseCreator);
  }

  taskStart() {
    for (let i = 0; i < this.limit; i++) {
      this.request();
    }
  }

  request() {
    if (!this.dataList.length || this.count >= this.limit) return;
    this.count++;
    this.dataList
      .shift()()
      .then(() => {
        this.count--;
        this.request();
      });
  }
}

// 测试
const scheduler = new Scheduler(2);
const addTask = (time, order) => {
  scheduler.add(time, order);
};
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
scheduler.taskStart();
