/**
 * compare two version and return the greater one
 * @example
 * compare('1.0.0', '0.1.1') => 0
 * compare('1.0.0', '1.0.0') => -1
 * compare('1.0', '1.1.1') => 1
 */
export function compare(v1: string, v2: string): 0 | 1 | -1 {
  const vArr1 = v1.split('.').map((item) => +item.trim())
  const vArr2 = v2.split('.').map((item) => +item.trim())
  while (vArr1.length > vArr2.length) {
    vArr2.push(0)
  }
  while (vArr1.length < vArr2.length) {
    vArr1.push(0)
  }
  for (let i = 0; i < vArr1.length; i++) {
    if (vArr1[i] > vArr2[i]) {
      return 0
    }
    if (vArr1[i] < vArr2[i]) {
      return 1
    }
  }
  return -1
}

/**
 * v1 is lesser than v2
 * v1 小于 v2
 */
export const lt = (v1: string, v2: string) => compare(v1, v2) === 1
/**
 * v1 is greater than v2
 * v1 大于 v2
 */
export const gt = (v1: string, v2: string) => compare(v1, v2) === 0
/**
 * v1 is equal to v2
 * v1 等于 v2
 */
export const e = (v1: string, v2: string) => compare(v1, v2) === -1
/**
 * v1 is greater than or equal to v2
 * v1 大于等于 v2
 */
export const gte = (v1: string, v2: string) => compare(v1, v2) !== 1
/**
 * v1 is lesser than or equal to v2
 * v1 小于等于 v2
 */
export const lte = (v1: string, v2: string) => compare(v1, v2) !== 0
