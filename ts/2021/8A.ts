import { timer, getMatrixFromFile, sum } from '../utilities.ts';

timer.start();

const valid = (x: string) => [2, 3, 4, 7].includes(x.length);
const isValid = (m: string) => m.split(' ').filter(valid);

const data = sum(getMatrixFromFile(8, ' | ', isValid).map(x => x[1].length));

console.log(data);

timer.stop();
