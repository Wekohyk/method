// 定义一个数组
const list = [
  { id: 1, name: "snake" },
  { id: 2, name: "monkey" },
  { id: 3, name: "banana" },
  { id: 4, name: "apple" },
  { id: 5, name: "origin" },
];

/** forEach
 * item: 遍历项
 * index: 索引
 * arr: 数组
 */
Array.prototype.weko_forEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

list.weko_forEach((item, index, arr) => {
  console.log("weko_forEach: ", item, index, arr);
});

/** map
 * item: 遍历项
 * index: 索引
 * arr: 数组
 * return: 返回新数组
 */
Array.prototype.weko_map = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

const mapList = list.weko_map((item, index, arr) => {
  return item.name;
});
console.log("weko_map: ", mapList);

/** filter
 * item: 遍历项
 * index: 索引
 * arr: 数组
 * return: 返回新数组
 * 返回true的项组成新数组
 * 返回false的项不组成新数组
 * 返回新数组
 */
Array.prototype.weko_filter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

const filterList = list.weko_filter((item, index, arr) => {
  return item.id > 2;
});
console.log("weko_filter: ", filterList);

/** some
 * item: 遍历项
 * index: 索引
 * arr: 数组
 * return: 返回布尔值
 * 有一个满足条件就返回true
 * 全部不满足条件就返回false
 */
Array.prototype.weko_some = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return true;
    }
  }
  return false;
};

const someList = list.weko_some((item, index, arr) => {
  return item.id > 2;
});
console.log("weko_some: ", someList);

/** every
 * item: 遍历项
 * index: 索引
 * arr: 数组
 * return: 返回布尔值
 * 全部满足条件就返回true
 * 有一个不满足条件就返回false
 */
Array.prototype.weko_every = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (!callback(this[i], i, this)) {
      return false;
    }
  }
  return true;
};

const everyList = list.weko_every((item, index, arr) => {
  return item.id > 0;
});
console.log("weko_every: ", everyList);

/** reduce
 * prev: 上一次的值
 * item: 遍历项
 * index: 索引
 * arr: 数组
 * return: 返回新数组
 * 从左到右遍历
 */
Array.prototype.weko_reduce = function (callback, initialValue) {
  let result = initialValue;
  for (let i = 0; i < this.length; i++) {
    result = callback(result, this[i], i, this);
  }
  return result;
};

const reduceList = list.weko_reduce((prev, item, index, arr) => {
  return prev + item.id;
}, 0);
console.log("weko_reduce: ", reduceList);

/** reduceRight
 * prev: 上一次的值
 * item: 遍历项
 * index: 索引
 * arr: 数组
 * return: 返回新数组
 * 从右到左遍历
 */
Array.prototype.weko_reduceRight = function (callback, initialValue) {
  let result = initialValue;
  for (let i = this.length - 1; i >= 0; i--) {
    result = callback(result, this[i], i, this);
  }
  return result;
};

const reduceRightList = list.weko_reduceRight((prev, item, index, arr) => {
  return prev + item.id;
}, 0);
console.log("weko_reduceRight: ", reduceRightList);

/** find
 * item: 遍历项
 * index: 索引
 * arr: 数组
 * return: 返回第一个满足条件的项
 */
Array.prototype.weko_find = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return this[i];
    }
  }
  return undefined;
};

const findList = list.weko_find((item, index, arr) => {
  return item.id === 2;
});
console.log("weko_find: ", findList);

/** findIndex
 * item: 遍历项
 * index: 索引
 * arr: 数组
 * return: 返回第一个满足条件的索引
 */
Array.prototype.weko_findIndex = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return i;
    }
  }
  return -1;
};

const findIndexList = list.weko_findIndex((item, index, arr) => {
  return item.id === 2;
});
console.log("weko_findIndex: ", findIndexList);

/** includes
 * item: 遍历项
 * index: 索引
 * arr: 数组
 * return: 返回布尔值
 * 是否包含某个值
 */
Array.prototype.weko_includes = function (value) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === value) {
      return true;
    }
  }
  return false;
};

const includesList = list.weko_includes("banana");
console.log("weko_includes: ", includesList);

/** indexOf
 * item: 遍历项
 * index: 索引
 * arr: 数组
 * return: 返回第一个满足条件的索引
 */
Array.prototype.weko_indexOf = function (value) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === value) {
      return i;
    }
  }
  return -1;
};

const indexOfList = list.weko_indexOf("banana");
console.log("weko_indexOf: ", indexOfList);

/** fill
 * value: 填充值
 * start: 开始位置
 * end: 结束位置
 * return: 返回新数组
 */
Array.prototype.weko_fill = function (value, start, end) {
  for (let i = start; i < end; i++) {
    this[i] = value;
  }
  return this;
};

const fillList = list.weko_fill("fill", 1, 3);
console.log("weko_fill: ", fillList);

/** copyWithin
 * target: 目标位置
 * start: 开始位置
 * end: 结束位置
 * return: 返回新数组
 */
Array.prototype.weko_copyWithin = function (target, start, end) {
  let copyList = this.slice();
  for (let i = start; i < end; i++) {
    copyList[target] = this[i];
    target++;
  }
  return copyList;
};

