import { timer, getCharMatrixFromFile, fill } from '../utilities.ts';

timer.start();

const sea = getCharMatrixFromFile(25, '');

const R = sea.length;
const C = sea[0].length;

const move = (s: string[][]) => {
  const temp = fill(R, []).map(_ => fill(C, '.'));
  changed = false;

  const downs = [];

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (s[r][c] === '.') continue;
      if (s[r][c] === 'v') {
        downs.push([r, c]);
        continue;
      }
      const dir = [0, 1];

      const p = [(r + dir[0] + R) % R, (c + dir[1] + C) % C];

      if (s[p[0]][p[1]] === '.' && temp[p[0]][p[1]] === '.') {
        temp[p[0]][p[1]] = s[r][c];
        if (!changed) changed = true;
      } else {
        temp[r][c] = s[r][c];
      }
    }
  }

  for (const [r, c] of downs) {
    if (s[r][c] !== 'v') continue;
    const dir = [1, 0];

    const p = [(r + dir[0] + R) % R, (c + dir[1] + C) % C];

    if (s[p[0]][p[1]] !== 'v' && temp[p[0]][p[1]] === '.') {
      temp[p[0]][p[1]] = s[r][c];
      if (!changed) changed = true;
    } else {
      temp[r][c] = s[r][c];
    }
  }
  return temp;
};

let changed = true;
let count = 0;
let temp = sea;

while (changed) {
  temp = move(temp);
  count++;
}

console.log(count);

timer.stop();
