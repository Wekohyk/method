/** slice
 * start: 开始截取的字符索引
 * end: 结束截取的字符索引
 * start > end 返回空字符串
 * start < 0, start = str.length + start
 * end < 0, end = str.length + end
 */
String.prototype.weko_slice = function (start, end) {
  start = start || 0;
  end = end || this.length;
  start = start < 0 ? this.length + start : start;
  end = end < 0 ? this.length + end : end;
  if (start > end) {
    return "";
  }
  let res = "";
  for (let i = start; i < end; i++) {
    res += this[i];
  }
  return res;
};

const slice = "weko".weko_slice(1, 3);
console.log("weko_slice: ", slice);

/** substr
 * start：开始截取的字符索引(包含此字符)
 * length：截取的长度 注意点
 * start < 0, start = str.length + start
 * length < 0, length = 0
 * start + length > str.length, length = str.length - start
 * start + length < 0, length = 0
 * start + length < start, length = 0
 * start + length = start, length = 0
 * start + length = str.length, length = 0
 * start + length > str.length, length = str.length - start
 * start + length = str.length, length = 0
 */
String.prototype.weko_substr = function (start, length) {
  start = start || 0;
  length = length || this.length;
  start = start < 0 ? this.length + start : start;
  length = length < 0 ? 0 : length;
  if (start + length > this.length) {
    length = this.length - start;
  }
  let res = "";
  for (let i = start; i < start + length; i++) {
    res += this[i];
  }
  return res;
};

const substr = "weko".weko_substr(1, 3);
console.log("weko_substr: ", substr);

/** substring
 * start：开始截取的字符索引(包含此字符)
 * end：结束截取的字符索引(不包含此字符)
 * start > end, 交换start和end
 * start < 0, start = 0
 * end < 0, end = 0
 * start > str.length, start = str.length
 * end > str.length, end = str.length
 * start = end, 返回空字符串
 * start = str.length, 返回空字符串
 * end = str.length, 返回空字符串
 * start = 0, end = 0, 返回空字符串
 * start = 0, end = str.length, 返回整个字符串
 */
String.prototype.weko_substring = function (start, end) {
  start = start || 0;
  end = end || this.length;
  if (start > end) {
    [start, end] = [end, start];
  }
  start = start < 0 ? 0 : start;
  end = end < 0 ? 0 : end;
  start = start > this.length ? this.length : start;
  end = end > this.length ? this.length : end;
  let res = "";
  for (let i = start; i < end; i++) {
    res += this[i];
  }
  return res;
};

const substring = "weko".weko_substring(1, 3);
console.log("weko_substring: ", substring);

/** charAt
 * index: 字符索引
 * index < 0, 返回空字符串
 * index >= str.length, 返回空字符串
 */
String.prototype.weko_charAt = function (index) {
  if (index < 0 || index >= this.length) {
    return "";
  }
  return this[index];
};

const charAt = "weko".weko_charAt(1);
console.log("weko_charAt: ", charAt);

/** charCodeAt
 * index: 字符索引
 * index < 0, 返回NaN
 * index >= str.length, 返回NaN
 */
String.prototype.weko_charCodeAt = function (index) {
  if (index < 0 || index >= this.length) {
    return NaN;
  }
  return this.charCodeAt(index);
};

const charCodeAt = "weko".weko_charCodeAt(1);
console.log("weko_charCodeAt: ", charCodeAt);
