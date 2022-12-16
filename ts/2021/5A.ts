import { timer, getCharMatrixFromFile, int10, subArrays, equals, addArrays } from '../utilities.ts';

timer.start();

const data = getCharMatrixFromFile(5, ' -> ').map(d => d.map(c => c.split(',').map(int10)));

const inc = (c: number | undefined) => (c ? c + 1 : 1);

const count = data.reduce((count, [pos, end]) => {
  if (pos[0] !== end[0] && pos[1] !== end[1]) return count;

  const move = subArrays(end, pos).map(Math.sign);

  count[pos.toString()] = inc(count[pos.toString()]);

  while (!equals(pos, end)) {
    pos = addArrays(pos, move);

    const posStr = pos.toString();

    count[posStr] = inc(count[posStr]);
  }

  return count;
}, {} as Record<string, number>);

console.log(`count`, Object.values(count).filter(c => c >= 2).length);

timer.stop();
