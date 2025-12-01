import { timer, getSplittedDataFromFile, int10 } from '../utilities.ts';

timer.start();

const data = getSplittedDataFromFile(1).map(line => ({ d: line[0], steps: int10(line.slice(1)) }));

const size = 100;

const run = (part: '1' | '2') => {
  let pos = 50;
  let p = 0;

  for (const { d, steps } of data) {
    if (d === 'R') {
      if (part === '2') {
        p += Math.floor((pos + steps) / size);
      }
      pos = (pos + steps) % size;
    } else if (d === 'L') {
      if (part === '2') {
        p += Math.floor((pos - 1) / size) - Math.floor((pos - steps - 1) / size);
      }
      pos = (((pos - steps) % size) + size) % size;
    }
    if (part === '1' && pos === 0) {
      p++;
    }
  }
  return p;
};

console.log('p1', run('1'));
console.log('p2', run('2'));
timer.stop();
