import { timer, getCharMatrixFromFile } from '../utilities.ts';

timer.start();

const conv: Record<string, string> = { X: 'A', Y: 'B', Z: 'C' };
const points: Record<string, number> = { X: 1, Y: 2, Z: 3, A: 1, B: 2, C: 3 };
const win: Record<string, string> = { X: 'C', Y: 'A', Z: 'B', A: 'C', B: 'A', C: 'B' };

const result: Record<string, number> = { X: 0, Y: 3, Z: 6 };
const lose: Record<string, string> = { C: 'A', A: 'B', B: 'C' };

const moves = getCharMatrixFromFile(2, ' ');

const p1 = moves.reduce((c, [other, me]) => {
  c += points[me];
  if (conv[me] === other) c += 3;
  if (win[me] === other) c += 6;
  return c;
}, 0);

const p2 = moves.reduce((c, [other, me]) => {
  c += result[me];
  if (me === 'X') c += points[win[other]];
  if (me === 'Y') c += points[other];
  if (me === 'Z') c += points[lose[other]];
  return c;
}, 0);

console.log('p1', p1);
console.log('p2', p2);

timer.stop();
