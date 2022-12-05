import { timer, getMatrixFromFile, range, inRange, int, sortDesc, mult, addArrays } from '../utilities.ts';

timer.start();

const data = getMatrixFromFile(9, '', s => ({ n: int(s), visited: int(s) === 9 }));

const dir = [
  [-1, +0],
  [+0, +1],
  [+1, +0],
  [+0, -1],
];

const basins = [];

const valid = (p: number[]) =>
  inRange(p[1], 0, data[0].length - 1) && inRange(p[0], 0, data.length - 1) && !data[p[1]][p[0]].visited;

const startingPoints = range(0, data[0].length).flatMap(x => range(0, data.length).map(y => [x, y]));

for (const point of startingPoints) {
  let current = 0;
  if (data[point[1]][point[0]].visited) continue;

  let q = [point];

  while (q.length) {
    const p = q.pop()!;

    if (valid(p)) {
      data[p[1]][p[0]].visited = true;
      current += 1;
      q = q.concat(dir.map(d => addArrays(p, d)));
    }
  }

  basins.push(current);
}

console.log(`basins`, mult(sortDesc(basins).slice(0, 3)));
timer.stop();
