import { timer, getCharMatrixFromFile, SetS, inRange, equals, sum } from '../utilities.ts';

timer.start();

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const data = getCharMatrixFromFile(12, '');

const getPerimeter = (region: SetS<number[]>) =>
  [...region.values()].reduce(
    (acc, [y, x]) =>
      acc + directions.map(([dy, dx]) => [dy + y, dx + x]).filter(([ny, nx]) => !region.has([ny, nx])).length,
    0
  );

const corners = ([y, x]: [number, number]): [number, number][] => [
  [y - 0.5, x - 0.5],
  [y + 0.5, x - 0.5],
  [y + 0.5, x + 0.5],
  [y - 0.5, x + 0.5],
];

const getSides = (region: SetS<number[]>) => {
  const possibleCorners = new SetS<[number, number]>();

  for (const [y, x] of region.values()) {
    for (const corner of corners([y, x])) {
      possibleCorners.add(corner);
    }
  }

  let sides = 0;

  for (const corner of possibleCorners.values()) {
    const setup = corners(corner).map(block => region.has(block));
    const count = sum(setup.map(b => +b));

    if (count === 1 || count === 3) {
      sides += 1;
    } else if (count === 2) {
      if (equals(setup, [true, false, true, false]) || equals(setup, [false, true, false, true])) {
        sides += 2;
      }
    }
  }

  return sides;
};

let p1 = 0;
let p2 = 0;

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] !== '.') {
      const region = new SetS<number[]>([[i, j]]);
      const type = data[i][j];
      const Q = [[i, j]];

      data[i][j] = '.';

      while (Q.length > 0) {
        const [y, x] = Q.shift()!;

        for (const [ny, nx] of directions.map(([dy, dx]) => [dy + y, dx + x])) {
          if (
            inRange(ny, 0, data.length - 1) &&
            inRange(nx, 0, data[ny].length - 1) &&
            data[ny][nx] === type &&
            !region.has([ny, nx])
          ) {
            region.add([ny, nx]);
            data[ny][nx] = '.';
            Q.push([ny, nx]);
          }
        }
      }

      p1 += region.size * getPerimeter(region);
      p2 += region.size * getSides(region);
    }
  }
}

console.log('p1', p1);
console.log('p2', p2);

timer.stop();
