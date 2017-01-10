// @flow

import { warn } from './debug';

export function validateOptions (
  settings: Object,
  types: Object
): boolean {
  let result = true;
  for (const key in types) {
    const expectedTypes = [];
    let type = types[key];
    let value = settings[key];
    let valid = false;
    if (!Array.isArray(types[key])) type = [type];
    for (let i = 0; i < type.length && !valid; i++) {
      const assertedType = assertType(value, type[i]);
      // const assertedType = assertType(value);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
    if (!valid) {
      warn(
        'Invalid prop: type check failed for prop "' + key + '".' +
        ' Expected ' + expectedTypes.map(capitalize).join(', ') +
        ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.'
      );
      result = false;
    }
  }
  return result;
}

/**
 * Assert the type of a value
 */
function assertType (value: any, type: Function): {
  valid: boolean,
  expectedType: ?string
} {
  let valid;
  let expectedType = getType(type);
  if (expectedType === 'String') {
    valid = typeof value === (expectedType = 'string');
  } else if (expectedType === 'Number') {
    valid = typeof value === (expectedType = 'number');
  } else if (expectedType === 'Boolean') {
    valid = typeof value === (expectedType = 'boolean');
  } else if (expectedType === 'Function') {
    valid = typeof value === (expectedType = 'function');
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  const match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match && match[1];
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
const toString = Object.prototype.toString;
const OBJECT_STRING = '[object Object]';
export function isPlainObject (obj: any): boolean {
  return toString.call(obj) === OBJECT_STRING;
}


/**
 * Capitalize a string.
 */
export const capitalize = cached((str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

/**
 * Create a cached version of a pure function.
 */
export function cached<F: Function> (fn: F): F {
  const cache = Object.create(null);
  return (function cachedFn (str: string) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  }: any);
}
