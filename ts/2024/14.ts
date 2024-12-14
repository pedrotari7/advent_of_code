import { SetS } from '../utilities.ts';
import { mult } from '../utilities.ts';
import { timer, getSplittedDataFromFile } from '../utilities.ts';

timer.start();

const robots = getSplittedDataFromFile(14)
  .map(s => [...s.matchAll(/(-?\d+)/g)].map(m => +m[0]))
  .map(([px, py, vx, vy]) => ({ px, py, vx, vy }));

const [R, C] = [103, 101];
// const [R, C] = [7, 11];

const N = 100;
// const N = 5;

const print = () => {
  for (let r = 0; r < R; r++) {
    let row = '';
    for (let c = 0; c < C; c++) {
      let count = 0;
      for (const { px, py } of robots) {
        if (px === c && py === r) {
          count++;
        }
      }
      if (!count) {
        row += ' ';
      } else {
        row += count;
      }
    }
    console.log(row);
  }
  console.log();
};

const countQuadrants = () => {
  const quadrants = [0, 0, 0, 0];

  for (const { px, py } of robots) {
    if (px < C >> 1) {
      if (py < R >> 1) {
        quadrants[0] += 1;
      } else if (py > R >> 1) {
        quadrants[2] += 1;
      }
    } else if (px > C >> 1) {
      if (py < R >> 1) {
        quadrants[1] += 1;
      } else if (py > R >> 1) {
        quadrants[3] += 1;
      }
    }
  }

  console.log('p1', mult(quadrants));
};

const isTree = () => {
  const trees = new SetS<[number, number]>();
  for (const { px, py } of robots) {
    if (trees.has([px, py])) {
      return false;
    }
    trees.add([px, py]);
  }
  return true;
};

let n = 0;
while (1) {
  if (n == N) {
    countQuadrants();
  }
  for (let r = 0; r < robots.length; r++) {
    robots[r].px = (robots[r].px + robots[r].vx + C) % C;
    robots[r].py = (robots[r].py + robots[r].vy + R) % R;
  }
  n++;

  if (isTree()) {
    print();
    break;
  }
}

console.log('p2', n);

timer.stop();
