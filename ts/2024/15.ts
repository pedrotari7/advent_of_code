import { SetS } from '../utilities.ts';
import { timer, getSplittedDataFromFile, addArrays, equals } from '../utilities.ts';

timer.start();

type Point = [number, number];

const directions: Record<string, Point> = { '^': [-1, 0], v: [1, 0], '<': [0, -1], '>': [0, 1] };

const [grid, movesArray] = getSplittedDataFromFile(15, '\n\n').map(s => s.split('\n').map(s => s.split('')));

const run = (grid: string[][]) => {
  const R = grid.length;
  const C = grid[0].length;

  let robot: Point = [-1, -1];

  for (let j = 0; j < R; j++) {
    for (let i = 0; i < C; i++) {
      if (grid[j][i] === '@') {
        robot = [j, i];
      }
    }
  }

  const change = (pos: Point, next: Point): void => {
    grid[next[0]][next[1]] = grid[pos[0]][pos[1]];
    grid[pos[0]][pos[1]] = '.';
  };

  const canMove = (pos: Point, dir: Point, pieces: SetS<Point>): boolean => {
    const [ny, nx] = addArrays(pos, dir);

    pieces.add(pos);

    const isVertical = equals(dir, directions['^']) || equals(dir, directions['v']);
    const isBox = grid[ny][nx] === '[' || grid[ny][nx] === ']';

    if (grid[ny][nx] === '#') return false;
    if (grid[ny][nx] === 'O' || (!isVertical && isBox)) return canMove([ny, nx], dir, pieces);

    if (isBox) {
      const side = grid[ny][nx] === '[' ? 1 : -1;
      return canMove([ny, nx + side], dir, pieces) && canMove([ny, nx], dir, pieces);
    }
    return true;
  };

  const sort = (a: Point, b: Point, dir: string) => {
    const idx = dir === '^' || dir === 'v' ? 0 : 1;
    return dir === '^' || dir === '<' ? a[idx] - b[idx] : b[idx] - a[idx];
  };

  for (const dir of movesArray.flat()) {
    const d = directions[dir];

    const pieces = new SetS<Point>();
    if (canMove(robot, d, pieces)) {
      robot = addArrays(robot, d);
      for (const piece of [...pieces.values()].toSorted((a, b) => sort(a, b, dir))) {
        change(piece, addArrays(piece, d));
      }
    }
  }

  let res = 0;

  for (let j = 0; j < R; j++) {
    for (let i = 0; i < C; i++) {
      if (grid[j][i] === '[' || grid[j][i] === 'O') {
        res += 100 * j + i;
      }
    }
  }
  return res;
};

const m: Record<string, string[]> = { O: ['[', ']'], '#': ['#', '#'], '@': ['@', '.'], '.': ['.', '.'] };

const doubleGrid = grid.map(row => row.flatMap(c => m[c]));

console.log('p1', run(grid));
console.log('p2', run(doubleGrid));

timer.stop();
