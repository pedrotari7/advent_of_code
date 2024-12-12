import { timer, getSplittedDataFromFile, int10, MapS, sum } from '../utilities.ts';

timer.start();

const stones = getSplittedDataFromFile(11, ' ');

const norm = (s: string, n = 1) => String(int10(s) * n);

const memo = new MapS<[string, number], number>();

const solve = (x: string, t: number): number => {
  if (memo.has([x, t])) return memo.get([x, t])!;

  let ret = 0;

  if (t === 0) {
    ret = 1;
  } else if (x === '0') {
    ret = solve('1', t - 1);
  } else if (x.length % 2 === 0) {
    ret = solve(norm(x.slice(0, x.length >> 1)), t - 1) + solve(norm(x.slice(x.length >> 1)), t - 1);
  } else {
    ret = solve(norm(x, 2024), t - 1);
  }
  memo.set([x, t], ret);

  return ret;
};

const solveAll = (n: number) => sum(stones.map(s => solve(s, n)));

console.log('p1', solveAll(25));
console.log('p2', solveAll(75));

timer.stop();
