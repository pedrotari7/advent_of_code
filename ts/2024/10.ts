import { timer, inRange, getIntMatrixFromFile, sum, SetS, dirs_no_diag, addArrays } from '../utilities.ts';

timer.start();

const grid = getIntMatrixFromFile(10);

const trailheads = grid.reduce(
  (acc, row, y) => {
    row.forEach((e, x) => {
      if (e === 0) acc.push([y, x]);
    });
    return acc;
  },

  [] as number[][]
);

const getScore = (pos: number[]) => {
  const Q = [{ pos, visited: new SetS<number[]>() }];

  const trailends = [];

  while (Q.length > 0) {
    const { pos, visited } = Q.shift()!;

    const height = grid[pos[0]][pos[1]];

    if (height == 9) {
      trailends.push(pos);
      continue;
    }

    for (const dir of Object.values(dirs_no_diag)) {
      const newPos = addArrays(pos, dir);
      if (
        !visited.has(newPos) &&
        inRange(newPos[0], 0, grid.length - 1) &&
        inRange(newPos[1], 0, grid[0].length - 1) &&
        grid[newPos[0]][newPos[1]] === height + 1
      ) {
        Q.push({ pos: newPos, visited: new SetS(visited, true).add(newPos) });
      }
    }
  }

  return { score: new SetS(trailends).size, rating: trailends.length };
};

const data = trailheads.map(t => getScore(t));

console.log('p1', sum(data.map(d => d.score)));
console.log('p1', sum(data.map(d => d.rating)));

timer.stop();
