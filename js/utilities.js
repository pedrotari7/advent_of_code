/* eslint-disable no-undef */
const fs = require('fs');

// Timer

const timer = {
  start: () => console.time('Elapsed Time'),
  stop: () => console.timeEnd('Elapsed Time'),
};

exports.timer = timer;

exports.timeit = (cb) => {
  timer.start();
  cb();
  timer.stop();
}

// Read from file operations

const getDataFromFile = day => fs.readFileSync(`${day}.in`, 'utf8');

exports.getDataFromFile = getDataFromFile;

const getSplittedDataFromFile = (day, dele = '\n') => getDataFromFile(day).split(dele);

exports.getSplittedDataFromFile = getSplittedDataFromFile;

exports.getIntArrayFromFile = (day) => getSplittedDataFromFile(day).map(int);

exports.getCharMatrixFromFile = (day, dele = '\n') => getSplittedDataFromFile(day).map(row => row.split(dele));

const getNumberMatrixFromFile = (day, func, dele) => getSplittedDataFromFile(day).map(row => row.split(dele).map(func));

exports.getIntMatrixFromFile = (day, dele = '\n') => getNumberMatrixFromFile(day, int, dele);

exports.getFloatMatrixFromFile = (day, dele = '\n') => getNumberMatrixFromFile(day, parseFloat, dele);;

// Number operations

const int = (n) => parseInt(n, 10)

exports.int = int;

exports.bin = n => isArray(n) ? parseInt(n.join(''), 2) : parseInt(n, 2);

exports.isNumeric = (value) => /^-?\d+$/.test(value)

exports.inRange = (value, low, hi) => value >= low && value <= hi;

exports.isEmpty = a => a.length === 0;

// Array operations

exports.sum = a => a.reduce((x, y) => x + y);

exports.mult = a => a.reduce((x, y) => x * y, 1);

exports.max = a => Math.max(...a);

exports.min = a => Math.min(...a);

exports.minArray = a => sortAsc(a, cmp = (a, b) => a[0] - b[0])[0];

exports.str2num = a => a.map(e => Number(e));

const isArray = v => Array.isArray(v);

exports.isArray = isArray;

exports.fill = (n, d = 0) => new Array(n).fill(d);

const range = (start, end) => Array.from({ length: end - start }, (_, i) => start + i)

exports.range = range;

exports.binRange = (start, end, pad) => Array.from({ length: end - start }, (_, i) => BigInt(start + i).toString(2).padStart(pad, '0'));

exports.sortDesc = a => a.sort();

const sortAsc = (a, cmp = (a, b) => a - b) => a.sort(cmp);

exports.sortAsc = sortAsc;

exports.zip = (a, b) => a.map((e, i) => [e, b[i]]);

exports.prod = (a, n) => a.map(v => v * n);

exports.addArrays = (a, b) => a.map((c, i) => c + b[i]);

// Object Operations

exports.deepCopy = obj => JSON.parse(JSON.stringify(obj));

exports.initMap = (arr, v) => arr.reduce((acc, d) => ({ ...acc, [d]: v }), {})

// Set Operations

exports.intersect = (a, b) => new Set([...a].filter(i => b.has(i)));

exports.difference = (a, b) => new Set([...a].filter(x => !b.has(x)))


// itertools

const perm = xs => {
  let ret = [];

  for (let i = 0; i < xs.length; i += 1) {
    let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

    if (!rest.length) {
      ret.push([xs[i]]);
    } else {
      for (let j = 0; j < rest.length; j += 1) {
        ret.push([xs[i]].concat(rest[j]));
      }
    }
  }
  return ret;
};

exports.perm = perm;

exports.combinations = function* (array, r) {
  const n = array.length;

  if (r > n) return;
  const indices = range(0, r);
  yield indices.map(k => array[k]);
  while (true) {
    let idx = -1;
    for (const i of range(0, r).reverse()) {
      if (indices[i] != i + n - r) {
        idx = i;
        break;
      };
    }
    if (idx === -1) return;
    indices[idx] += 1;
    for (const j of range(idx + 1, r)) {
      indices[j] = indices[j - 1] + 1
    }
    yield indices.map(k => array[k]);
  }
}

exports.product = function* (...pools) {
  let i = 0;
  const indexes = new Array(pools.length).fill(0)
  const result = indexes.map((x, i) => pools[i][x]);
  indexes[0] = -1;
  while (i < indexes.length) {
    if (indexes[i] < pools[i].length - 1) {
      indexes[i]++;
      result[i] = pools[i][indexes[i]];
      i = 0;
      yield result.slice();
    } else {
      indexes[i] = 0;
      result[i] = pools[i][0];
      i++;
    }
  }
}

