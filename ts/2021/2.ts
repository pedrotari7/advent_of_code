import { timer, getCharMatrixFromFile, mult, addArrays, prod, int } from '../utilities.ts';

timer.start();

const dir: { [key: string]: [number, number] } = { forward: [1, 0], down: [0, 1], up: [0, -1] };

const p1 = mult(getCharMatrixFromFile(2, ' ').reduce((s, [d, c]) => addArrays(s, prod(dir[d], int(c))), [0, 0]));
console.log('p1', p1);

const dir2 = (s: number[], d: string, c: string) =>
  ({
    forward: addArrays(s, [int(c), int(c) * s[2], 0]),
    down: addArrays(s, prod([0, 0, 1], int(c))),
    up: addArrays(s, prod([0, 0, -1], int(c))),
  }[d]!);

const data2 = getCharMatrixFromFile(2, ' ').reduce((s, [d, c]) => dir2(s, d, c), [0, 0, 0]);

console.log('p2', data2[0] * data2[1]);

timer.stop();
