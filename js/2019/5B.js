const { getSplittedDataFromFile, str2num } = require('../utilities');

const d = str2num(getSplittedDataFromFile(5, ','));

const getDigit = (num, pos) => Math.floor(num / Math.pow(10, pos)) % 10;

const arg = (m, val) => m === 0 ? d[val] : val;

const parseOpcode = k => [
  d[k] % 100,
  arg(getDigit(d[k], 2), d[k + 1]),
  arg(getDigit(d[k], 3), d[k + 2]),
  arg(getDigit(d[k], 4), d[k + 3])
];

const ADD = 1, MUL = 2, IN = 3, OUT = 4, JUMP_IF_TRUE = 5, JUMP_IF_FALSE = 6, LESS_THAN = 7, EQUALS = 8, HALT = 99;

const INPUT = 5;
let i = 0;

while (1) {
  let [ op, a1, a2 ] = parseOpcode(i);
  if (op === ADD) {
    d[d[i + 3]] = a1 + a2;
    i += 4;
  } else if (op === MUL) {
    d[d[i + 3]] = a1 * a2;
    i += 4;
  } else if (op === IN) {
    d[d[i + 1]] = INPUT;
    i += 2;
  } else if (op === OUT) {
    console.log('output', a1);
    i += 2;
  } else if (op === JUMP_IF_TRUE) {
    i = a1 !== 0 ? a2 : i + 3;
  } else if (op === JUMP_IF_FALSE) {
    i = a1 === 0 ? a2 : i + 3;
  } else if (op === LESS_THAN) {
    d[d[i + 3]] = Number(a1 < a2);
    i += 4;
  } else if (op === EQUALS) {
    d[d[i + 3]] = Number(a1 === a2);
    i += 4;
  } else if (op === HALT) {
    break;
  }
}
