const { getSplittedDataFromFile, str2num } = require('../utilities');

const d = str2num(getSplittedDataFromFile(9, ',')).reduce((obj, n, index) => {
  obj[index] = n;
  return obj;
}, {});

let base = 0;

const get = (a) => a in d ? d[a] : 0;

const getDigit = (num, pos) => Math.floor(num / Math.pow(10, pos)) % 10;

const arg = (m, val) => {
  switch (m) {
  case 0: return d[val];
  case 1: return val;
  case 2: return base + d[val];
  default: return 0;
  }
};

const parseOpcode = k => [
  d[k] % 100, arg(getDigit(d[k], 2), k + 1), arg(getDigit(d[k], 3), k + 2), arg(getDigit(d[k], 4), k + 3)
];

const ADD = 1;
const MUL = 2;
const IN = 3;
const OUT = 4;
const JUMP_IF_TRUE = 5;
const JUMP_IF_FALSE = 6;
const LESS_THAN = 7;
const EQUALS = 8;
const BASE_OFFSET = 9;
const HALT = 99;

const INPUT = 2;
let i = 0;

while (d[i] !== HALT) {
  let [ op, a1, a2, a3 ] = parseOpcode(i);
  if (op === ADD) {
    d[a3] = get(a1) + get(a2);
    i += 4;
  } else if (op === MUL) {
    d[a3] = get(a1) * get(a2);
    i += 4;
  } else if (op === IN) {
    d[a1] = INPUT;
    i += 2;
  } else if (op === OUT) {
    console.log('output', d[a1]);
    i += 2;
  } else if (op === JUMP_IF_TRUE) {
    i = get(a1) !== 0 ? get(a2) : i + 3;
  } else if (op === JUMP_IF_FALSE) {
    i = get(a1) === 0 ? get(a2) : i + 3;
  } else if (op === LESS_THAN) {
    d[a3] = Number(get(a1) < get(a2));
    i += 4;
  } else if (op === EQUALS) {
    d[a3] = Number(get(a1) === get(a2));
    i += 4;
  } else if (op === BASE_OFFSET) {
    base += get(a1);
    i += 2;
  } else {
    throw Error(`Invalid op: ${op}`);
  }
}

