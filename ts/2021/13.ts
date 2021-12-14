import { timer, getSplittedDataFromFile, int, max, range } from '../utilities.ts';

timer.start();

const [dot, fol] = getSplittedDataFromFile(13, '\n\n');

let dots = dot.split('\n').map((d) => d.split(',').map(int));

const folds = fol
  .split('\n')
  .map((f) => f.split('='))
  .map(([d, n]) => [d[d.length - 1], int(n)]);

const dump = (a: number[][]) => {
  const xMax = max(a.map((d) => d[0])) + 1;
  const yMax = max(a.map((d) => d[1])) + 1;
  const s = range(0, yMax)
    .map((r) =>
      range(0, xMax)
        .map((c) => (isRepeated(dots, [c, r]) ? '#' : ' '))
        .join('')
    )
    .join('\n');

  console.log(s);
};

const isRepeated = <T>(a: T[][], d: T[]) => a.some((c) => c[0] === d[0] && c[1] === d[1]);

let k = 0;

for (const [dir, pos] of folds) {
  const [xMax, yMax] = [0, 1].map((i) => max(dots.map((d) => d[i])));

  if (dir === 'x') {
    dots = dots.map((dot) => (dot[0] > pos ? [Math.abs(dot[0] - xMax), dot[1]] : dot));
  } else if (dir === 'y') {
    dots = dots.map((dot) => (dot[1] > pos ? [dot[0], Math.abs(dot[1] - yMax)] : dot));
  }

  dots = dots.reduce((a, d) => (isRepeated(a, d) ? a : [...a, d]), [] as number[][]);

  if (k === 0) console.log(dots.length);
  k++;
}
dump(dots);

timer.stop();
