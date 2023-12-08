import { timer, getSplittedDataFromFile, lcm } from '../utilities.ts';

timer.start();

const data = getSplittedDataFromFile(8, '\n\n');

const directions = data[0].split('') as ('R' | 'L')[];

type Inst = { R: string; L: string };

const instructions = data[1]
  .split('\n')
  .map(row => [...(row.match(/[A-Z]{3}/g) ?? [])])
  .reduce((acc, [I, L, R]) => acc.set(I, { R, L }), new Map<string, Inst>());

let p1 = 0;
let current = 'AAA';

while (current !== 'ZZZ') {
  current = instructions.get(current)![directions[p1 % directions.length]];
  p1++;
}

const currents = [...instructions.keys()].filter(k => k.at(-1) === 'A');
const endings = [...instructions.keys()].filter(k => k.at(-1) === 'Z');

let count = 0;

const tally = new Map<string, number>();

while (tally.size < endings.length) {
  const instPos = count % directions.length;
  for (let i = 0; i < currents.length; i++) {
    if (currents[i].at(-1) === 'Z' && !tally.has(`${currents[i]}${instPos}`)) {
      tally.set(`${currents[i]}${instPos}`, count);
    }
    currents[i] = instructions.get(currents[i])![directions[instPos]];
  }
  count++;
}

console.log('p1', p1);
console.log('p2', [...tally.values()].reduce(lcm));

timer.stop();
