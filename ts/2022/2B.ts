import { timer, getCharMatrixFromFile } from '../utilities.ts';

timer.start();

const result: Record<string, number> = { X: 0, Y: 3, Z: 6 };
const points: Record<string, number> = { A: 1, B: 2, C: 3 };
const win: Record<string, string> = { A: 'C', B: 'A', C: 'B' };
const lose: Record<string, string> = { C: 'A', A: 'B', B: 'C' };

const c = getCharMatrixFromFile(2, ' ').reduce((c, [other, me]) => {
  c += result[me];
  if (me === 'X') c += points[win[other]];
  if (me === 'Y') c += points[other];
  if (me === 'Z') c += points[lose[other]];
  return c;
}, 0);

console.log('c', c);
timer.stop();
