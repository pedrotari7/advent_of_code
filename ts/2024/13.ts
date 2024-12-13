import { timer, getSplittedDataFromFile } from '../utilities.ts';

timer.start();

const data = getSplittedDataFromFile(13, '\n\n').map(s => [...s.matchAll(/(\d+)/g)].map(m => +m[0]));

const det = (a: number[][]) => a[0][0] * a[1][1] - a[0][1] * a[1][0];

const isInteger = (n: number) => n % 1 === 0;

const inv = (a: number[][]) => {
  const d = det(a);
  return [
    [a[1][1] / d, -a[0][1] / d],
    [-a[1][0] / d, a[0][0] / d],
  ];
};

const getSol = (inverse: number[][], X: number, Y: number) => {
  const [a, b] = inverse.map(([x, y]) => Math.round((x * X + y * Y) * 100) / 100);
  return isInteger(a) && isInteger(b) ? 3 * a + b : 0;
};

const { p1, p2 } = data.reduce(
  ({ p1, p2 }, [AX, AY, BX, BY, X, Y]) => {
    const inverse = inv([
      [AX, BX],
      [AY, BY],
    ]);

    const offset = 10_000_000_000_000;
    return { p1: p1 + getSol(inverse, X, Y), p2: p2 + getSol(inverse, X + offset, Y + offset) };
  },
  { p1: 0, p2: 0 }
);

console.log('p1', p1);
console.log('p2', p2);

timer.stop();
