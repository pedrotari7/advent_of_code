import { timer, getCharMatrixFromFile, mult, addArrays, prod, int } from '../utilities.ts';

timer.start();

const dir: { [key: string]: [number, number] } = { forward: [1, 0], down: [0, 1], up: [0, -1] };

const data = mult(getCharMatrixFromFile(2, ' ').reduce((s, [d, c]) => addArrays(s, prod(dir[d], int(c))), [0, 0]));
console.log(data);

timer.stop();
