import { timer, getSplittedDataFromFile, int } from '../utilities.ts';

timer.start();

const value = (k: string) => int(k);
const parse = (s: string) => s.split('=')[1].split('..').map(value);

const [xmin, xmax, ymin, ymax] = getSplittedDataFromFile(17, ',').flatMap(parse);

const inTarget = (x: number, y: number) => x >= xmin && x <= xmax && y >= ymin && y <= ymax;

let top = 0;

const RANGE = 200;

let hitCount = 0;
for (let fx = 0; fx < RANGE; fx++) {
  for (let fy = -RANGE; fy < RANGE; fy++) {
    let [x, y] = [0, 0];
    let [ffx, ffy] = [fx, fy];

    let hitTarget = false;
    let bestY = 0;

    while (!hitTarget && y >= ymin) {
      x += ffx;
      y += ffy;
      if (ffx > 0) {
        ffx -= 1;
      } else if (ffx < 0) {
        ffx += 1;
      }
      ffy -= 1;
      bestY = Math.max(bestY, y);
      if (!hitTarget) hitTarget = inTarget(x, y);
    }

    if (hitTarget) {
      top = Math.max(bestY, top);
      hitCount += 1;
    }
  }
}

console.log('p1', top);
console.log('p2', hitCount);

timer.stop();
