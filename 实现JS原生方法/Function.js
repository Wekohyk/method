/** call
 * @param {Object} obj
 * @param  {...any} args
 * @returns {any}
 * 执行函数
 * 1. 将函数挂载到obj上
 * 2. 执行函数
 * 3. 删除挂载的函数
 * 4. 返回执行值
 * 5. obj为null时，挂载到window上
 * 6. 使用Symbol防止重名key
 * 7. 使用...args接收多个参数
 * 8. 返回执行值
 */
Function.prototype.weko_call = function (obj, ...args) {
  obj = obj || window;
  const fn = Symbol();
  obj[fn] = this;
  return obj[fn](...args);
};
const textObj = {
  name: "weko",
  testFn(age) {
    console.log(`${this.name}${age}岁了`);
  },
};
const textObj2 = {
  name: "wywc",
};
textObj.testFn.weko_call(textObj2, 81);

/** apply
 * @param {Object} obj
 * @param {Array} args
 * @returns {any}
 * 执行函数
 * 1. 将函数挂载到obj上
 * 2. 执行函数
 * 3. 删除挂载的函数
 * 4. 返回执行值
 * 5. obj为null时，挂载到window上
 * 6. 使用Symbol防止重名key
 * 7. 使用...args接收多个参数
 */
Function.prototype.weko_apply = function (obj, args) {
  obj = obj || window;
  const fn = Symbol();
  obj[fn] = this;
  return obj[fn](...args);
};

textObj.testFn.weko_apply(textObj2, [81]);

/** bind
 * @param {Object} obj
 * @param  {...any} args
 * @returns {Function}
 * 返回一个函数
 * 1. 返回一个函数
 * 2. 使用Symbol防止重名key
 * 3. 使用...args接收多个参数
 */
Function.prototype.weko_bind = function (obj, ...args) {
  obj = obj || window;
  const fn = Symbol();
  obj[fn] = this;
  const _this = this;

  const res = function (...innerArgs) {
    console.log(this, _this);
    if (this instanceof _this) {
      this[fn] = _this;
      this[fn](...[...args, ...innerArgs]);
      delete this[fn];
    } else {
      obj[fn](...[...args, ...innerArgs]);
      delete obj[fn];
    }
  };
  res.prototype = Object.create(this.prototype);
  return res;
};

/** new
 * @param {Function} fn
 * @param  {...any} args
 * @returns {Object}
 * 创建一个对象
 * 1. 创建一个对象
 * 2. 将对象的__proto__指向fn.prototype
 * 3. 执行fn
 * 4. 返回对象
 */
Object.prototype.weko_new = function (fn, ...args) {
  const obj = Object.create(fn.prototype);
  const result = fn.call(obj, ...args);
  return result instanceof Object ? result : obj;
};

function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.say = function () {
  console.log(`我是${this.name}，今年${this.age}岁了`);
};
const person = obj.weko_new(Person, "weko", 18);
person.say();
