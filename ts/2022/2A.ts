import { timer, getCharMatrixFromFile } from '../utilities.ts';

timer.start();

const conv: Record<string, string> = { X: 'A', Y: 'B', Z: 'C' };
const points: Record<string, number> = { X: 1, Y: 2, Z: 3 };
const win: Record<string, string> = { X: 'C', Y: 'A', Z: 'B' };

const c = getCharMatrixFromFile(2, ' ').reduce((c, [other, me]) => {
  c += points[me];
  if (conv[me] === other) c += 3;
  if (win[me] === other) c += 6;
  return c;
}, 0);

console.log(c);

timer.stop();
