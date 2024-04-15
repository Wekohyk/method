// 请求函数
const getList = () => {
  return new Promise((resolve, reject) => {
    // 创建异步对象
    const ajax = new XMLHttpRequest();
    // 设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以传递参数
    ajax.open("get", "http://127.0.0.1:8000");
    // 发送请求s
    ajax.send();
    // 注册事件 onreadystatechange 状态改变就会调用
    ajax.onreadystatechange = function () {
      if (ajax.readyState == 4 && ajax.status == 200) {
        // 如果能够进到这个判断说明数据可以回来,并且请求的页面是存在的
        resolve(JSON.parse(ajax.responseText));
      }
    };
  });
};

// 获取container对象
const container = document.getElementById("container");
