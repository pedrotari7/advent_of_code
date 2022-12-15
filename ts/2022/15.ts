import { timer, getSplittedDataFromFile, int10, manhattan, sum, range, Interval } from '../utilities.ts';

timer.start();

type Info = { sx: number; sy: number; bx: number; by: number; d: number };

const rows: Interval[][] = [];

const info = getSplittedDataFromFile(15).reduce((info, row) => {
  const [sx, sy, bx, by] = [...row.matchAll(/-?\d+/g)].flatMap(s => int10(s.pop()!));
  info.push({ sx, sy, bx, by, d: manhattan(sx, sy, bx, by) });
  return info;
}, [] as Info[]);

const Y = 2000000;
const N = 4000000;

const interval = (sensor: Info, n: number) => new Interval(sensor.sx - sensor.d + n, sensor.sx + sensor.d - n);

for (const i of range(0, N + 1)) {
  for (const sensor of info) {
    const dist = manhattan(sensor.sx, sensor.sy, sensor.sx, i);
    if (dist < sensor.d) {
      rows[i] = interval(sensor, dist).union(rows[i] ?? []);
      if (i !== Y) {
        rows[i] = rows[i].map(it => new Interval(0, N).intersection(it));
      }
    }
  }
  if (i === Y) {
    console.log('p1', sum(rows[Y].map(it => it.size)));
  }

  if (rows[i].length > 1) {
    console.log('p2', (rows[i][0].high + 1) * 4000000 + i);
    break;
  }
}

timer.stop();
