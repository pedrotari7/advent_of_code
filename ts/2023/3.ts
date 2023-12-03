import { timer, getSplittedDataFromFile, isDigit, dirs } from '../utilities.ts';

timer.start();

type Point = { x: number; y: number };
type Numbers = [number, Point[]][];
type Symbols = [string, Point][];
type Info = { numbers: Numbers; symbols: Symbols };

const { numbers, symbols } = getSplittedDataFromFile(3).reduce<Info>(
  (acc, line, y) => {
    let current: { n: string; coord: Point[] } = { n: '', coord: [] };
    const add = () => current.n !== '' && acc.numbers.push([Number(current.n), current.coord]);
    line.split('').forEach((v, x) => {
      if (isDigit(v)) {
        current.n += v;
        current.coord.push({ x, y });
        return;
      } else if (v !== '.') {
        acc.symbols.push([v, { x, y }]);
      }
      add();
      current = { n: '', coord: [] };
    });
    add();
    return acc;
  },
  { numbers: [], symbols: [] }
);

const getAround = (coord: Point) => Object.values(dirs).map(([dx, dy]) => ({ x: coord.x + dx, y: coord.y + dy }));

const p1 = numbers.reduce((acc, [n, coord]) => {
  const hasSymbol = coord.some(({ x, y }) =>
    getAround({ x, y }).some(({ x, y }) => symbols.some(([_, p]) => p.x === x && p.y === y))
  );
  return acc + (hasSymbol ? n : 0);
}, 0);

const gears = symbols.filter(([s]) => s === '*').map(([_, p]) => p);

const p2 = gears.reduce((acc, coord) => {
  const values = numbers.filter(([_, points]) =>
    points.some(p => getAround(p).some(({ x, y }) => coord.x === x && coord.y === y))
  );
  return acc + (values.length === 2 ? values[0][0] * values[1][0] : 0);
}, 0);

console.log('p1', p1);
console.log('p2', p2);

timer.stop();
