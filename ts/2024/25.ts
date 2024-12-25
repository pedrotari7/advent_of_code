import { timer, getSplittedDataFromFile, transpose, addArrays, sum } from '../utilities.ts';

timer.start();

const count = (s: string[][]) => s.map(l => l.filter(r => r === '#').length - 1);

const [locks, keys] = getSplittedDataFromFile(25, '\n\n').reduce<number[][][]>(
  (acc, ele) => {
    acc[+(ele[0][0] === '.')].push(count(transpose(ele.split('\n').map(e => e.split('')))));
    return acc;
  },
  [[], []]
);

console.log('p1', sum(locks.map(lock => sum(keys.map(key => +addArrays(key, lock).every(n => n <= 5))))));

timer.stop();
