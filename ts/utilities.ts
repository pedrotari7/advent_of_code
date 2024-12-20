import { readFileSync } from 'node:fs';

let isDeno = false;
if (globalThis.window && 'Deno' in globalThis.window) {
  isDeno = true;
}

// Timer
export const timer = {
  start: (id = 'Elapsed Time') => console.time(id),
  stop: (id = 'Elapsed Time') => console.timeEnd(id),
};

export const timeit = (cb: () => void) => {
  timer.start();
  cb();
  timer.stop();
};

// Read from file operations

const getFile = (day: number): string =>
  isDeno ? Deno.readTextFileSync(`${day}.in`) : readFileSync(`${day}.in`, { encoding: 'utf8', flag: 'r' });

export const getDataFromFile = (day: number) => getFile(day).trimEnd();

export const getSplittedDataFromFile = (day: number, dele = '\n') => getDataFromFile(day).split(dele);

export const getIntArrayFromFile = (day: number, dele = '\n') => getSplittedDataFromFile(day, dele).map(int10);

export const getMatrixFromFile = <T>(
  day: number,
  xdele = '\n',
  eleFunc: (s: string, r?: number, c?: number) => T = s => s as unknown as T,
  ydele = '\n'
) => getSplittedDataFromFile(day, ydele).map((row, r) => row.split(xdele).map((s, c) => eleFunc(s, r, c)));

export const getCharMatrixFromFile = (day: number, dele = '\n') =>
  getSplittedDataFromFile(day).map((row: string) => row.split(dele));

const getNumberMatrixFromFile = (day: number, func: (s: string) => number, dele = '\n') =>
  getSplittedDataFromFile(day).map((row: string) => row.split(dele).map(func));

export const getIntMatrixFromFile = (day: number, dele = '') => getNumberMatrixFromFile(day, int10, dele);

export const getFloatMatrixFromFile = (day: number, dele = '\n') => getNumberMatrixFromFile(day, parseFloat, dele);

// Point Array Operations
export type Point = { x: number; y: number };

export const getPointArrayFromMatrix = (day: number, pred: (c: string) => boolean, dele = '\n') =>
  getCharMatrixFromFile(day, dele).reduce<Point[]>((a, row, y) => {
    row.forEach((c, x) => {
      if (pred(c)) a.push({ x, y });
    });
    return a;
  }, []);

export const getPointSetFromMatrix = (
  day: number,
  pred: (c: string) => boolean,
  dele = '\n',
  extraPred?: (c: string) => boolean
) =>
  getCharMatrixFromFile(day, dele).reduce(
    (a, row, y) => {
      row.forEach((c, x) => {
        if (pred(c)) a.grid.add({ x, y });
        if (extraPred?.(c)) a.extra.push({ x, y });
      });
      return a;
    },
    { grid: new SetS<Point>(), extra: [] as Point[] }
  );

// String Operations

export const sortStr = (s: string, t: (k: string) => string = k => k) => s.split('').map(t).sort().join('')!;

// Number operations

export const int10 = (n: string) => parseInt(n);

export const int = (n: string, radix = 10) => parseInt(n, radix);

export const gcd = (a: number, b: number): number => (a ? gcd(b % a, a) : b);

export const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

export const bin = (n: number[] | string) =>
  isArray(n) ? parseInt((n as number[]).join(''), 2) : parseInt(n as string, 2);

export const isNumeric = (value: string) => /^-?\d+$/.test(value);

export const inRange = (value: number, low: number, hi: number) => value >= low && value <= hi;

export const isEmpty = <T>(a: T[]) => a.length === 0;

// Array operations

export const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);

export const sumFun = <T>(a: T[], fn: (n: T, idx: number) => number) => a.reduce((x, y, i) => x + fn(y, i), 0);

export const mult = (a: number[]) => a.reduce((x, y) => x * y, 1);

export const max = (a: number[]) => Math.max(...a);

export const min = (a: number[]) => Math.min(...a);

export const minArray = (c: number[]) => c.reduce((b, n) => Math.min(b, n));

export const mid = <T>(a: T[]) => a[a.length >> 1];

export const nums = (a: string) => a.match(/-?\d+/g)?.map(int10) ?? [];

export const str2num = (a: string[]) => a.map(e => Number(e));

export const isArray = <T>(v: unknown): v is Array<T> => Array.isArray(v);

export const fill = <T>(n: number, d: T) => new Array<T>(n).fill(d);

export const fill2D = <T>(r: number, c: number, d: T): T[][] => Array.from(Array(r), _ => Array(c).fill(d));

export const equals = <T>(a: T[], b: T[]) => a.every((c, i) => c === b[i]);

