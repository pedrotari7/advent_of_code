import { timer, getCharMatrixFromFile, max, range, Point, MapS } from '../utilities.ts';

timer.start();

let xMax = 0;
let yMax = 0;
const { start, tiles } = getCharMatrixFromFile(10, '').reduce<{ start: Point; tiles: MapS<Point, string> }>(
  (a, row, y) => {
    row.forEach((c, x) => {
      if (c !== '.') a.tiles.set({ x, y }, c);
      if (c === 'S') a.start = { x, y };
    });
    xMax = max([xMax, row.length - 1]);
    yMax = max([yMax, y]);
    return a;
  },
  { start: { x: 0, y: 0 }, tiles: new MapS() }
);

const visited = new MapS<Point, number>([[start, 0]]);

const queue: [Point, number][] = [];
if ('-J'.includes(tiles.get({ x: start.x + 1, y: start.y })!)) queue.push([{ x: start.x + 1, y: start.y }, 1]);
if ('-L'.includes(tiles.get({ x: start.x - 1, y: start.y })!)) queue.push([{ x: start.x - 1, y: start.y }, 1]);
if ('|7F'.includes(tiles.get({ x: start.x, y: start.y - 1 })!)) queue.push([{ x: start.x, y: start.y - 1 }, 1]);
if ('|JL'.includes(tiles.get({ x: start.x, y: start.y + 1 })!)) queue.push([{ x: start.x, y: start.y + 1 }, 1]);

while (queue.length) {
  const [{ x, y }, steps] = queue.shift()!;

  if (visited.has({ x, y })) continue;

  const tile = tiles.get({ x, y });

  if (tile === undefined) continue;

  visited.set({ x, y }, steps);

  if (tile === '|') {
    queue.push([{ x, y: y + 1 }, steps + 1], [{ x, y: y - 1 }, steps + 1]);
  } else if (tile === '-') {
    queue.push([{ x: x + 1, y }, steps + 1], [{ x: x - 1, y }, steps + 1]);
  } else if (tile === '7') {
    queue.push([{ x: x - 1, y }, steps + 1], [{ x, y: y + 1 }, steps + 1]);
  } else if (tile === 'L') {
    queue.push([{ x: x + 1, y }, steps + 1], [{ x, y: y - 1 }, steps + 1]);
  } else if (tile === 'J') {
    queue.push([{ x: x - 1, y }, steps + 1], [{ x, y: y - 1 }, steps + 1]);
  } else if (tile === 'F') {
    queue.push([{ x: x + 1, y }, steps + 1], [{ x, y: y + 1 }, steps + 1]);
  }
}

let p2 = 0;
for (const y of range(0, yMax + 1)) {
  let is_inside = false;
  for (const x of range(1, xMax + 1)) {
    const p = { x, y };
    const c = tiles.get(p)!;
    if (visited.has(p) && '|7F'.includes(c)) {
      is_inside = !is_inside;
    }
    if (!visited.has(p) && is_inside) {
      p2++;
    }
  }
}

console.log('p1', max([...visited.values()]));
console.log('p2', p2 + 1);

timer.stop();
