import { timer, getDataFromFile, sum, mult, int10 } from '../utilities.ts';

timer.start();

const data = getDataFromFile(3);

const ops = [...data.matchAll(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g)].flat();

const getMul = (m: string) => (m.startsWith('mul') ? mult(m.match(/\d+/g)!.map(int10)) : 0);

console.log('p1', sum(ops.map(getMul)));

console.log(
  'p2',
  ops.reduce(
    ({ mul, active }, op) => ({
      mul: mul + (active ? getMul(op) : 0),
      active: op.startsWith('do') ? op === 'do()' : active,
    }),
    {
      mul: 0,
      active: true,
    }
  ).mul
);

timer.stop();