exports.repeat = function* (object, times = 1) {
  for (const _ in range(0, times)) {
    yield object
  }
}

// String operations

exports.reverse = s => [...s].reverse().join("");

exports.isString = (v) => typeof v === 'string' || v instanceof String

exports.charCount = (str, chr) => str.split('').reduce((r, c) => c === chr ? r + 1 : r, 0);

// Distances

exports.manhattanOrigin = (x, y) => Math.abs(x) + Math.abs(y);

// Trig Operations

const radians = (degrees) => degrees * Math.PI / 180;
exports.radians = radians;

exports.cosd = (deg) => Math.cos(radians(deg));
exports.sind = (deg) => Math.sin(radians(deg));

// MD5u

const safeAdd = (x, y) => {
  const lsw = (x & 0xffff) + (y & 0xffff);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
};

const bitRotateLeft = (num, cnt) => num << cnt | num >>> 32 - cnt;

const md5cmn = (q, a, b, x, s, t) => safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);

const md5ff = (a, b, c, d, x, s, t) => md5cmn(b & c | ~b & d, a, b, x, s, t);

const md5gg = (a, b, c, d, x, s, t) => md5cmn(b & d | c & ~d, a, b, x, s, t);

const md5hh = (a, b, c, d, x, s, t) => md5cmn(b ^ c ^ d, a, b, x, s, t);

const md5ii = (a, b, c, d, x, s, t) => md5cmn(c ^ (b | ~d), a, b, x, s, t);

const binlMD5 = (x, len) => {
  x[len >> 5] |= 0x80 << len % 32;
  x[(len + 64 >>> 9 << 4) + 14] = len;

  let olda, oldb, oldc, oldd;
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;

  for (let i = 0; i < x.length; i += 16) {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;

    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);

    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);

    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);

    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);

    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }
  return [a, b, c, d];
};

const binl2rstr = input => {
  let output = '';
  const length32 = input.length * 32;
  for (let i = 0; i < length32; i += 8) {
    output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xff);
  }
  return output;
};

const rstr2binl = input => {
  const output = [];
  output[(input.length >> 2) - 1] = undefined;
  for (let i = 0; i < output.length; i += 1) {
    output[i] = 0;
  }
  const length8 = input.length * 8;
  for (let i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;
  }
  return output;
};

const rstrMD5 = s => binl2rstr(binlMD5(rstr2binl(s), s.length * 8));

const rstr2hex = input => {
  const hexTab = '0123456789abcdef';
  let output = '';
  for (let i = 0; i < input.length; i += 1) {
    let x = input.charCodeAt(i);
    output += hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f);
  }
  return output;
};

const str2rstrUTF8 = input => unescape(encodeURIComponent(input));

exports.md5 = string => rstr2hex(rstrMD5(str2rstrUTF8(string)));


// Intcode
const ADD = 1;
const MUL = 2;
const IN = 3;
const OUT = 4;
const JUMP_IF_TRUE = 5;
const JUMP_IF_FALSE = 6;
const LESS_THAN = 7;
const EQUALS = 8;
const HALT = 99;

exports.intCode = (d, inputs, inst = 0, lastOutput = 0) => {
  const getDigit = (num, pos) => Math.floor(num / Math.pow(10, pos)) % 10;

  const arg = (m, val) => m === 0 ? d[val] : val;

  const parseOpcode = k => [
    d[k] % 100, arg(getDigit(d[k], 2), d[k + 1]), arg(getDigit(d[k], 3), d[k + 2]), arg(getDigit(d[k], 4), d[k + 3])
  ];


  const output = lastOutput;
  let inputCount = 0;
  let i = inst;

  // eslint-disable-next-line no-constant-condition
  while (1) {
    let [op, a1, a2] = parseOpcode(i);
    if (op === ADD) {
      d[d[i + 3]] = a1 + a2;
      i += 4;
    } else if (op === MUL) {
      d[d[i + 3]] = a1 * a2;
      i += 4;
    } else if (op === IN) {
      d[d[i + 1]] = inputs[inputCount];
      inputCount += 1;
      i += 2;
    } else if (op === OUT) {
      i += 2;
      return { output: a1, op, i };
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
      return { output, op, i };
    }
  }
};
