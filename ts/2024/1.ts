import { timer, getSplittedDataFromFile, transpose, zip, occurrences } from '../utilities.ts';

timer.start();

const [left, right] = transpose(getSplittedDataFromFile(1).map(row => row.split('   ').map(n => parseInt(n)))).map(
  row => row.toSorted()
);

const p1 = zip(left, right).reduce((acc, [a, b]) => acc + Math.abs(a - b), 0);

const occ = occurrences(right);

const p2 = left.reduce((acc, v) => acc + v * (occ.get(v) ?? 0), 0);

console.log('p1', p1);
console.log('p2', p2);

timer.stop();
