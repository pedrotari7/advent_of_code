import { timer, getCharMatrixFromFile, charCode, isString, inRange, DIR_NO_DIAG } from '../utilities.ts';

timer.start();

const area = getCharMatrixFromFile(12, '');

const { start, goal } = area.reduce<{ start: number[]; goal: number[] }>(
  (info, row, i) => {
    for (const [x, c] of row.entries()) {
      if (c === 'S') {
        info.start = [i, x];
      } else if (c === 'E') {
        info.goal = [i, x];
      }
    }
    return info;
  },
  { start: [], goal: [] }
);

area[start[0]][start[1]] = 'a';
area[goal[0]][goal[1]] = 'z';

const find = (start: number[], goal: number[] | string, up = true) => {
  const visited = new Set([String(start)]);

  const stack = [{ pos: [...start], steps: 0 }];

  while (stack.length) {
    const { pos, steps } = stack.shift()!;
    const [cy, cx] = pos;

    if ((isString(goal) && area[cy][cx] === goal) || (cy === goal[0] && cx === goal[1])) {
      return steps;
    }

    for (const [y, x] of DIR_NO_DIAG.map(([i, j]) => [i + cy, j + cx])) {
      if (!visited.has(String([y, x])) && inRange(y, 0, area.length - 1) && inRange(x, 0, area[y].length - 1)) {
        const h = charCode(area[y][x]) - charCode(area[cy][cx]);
        if ((up ? h : -h) < 2) {
          visited.add(String([y, x]));
          stack.push({ pos: [y, x], steps: steps + 1 });
        }
      }
    }
  }
};

console.log('p1', find(start, goal));
console.log('p2', find(goal, 'a', false));

timer.stop();
