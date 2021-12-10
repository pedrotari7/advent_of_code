import { timer, getIntMatrixFromFile, range, inRange, addArrays } from '../utilities.ts';

timer.start();

const data = getIntMatrixFromFile(9, '');

const dir = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

const valid = (p: number[]) => inRange(p[0], 0, data[0].length - 1) && inRange(p[1], 0, data.length - 1);

const coord = range(0, data[0].length).flatMap((x) => range(0, data.length).map((y) => [x, y]));

const result = coord.reduce((r, [j, i]) => {
  if (dir.map((d) => addArrays(d, [j, i])).every((p) => !valid(p) || (valid(p) && data[p[1]][p[0]] > data[i][j]))) {
    r += 1 + data[i][j];
  }
  return r;
}, 0);

console.log(result);

timer.stop();
