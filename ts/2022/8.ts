import { timer, getIntMatrixFromFile, range } from '../utilities.ts';

timer.start();

const trees = getIntMatrixFromFile(8).filter(r => r.length);

let p1 = 2 * trees.length + 2 * trees[0].length - 4;
let p2 = 0;

for (const y of range(1, trees.length - 1)) {
  for (const x of range(1, trees[0].length - 1)) {
    const cur = trees[y][x];
    let view = 1;
    let found = false;

    let visible = true;

    for (let i = x - 1; i >= 0; i--) {
      if (trees[y][i] >= cur) {
        view *= x - i;
        visible = false;
        break;
      }
    }
    if (visible) {
      if (!found) {
        p1++;
        found = true;
      }
      view *= x;
    }

    visible = true;

    for (let i = x + 1; i < trees[y].length; i++) {
      if (trees[y][i] >= cur) {
        view *= i - x;
        visible = false;
        break;
      }
    }
    if (visible) {
      if (!found) {
        p1++;
        found = true;
      }
      view *= trees[y].length - 1 - x;
    }

    visible = true;

    for (let j = y - 1; j >= 0; j--) {
      if (trees[j][x] >= cur) {
        view *= y - j;
        visible = false;
        break;
      }
    }
    if (visible) {
      if (!found) {
        p1++;
        found = true;
      }
      view *= y;
    }

    visible = true;

    for (let j = y + 1; j < trees.length; j++) {
      if (trees[j][x] >= cur) {
        view *= j - y;
        visible = false;
        break;
      }
    }
    if (visible) {
      if (!found) {
        p1++;
        found = true;
      }
      view *= trees.length - 1 - y;
    }

    p2 = Math.max(p2, view);
  }
}

console.log('p1', p1);
console.log('p2', p2);

timer.stop();
