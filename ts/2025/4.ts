import { timer, Point, SetS, getPointSetFromMatrix } from '../utilities.ts';

timer.start();

const data = getPointSetFromMatrix(4, c => c === '@', '').grid;
const directions: Point[] = [
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
  { x: 1, y: 1 },
  { x: 1, y: -1 },
  { x: -1, y: 1 },
  { x: -1, y: -1 },
];

const sumPoints = (a: Point, b: Point) => ({ x: a.x + b.x, y: a.y + b.y });

const run = (data: SetS<Point>): SetS<Point> => {
  return [...data.values()].reduce<SetS<Point>>((reachable, point: Point) => {
    const count = directions.reduce((a, d) => a + +data.has(sumPoints(point, d)), 0);
    if (count < 4) {
      reachable.add(point);
    }
    return reachable;
  }, new SetS<Point>());
};

let totalRemoved = 0;
while (true) {
  const reachable = run(data);

  if (totalRemoved === 0) {
    console.log('p1', reachable.size);
  }

  if (reachable.size === 0) {
    console.log('p2', totalRemoved);
    break;
  }
  totalRemoved += reachable.size;
  for (const point of reachable.values()) {
    data.delete(point);
  }
}

timer.stop();