export const stepDiff = (a: number[]) => a.slice(1).map((v, i) => v - a[i]);

export const transpose = <T>(a: T[][]): T[][] => a[0].map((_, i) => a.map(row => row[i]));

export const isInBounds = <T>(a: T[][], r: number, c: number) => r >= 0 && r < a.length && c >= 0 && c < a[0].length;

function augmentGenerator<T, M, A extends any[]>(gf: (...a: A) => Generator<T>, m: M & ThisType<Generator<T> & M>) {
  Object.assign(gf.prototype, m);
  return gf as (...a: A) => Generator<T> & M;
}

export const range = augmentGenerator(
  function* (start: number, end?: number) {
    if (end === undefined) {
      end = start;
      start = 0;
    }
    for (let i = start; i < end; i++) {
      yield i;
    }
  },
  {
    map: function <K>(fn: (arg0: number) => K) {
      const acc: K[] = [];
      for (const i of this) {
        acc.push(fn(i));
      }
      return acc;
    },
    reduce: function <T, K>(fn: (acc: K, arg0: number, idx?: number) => K, acc: K) {
      let idx = 0;
      for (const i of this) {
        acc = fn(acc, i, idx);
        idx++;
      }
      return acc;
    },
    filter: function (pred: (arg0: number) => boolean) {
      const arr: number[] = [];
      for (const i of this) {
        if (pred(i)) arr.push(i);
      }
      return arr;
    },
  }
);

export const binRange = (start: number, end: number, pad: number) =>
  Array.from({ length: end - start }, (_, i) =>
    BigInt(start + i)
      .toString(2)
      .padStart(pad, '0')
  );

export const sortDesc = (a: number[]) => a.sort((a, b) => b - a);
export const sortA = (a: number[]) => a.sort((a, b) => a - b);

export const sortAsc = <T>(c: T[], cmp = (a: T, b: T) => (a as unknown as number) - (b as unknown as number)) =>
  c.sort(cmp);

export const zip = <T, X>(a: T[], b: X[]): [T, X][] => a.map((e, i) => [e, b[i]]);

export const prod = (a: number[], n: number) => a.map(v => v * n);

export const addArrays = <T extends number[]>(a: T, b: T) => a.map((c, i) => c + b[i]) as T;

export const subArrays = <T extends number[]>(a: T, b: T) => a.map((c, i) => c - b[i]) as T;

export const hasNoRepeats = <T>(a: T[]) => a.length == new Set(a).size;

export const pairs = <T>(a: T[]) => {
  const result: [T, T][] = [];
  for (let i = 0; i < a.length - 1; i += 2) {
    result.push([a[i], a[i + 1]]);
  }
  return result;
};

export const occurrences = <T extends string | number>(a: T[]) =>
  a.reduce((acc, curr) => acc.set(curr, (acc.get(curr) ?? 0) + 1), new Map<T, number>());

export type Grid = number[][];

export type RecursiveArray<T> = Array<RecursiveArray<T> | T>;

export const getArrayIndexes = (g: Grid, opts = { rmin: 0, rmax: g.length, cmin: 0, cmax: g[0].length }) =>
  sortAsc([...product([...range(opts.cmin, opts.cmax)], [...range(opts.rmin, opts.rmax)])], (a, b) => a[0] - b[0]);

export const dirs: Record<string, [number, number]> = {
  N: [1, 0],
  NE: [1, 1],
  E: [0, 1],
  SE: [-1, 1],
  S: [-1, 0],
  SW: [-1, -1],
  W: [0, -1],
  NW: [1, -1],
};

export const dirs_no_diag: Record<string, [number, number]> = {
  N: [1, 0],
  E: [0, 1],
  S: [-1, 0],
  W: [0, -1],
};

export const dirs_grid: Record<string, [number, number]> = {
  N: [-1, 0],
  NE: [-1, 1],
  E: [0, 1],
  SE: [1, 1],
  S: [1, 0],
  SW: [1, -1],
  W: [0, -1],
  NW: [-1, -1],
};

export const dirs_no_diag_grid: Record<string, [number, number]> = {
  N: [-1, 0],
  E: [0, 1],
  S: [1, 0],
  W: [0, -1],
};

export const dirs_grid_diag: Record<string, [number, number]> = {
  NE: [-1, 1],
  SE: [1, 1],
  SW: [1, -1],
  NW: [-1, -1],
};

export const DIR_NO_DIAG = Object.values(dirs_no_diag);

export const DIR_DIAG = Object.values(dirs);

export const DIR_NO_DIAG_GRID = Object.values(dirs_no_diag_grid);

export const DIR_DIAG_GRID = Object.values(dirs_grid);

// Object Operations

export const isEmptyObject = (obj: unknown) =>
  obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;

