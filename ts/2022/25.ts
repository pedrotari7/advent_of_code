import { timer, getSplittedDataFromFile, sum } from '../utilities.ts';

timer.start();

const table: Record<string, number> = { 0: 0, 1: 1, 2: 2, '-': -1, '=': -2 };

const digits = '012=-';

const fromSNAFU = (s: string) =>
  s
    .split('')
    .map(e => table[e])
    .reduceRight((n, c, i) => n + c * Math.pow(5, s.length - i - 1));

const toSNAFU = (n: number) => {
  let i = 1;
  let snafu = '';

  while (n > 0) {
    const d = n % 5;
    snafu = digits[d] + snafu;
    n = (n - d) / 5 + +(d > 2);
    i++;
  }

  return snafu;
};

console.log('p1', toSNAFU(sum(getSplittedDataFromFile(25).map(fromSNAFU))));

timer.stop();
