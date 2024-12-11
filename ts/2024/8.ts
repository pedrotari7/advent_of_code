import { timer, Point, getCharMatrixFromFile, inRange, SetS } from '../utilities.ts';

timer.start();

let limits = { xmax: 0, ymax: 0 };

const grid = getCharMatrixFromFile(8, '').reduce((grid, row, y) => {
  row.forEach((antenna, x) => {
    if (antenna === '.') return;
    if (!grid.get(antenna)) grid.set(antenna, []);
    grid.get(antenna)!.push({ x, y });
  });

  limits = { xmax: row.length - 1, ymax: y };
  return grid;
}, new Map<string, Point[]>());

const inBounds = (p: Point) => inRange(p.x, 0, limits.xmax) && inRange(p.y, 0, limits.ymax);

const getAntinodes = (a: Point, b: Point, harmonics: boolean): Point[] => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;

  let antiA = { x: a.x + dx, y: a.y + dy };
  let antiB = { x: b.x - dx, y: b.y - dy };

  const antinodes = [antiA, antiB].filter(inBounds);

  if (harmonics) {
    antiA = { x: a.x, y: a.y };
    antiB = { x: b.x, y: b.y };

    while (inBounds(antiA)) {
      antinodes.push(antiA);
      antiA = { x: antiA.x + dx, y: antiA.y + dy };
    }
    while (inBounds(antiB)) {
      antinodes.push(antiB);
      antiB = { x: antiB.x - dx, y: antiB.y - dy };
    }
  }
  return antinodes;
};

const getLocations = (harmonics = false): SetS<Point> =>
  [...grid.values()].reduce((acc, antennas) => {
    for (let i = 0; i < antennas.length; i++) {
      for (let j = i + 1; j < antennas.length; j++) {
        getAntinodes(antennas[j], antennas[i], harmonics).forEach(p => acc.add(p));
      }
    }
    return acc;
  }, new SetS<Point>());

const p1 = getLocations().size;

const p2 = getLocations(true).size;

console.log('p1', p1);
console.log('p2', p2);

timer.stop();