export const deepCopy = <T>(obj: T) => JSON.parse(JSON.stringify(obj)) as T;

type ComputedProperty = string | number | symbol;

export const initMap = <T>(arr: ComputedProperty[], v: T): Record<ComputedProperty, T> =>
  arr.reduce((acc, d) => ({ ...acc, [d]: v }), {});

// Set Operations

export const intersect = <T>(...b: (Set<T> | T[])[]) =>
  b.map(v => new Set(v)).reduce((acc, s) => new Set([...acc].filter(i => s.has(i))));

export const difference = <T>(a: Set<T>, b: Set<T>) => new Set([...a].filter(x => !b.has(x)));

// deno-lint-ignore ban-types
export class SetS<T extends Object> extends Set {
  constructor(items?: Iterable<T> | null | undefined, parse: boolean = false) {
    super();
    for (const item of items ?? []) {
      super.add(JSON.stringify(parse ? JSON.parse(item as unknown as string) : item));
    }
  }

  add = (value: T) => super.add(JSON.stringify(value));
  has = (value: T) => super.has(JSON.stringify(value));
  delete = (value: T) => super.delete(JSON.stringify(value));
  values = () => {
    return [...super.values()].map(v => JSON.parse(v)).values();
  };
}

export class MapS<T, K> extends Map {
  constructor(entries?: Iterable<[T, K]> | null | undefined) {
    super();
    for (const [key, value] of entries ?? []) {
      super.set(JSON.stringify(key), value);
    }
  }

  override set = (key: T, value: K) => super.set(JSON.stringify(key), value);
  override get = (key: T) => super.get(JSON.stringify(key));
  override has = (key: T) => super.has(JSON.stringify(key));
  override delete = (key: T) => super.delete(JSON.stringify(key));
  override keys = () => {
    return [...super.keys()].map(v => JSON.parse(v)).values();
  };
}

// Intervals
export class Interval {
  constructor(public low: number, public high: number) {}
  get size() {
    return this.high - this.low;
  }

  intersection = (b: Interval) => new Interval(Math.max(this.low, b.low), Math.min(this.high, b.high));
  intersects = (b: Interval) =>
    (this.low <= b.high && this.low >= b.low) || (this.high <= b.high && this.high >= b.low);

  union = (b: Interval[]) => {
    const intervals = [this, ...b].sort((a, b) => a.low - b.low);

    const result = [];
    let previous = intervals[0];

    for (let i = 1; i < intervals.length; i += 1) {
      if (previous.high + 1 >= intervals[i].low) {
        previous = new Interval(previous.low, Math.max(previous.high, intervals[i].high));
      } else {
        result.push(previous);
        previous = intervals[i];
      }
    }

    result.push(previous);

    return result;
  };
  includes = (n: number) => n >= this.low && n <= this.high;
}

// itertools

export const perm = <T>(list: T[], maxLen: number, repeat = true) => {
  const perm = list.map(val => [val]);
  const generate = (perm: T[][], max: number, currLen: number): T[][] => {
    if (currLen === max) {
      return perm;
    }
    for (let i = 0, len = perm.length; i < len; i++) {
      const currPerm = perm.shift()!;
      for (let k = 0; k < list.length; k++) {
        if (k === i && !repeat) continue;
        perm.push(currPerm.concat(list[k]));
      }
    }
    return generate(perm, max, currLen + 1);
  };
  return generate(perm, maxLen, 1);
};

export const combinations = function* <T>(array: T[], r: number) {
  const n = array.length;

  if (r > n) return;
  const indices = [...range(0, r)];
  yield indices.map(k => array[k]);
  while (true) {
    let idx = -1;
    for (const i of [...range(0, r)].reverse()) {
      if (indices[i] != i + n - r) {
        idx = i;
        break;
      }
    }
    if (idx === -1) return;
    indices[idx] += 1;
    for (const j of range(idx + 1, r)) {
      indices[j] = indices[j - 1] + 1;
    }
    yield indices.map(k => array[k]);
  }
};

export const product = function* <T>(...pools: T[][]) {
  let i = 0;
  const indexes = new Array(pools.length).fill(0);
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
};

export const repeat = function* (object: Record<string, unknown>, times = 1) {
  for (const _ in range(0, times)) {
    yield object;
  }
};

export const pairsWithoutRepeats = function* <T>(array: T[]) {
  for (let a = 0; a < array.length - 1; a++) {
    for (let b = a + 1; b < array.length; b++) {
      yield [array[a], array[b]];
    }
  }
};

// String operations

export const reverse = <T>(s: T[]) => [...s].reverse().join('');

export const isString = (v: unknown) => typeof v === 'string' || v instanceof String;

