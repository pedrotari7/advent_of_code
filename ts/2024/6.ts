import { timer, getPointSetFromMatrix, inRange, Point, SetS } from '../utilities.ts';

timer.start();

const { grid, extra: start } = getPointSetFromMatrix(
  6,
  e => e === '#',
  '',
  e => e === '^'
);

const positions = [...grid.values()];

const xmin = Math.min(...positions.map(p => p.x));
const xmax = Math.max(...positions.map(p => p.x));
const ymin = Math.min(...positions.map(p => p.y));
const ymax = Math.max(...positions.map(p => p.y));

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const startPos = { x: start.at(0)!.x, y: start.at(0)!.y };

const move = (pos: Point, dir: number) => ({ x: pos.x + dirs[dir][1], y: pos.y + dirs[dir][0] });

const run = (grid: SetS<Point>) => {
  let dir = 0;
  let pos = { ...startPos };
  const seen = new SetS<number[]>();

  while (inRange(pos.x, xmin, xmax) && inRange(pos.y, ymin, ymax)) {
    if (seen.has([pos.x, pos.y, dir])) {
      return { seen, valid: true };
    }

    seen.add([pos.x, pos.y, dir]);

    let next = move(pos, dir);

    while (grid.has(next)) {
      dir = (dir + 1) % 4;
      next = move(pos, dir);
    }
    pos = next;
  }

  return { seen, valid: false };
};

const p1 = new SetS(
  [...run(grid).seen.values()].map(([x, y]) => [x, y]).filter(([x, y]) => x !== startPos.x || y !== startPos.y)
);
console.log('p1', p1.size + 1);

let p2 = 0;

for (const [x, y] of p1.values()) {
  grid.add({ x, y });
  p2 += +run(grid).valid;
  grid.delete({ x, y });
}

console.log('p2', p2);

timer.stop();
