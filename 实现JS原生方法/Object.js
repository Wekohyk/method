// 定义一个对象
const obj = {
  name: "weko",
  age: 18,
  car: "Maserati",
};
const obj2 = {
  gender: "男",
  interest: "女",
};

/** keys
 * 将对象的key转成一个数组合集
 */
Object.prototype.weko_keys = function (obj) {
  const res = [];
  for (let key in obj) {
    obj.hasOwnProperty(key) && res.push(key);
  }
  return res;
};

const keys = obj.weko_keys(obj);
console.log("weko_keys: ", keys);

/** values
 * 将对象的value转成一个数组合集
 */
Object.prototype.weko_values = function (obj) {
  const res = [];
  for (let key in obj) {
    obj.hasOwnProperty(key) && res.push(obj[key]);
  }
  return res;
};

const values = obj.weko_values(obj);
console.log("weko_values: ", values);

/** assign
 * 将多个对象合并成一个对象
 */
Object.prototype.weko_assign = function (...args) {
  const res = {};
  args.forEach((arg) => {
    for (let key in arg) {
      arg.hasOwnProperty(key) && (res[key] = arg[key]);
    }
  });
  return res;
};

const assign = obj.weko_assign(obj, obj2);
console.log("weko_assign: ", assign);

/** freeze
 * 冻结对象
 */
Object.prototype.weko_freeze = function (obj) {
  Object.freeze(obj);
  return obj;
};

const freeze = obj.weko_freeze(obj);
console.log("weko_freeze: ", freeze);

/** entries
 * 将对象转为键值对数组
 */
Object.prototype.weko_entries = function (obj) {
  const res = [];
  for (let key in obj) {
    obj.hasOwnProperty(key) && res.push([key, obj[key]]);
  }
  return res;
};

const entries = obj.weko_entries(obj);
console.log("weko_entries: ", entries);

/** formEdits
 * 将键值对数组转成对象
 */
Object.prototype.weko_fromEntries = function (arr) {
  const obj = {};
  for (let i = 0; i < arr.length; i++) {
    const [key, value] = arr[i];
    obj[key] = value;
  }
  return obj;
};

const formEdits = obj.weko_fromEntries([
  ["name", "weko"],
  ["age", 18],
  ["car", "Maserati"],
]);
console.log("weko_formEdits: ", formEdits);

/** instanceOf
 * 判断对象是否是某个类的实例
 */
Object.prototype.weko_instanceOf = function (obj, target) {
  let proto = obj.__proto__;
  while (proto) {
    if (proto === target.prototype) {
      return true;
    }
    proto = proto.__proto__;
  }
  return false;
};

const instanceOf = obj.weko_instanceOf(obj, Object);
console.log("weko_instanceOf: ", instanceOf);

/** is
 * 判断两个值是否相同
 */
Object.prototype.weko_is = function (a, b) {
  if (a === b) {
    return a !== 0 || 1 / a === 1 / b;
  }
  return a !== a && b !== b;
};
const a = 1;
const b = 2;
const is1 = obj.weko_is(a, b);
const is2 = obj.weko_is(a, a);
console.log("weko_is: ", is1);
console.log("weko_is: ", is2);

/** isExtensible
 * 判断对象是否可扩展
 */
Object.prototype.weko_isExtensible = function (obj) {
  return Object.isExtensible(obj);
};

const isExtensible = obj.weko_isExtensible(obj);
console.log("weko_isExtensible: ", isExtensible);

/** isFrozen
 * 判断对象是否被冻结
 */
Object.prototype.weko_isFrozen = function (obj) {
  return Object.isFrozen(obj);
};

const isFrozen = obj.weko_isFrozen(obj);
console.log("weko_isFrozen: ", isFrozen);