export const charCount = (str: string, chr: string) => str.split('').reduce((r, c) => (c === chr ? r + 1 : r), 0);

export const charCode = (str: string) => str.charCodeAt(0);

export const isDigit = (c: string) => c.length == 1 && c >= '0' && c <= '9';

// Distances

export const manhattanOrigin = (x: number, y: number) => Math.abs(x) + Math.abs(y);

export const manhattan = (x1: number, y1: number, x2: number, y2: number) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

// Trig Operations

export const radians = (degrees: number) => (degrees * Math.PI) / 180;
export const degrees = (radians: number) => (radians * 180) / Math.PI;

export const cosd = (deg: number) => Math.cos(radians(deg));
export const sind = (deg: number) => Math.sin(radians(deg));

// Priority Queue
class QElement<T> {
  constructor(public element: T, public priority: number) {}
}

export class PriorityQueue<T> {
  constructor(private items: QElement<T>[] = []) {}

  get length() {
    return this.items.length;
  }

  enqueue = (element: T, priority: number) => {
    const qElement = new QElement(element, priority);

    if (this.isEmpty() || (!this.isEmpty() && priority >= this.items[this.items.length - 1].priority)) {
      this.items.push(qElement);
    }

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > priority) {
        this.items.splice(i, 0, qElement);
        break;
      }
    }
  };

  dequeue = () => this.items.shift()?.element!;

  isEmpty = () => this.items.length == 0;
}

// HEX / BIN
export const hexToBinary = (hex: string) => {
  let binary = '';
  let remainingSize = hex.length;
  for (let p = 0; p < hex.length / 8; p++) {
    const blockSize = remainingSize < 8 ? remainingSize : 8;

    binary += parseInt(hex.substr(p * 8, blockSize), 16)
      .toString(2)
      .padStart(blockSize * 4, '0');

    remainingSize -= blockSize;
  }
  return binary;
};

// MD5u

const safeAdd = (x: number, y: number) => {
  const lsw = (x & 0xffff) + (y & 0xffff);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xffff);
};

const bitRotateLeft = (num: number, cnt: number) => (num << cnt) | (num >>> (32 - cnt));

const md5cmn = (q: number, a: number, b: number, x: number, s: number, t: number) =>
  safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);

const md5ff = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) =>
  md5cmn((b & c) | (~b & d), a, b, x, s, t);

const md5gg = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) =>
  md5cmn((b & d) | (c & ~d), a, b, x, s, t);

const md5hh = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) =>
  md5cmn(b ^ c ^ d, a, b, x, s, t);

const md5ii = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) =>
  md5cmn(c ^ (b | ~d), a, b, x, s, t);

const binlMD5 = (x: number[], len: number) => {
  x[len >> 5] |= 0x80 << len % 32;
  x[(((len + 64) >>> 9) << 4) + 14] = len;

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

const binl2rstr = (input: number[]) => {
  let output = '';
  const length32 = input.length * 32;
  for (let i = 0; i < length32; i += 8) {
    output += String.fromCharCode((input[i >> 5] >>> i % 32) & 0xff);
  }
  return output;
};

const rstr2binl = (input: string) => {
  const output: number[] = [];
  output[(input.length >> 2) - 1] = -1; // undefined;
  for (let i = 0; i < output.length; i += 1) {
    output[i] = 0;
  }
  const length8 = input.length * 8;
  for (let i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;
  }
  return output;
};

const rstrMD5 = (s: string) => binl2rstr(binlMD5(rstr2binl(s), s.length * 8));

const rstr2hex = (input: string) => {
  const hexTab = '0123456789abcdef';
  let output = '';
  for (let i = 0; i < input.length; i += 1) {
    const x = input.charCodeAt(i);
    output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f);
  }
  return output;
};

const str2rstrUTF8 = (input: string) => unescape(encodeURIComponent(input));

export const md5 = (string: string) => rstr2hex(rstrMD5(str2rstrUTF8(string)));

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

export const intCode = (d: number[], inputs: number[], inst = 0, lastOutput = 0) => {
  const getDigit = (num: number, pos: number) => Math.floor(num / Math.pow(10, pos)) % 10;

  const arg = (m: number, val: number) => (m === 0 ? d[val] : val);

  const parseOpcode = (k: number) => [
    d[k] % 100,
    arg(getDigit(d[k], 2), d[k + 1]),
    arg(getDigit(d[k], 3), d[k + 2]),
    arg(getDigit(d[k], 4), d[k + 3]),
  ];

  const output = lastOutput;
  let inputCount = 0;
  let i = inst;

  // eslint-disable-next-line no-constant-condition
  while (1) {
    const [op, a1, a2] = parseOpcode(i);
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
