// Equality comparison for objects
export const isEqual = (left, right) => {
  const OBJECT_STRING = '[object Object]';

  if (typeof left !== 'object' || typeof right !== 'object') {
    return left === right;
  }

  if (left === null || right === null) return left === right;

  const leftArray = Array.isArray(left);
  const rightArray = Array.isArray(right);

  if (leftArray !== rightArray) return false;

  const leftPlainObject = Object.prototype.toString.call(left) === OBJECT_STRING;
  const rightPlainObject = Object.prototype.toString.call(right) === OBJECT_STRING;

  if (leftPlainObject !== rightPlainObject) return false;

  if (!leftPlainObject && !leftArray) return false;

  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);

  if (leftKeys.length !== rightKeys.length) return false;

  const keySet = {};
  for (let i = 0; i < leftKeys.length; i += 1) {
    keySet[leftKeys[i]] = true;
  }
  for (let i = 0; i < rightKeys.length; i += 1) {
    keySet[rightKeys[i]] = true;
  }
  const allKeys = Object.keys(keySet);
  if (allKeys.length !== leftKeys.length) {
    return false;
  }

  const l = left;
  const r = right;
  const pred = key => isEqual(l[key], r[key]);

  return allKeys.every(pred);
};

export const genUUID = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8; // eslint-disable-line no-bitwise
    return v.toString(16);
  });
