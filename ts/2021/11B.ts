import { timer, getIntMatrixFromFile, perm, addArrays, Grid, getArrayIndexes, inRange } from '../utilities.ts';

timer.start();

let dumbos = getIntMatrixFromFile(11);

const dir = perm([0, 1, -1], 2).filter((d) => d[0] !== 0 || d[1] !== 0);

const hasTens = (g: Grid) => g.some((g) => g.reduce((s, d) => (s ? s : d === 10), false));

const allZeros = (g: Grid) => g.every((g) => g.every((d) => d === 0));

let count = 0;

while (!allZeros(dumbos)) {
  dumbos = dumbos.map((d) => d.map((o) => o + 1));

  while (hasTens(dumbos)) {
    for (const [r, c] of getArrayIndexes(dumbos)) {
      if (dumbos[r][c] === 10) {
        dumbos[r][c] = 0;
        for (const d of dir) {
          const [rr, cc] = addArrays([r, c], d);
          if (inRange(rr, 0, dumbos.length - 1) && inRange(cc, 0, dumbos[0].length - 1)) {
            if (inRange(dumbos[rr][cc], 1, 9)) {
              dumbos[rr][cc] += 1;
            }
          }
        }
      }
    }
  }
  count += 1;
}
console.log(count);

timer.stop();
