import { timer, getIntMatrixFromFile, range, perm, addArrays, inRange, Grid, getArrayIndexes } from '../utilities.ts';

timer.start();

let dumbos = getIntMatrixFromFile(11);

const dir = perm([0, 1, -1], 2).filter((d) => d[0] !== 0 || d[1] !== 0);

const hasTens = (g: Grid) => g.some((g) => g.reduce((s, d) => (s ? s : d === 10), false));

const flashes = range(0, 100).reduce((f) => {
  dumbos = dumbos.map((d) => d.map((o) => o + 1));

  while (hasTens(dumbos)) {
    for (const [r, c] of getArrayIndexes(dumbos)) {
      if (dumbos[r][c] === 10) {
        dumbos[r][c] = 0;
        f += 1;
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
  return f;
}, 0);

console.log(flashes);

timer.stop();
