import { timer, manhattan, range, Point, getPointArrayFromMatrix } from '../utilities.ts';

timer.start();

const galaxies = getPointArrayFromMatrix(11, c => c === '#', '');

const expand = (gs: Point[], n: number) => {
  let [ymax, xmax] = [Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];

  const final = gs.reduce((acc, g, i) => {
    ymax = Math.max(ymax, g.y);
    xmax = Math.max(xmax, g.x);

    return acc.set(i, g);
  }, new Map<number, Point>());

  for (const y of range(0, ymax + 1).filter(i => !gs.some(g => g.y === i))) {
    for (let i = 0; i < gs.length; i++) {
      const g = final.get(i)!;
      final.set(i, { x: g.x, y: g.y + (gs[i].y > y ? n - 1 : 0) });
    }
  }

  for (const x of range(0, xmax + 1).filter(i => !gs.some(g => g.x === i))) {
    for (let i = 0; i < gs.length; i++) {
      const g = final.get(i)!;
      final.set(i, { x: g.x + (gs[i].x > x ? n - 1 : 0), y: g.y });
    }
  }

  return [...final.values()];
};

const distances = (gs: Point[]) => {
  let d = 0;
  for (let a = 0; a < gs.length - 1; a++) {
    for (let b = a + 1; b < gs.length; b++) {
      d += manhattan(gs[a].x, gs[a].y, gs[b].x, gs[b].y);
    }
  }

  return d;
};

console.log('p1', distances(expand(galaxies, 2)));
console.log('p2', distances(expand(galaxies, 1000000)));

timer.stop();