const copyWithinList = list.weko_copyWithin(1, 2, 4);
console.log("weko_copyWithin: ", copyWithinList);

/** flat
 * depth: 深度
 * return: 返回新数组
 */
Array.prototype.weko_flat = function (depth) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (Array.isArray(this[i]) && depth > 0) {
      result = result.concat(this[i].weko_flat(depth - 1));
    } else {
      result.push(this[i]);
    }
  }
  return result;
};

const flatList = [1, 2, [3, 4, [5, 6]]].weko_flat(1);
console.log("weko_flat: ", flatList);

/** flatMap
 * item: 遍历项
 * index: 索引
 * arr: 数组
 * return: 返回新数组
 */
Array.prototype.weko_flatMap = function (callback) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    result = result.concat(callback(this[i], i, this));
  }
  return result;
};

const flatMapList = [1, 2, 3].weko_flatMap((item) => {
  return [item, item * 2];
});
console.log("weko_flatMap: ", flatMapList);

/** slice
 * start: 开始位置
 * end: 结束位置
 * return: 返回新数组
 */
Array.prototype.weko_slice = function (start, end) {
  let result = [];
  for (let i = start; i < end; i++) {
    result.push(this[i]);
  }
  return result;
};

const sliceList = list.weko_slice(1, 3);
console.log("weko_slice: ", sliceList);

/** sort
 * compareFunction: 排序函数
 * return: 返回新数组
 */
Array.prototype.weko_sort = function (compareFunction) {
  let result = this.slice();
  for (let i = 0; i < result.length; i++) {
    for (let j = i + 1; j < result.length; j++) {
      if (compareFunction(result[i], result[j]) > 0) {
        let temp = result[i];
        result[i] = result[j];
        result[j] = temp;
      }
    }
  }
  return result;
};

const sortList = list.weko_sort((a, b) => {
  return a.id - b.id;
});
console.log("weko_sort: ", sortList);

/** reverse
 * return: 返回新数组
 */
Array.prototype.weko_reverse = function () {
  let result = [];
  for (let i = this.length - 1; i >= 0; i--) {
    result.push(this[i]);
  }
  return result;
};

const reverseList = list.weko_reverse();
console.log("weko_reverse: ", reverseList);

/** join
 * separator: 分隔符
 * return: 返回字符串
 * 将数组转换成字符串
 * 默认逗号分隔
 * 返回字符串
 */
Array.prototype.weko_join = function (separator) {
  let result = "";
  for (let i = 0; i < this.length; i++) {
    result += this[i];
    if (i !== this.length - 1) {
      result += separator;
    }
  }
  return result;
};

const joinList = list.weko_join("-");
console.log("weko_join: ", joinList);

/** concat
 * value: 连接值
 * return: 返回新数组
 */
Array.prototype.weko_concat = function (value) {
  let result = this.slice();
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      result.push(value[i]);
    }
  } else {
    result.push(value);
  }
  return result;
};

const concatList = list.weko_concat([6, 7]);
console.log("weko_concat: ", concatList);

/** push
 * value: 值
 * return: 返回新数组
 */
Array.prototype.weko_push = function (value) {
  this[this.length] = value;
  return this;
};

const pushList = list.weko_push(6);
console.log("weko_push: ", pushList);

/** pop
 * return: 返回新数组
 */
Array.prototype.weko_pop = function () {
  let result = this.slice(0, this.length - 1);
  return result;
};

const popList = list.weko_pop();
console.log("weko_pop: ", popList);

/** shift
 * return: 返回新数组
 */
Array.prototype.weko_shift = function () {
  let result = this.slice(1);
  return result;
};

const shiftList = list.weko_shift();
console.log("weko_shift: ", shiftList);

/** unshift
 * value: 值
 * return: 返回新数组
 */
Array.prototype.weko_unshift = function (value) {
  let result = [value];
  for (let i = 0; i < this.length; i++) {
    result.push(this[i]);
  }
  return result;
};

const unshiftList = list.weko_unshift(0);
console.log("weko_unshift: ", unshiftList);

/** splice
 * start: 开始位置
 * deleteCount: 删除个数
 * value: 插入值
 * return: 返回新数组
 * 截取长度和替换长度的比较，不同情况下的处理
 */
Array.prototype.weko_splice = function (start, length, ...values) {
  if (length === 0) return [];
  length = start + length > this.length - 1 ? this.length - start : length;
  console.log(length);
  const res = [],
    tempArr = [...this];
  for (let i = start; i < start + values.length; i++) {
    this[i] = values[i - start];
  }
  this.length = start + values.length;
  if (values.length < length) {
    const cha = length - values.length;
    console.log(cha);
    for (let i = start + values.length; i < tempArr.length; i++) {
      this[i] = tempArr[i + cha];
    }
    this.length = this.length - cha;
  }
  if (values.length > length) {
    for (let i = start + length; i < tempArr.length; i++) {
      this.push(tempArr[i]);
    }
  }
  for (let i = start; i < start + length; i++) {
    res.push(tempArr[i]);
  }
  return res;
};

const spliceList = list.weko_splice(1, 2, { id: 6, name: "pear" });
console.log("weko_splice: ", spliceList);
