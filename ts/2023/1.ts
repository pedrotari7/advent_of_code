import { timer, getSplittedDataFromFile, int10 } from '../utilities.ts';

timer.start();

const data = getSplittedDataFromFile(1);

const numbers: Record<string, string> = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

const parse = (digits: RegExpMatchArray | string[] | null | undefined) => {
  const first = digits?.at(0) ?? '';
  const last = digits?.at(-1) ?? '';

  return int10((first in numbers ? numbers[first] : first) + (last in numbers ? numbers[last] : last));
};

const p1 = data.reduce((acc, v) => acc + parse(v.match(/(\d)/g)), 0);

const p2 = data.reduce(
  (acc, v) => acc + parse([...v.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g)].map(v => v[1])),
  0
);

console.log('p1', p1);
console.log('p2', p2);

timer.stop();
