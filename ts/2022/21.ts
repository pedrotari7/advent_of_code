import { timer, getSplittedDataFromFile, isArray, int10 } from '../utilities.ts';

timer.start();

type OP = Record<string, string[] | number>;
const data = getSplittedDataFromFile(21)
  .map(v => v.split(':'))
  .reduce<OP>((m, v) => ({ ...m, [v[0]]: v.slice(1).flatMap(v => v.trim().split(' ')) }), {});

const solve = (k: string): number => {
  const cur = data[k];
  if (!isArray(cur)) return cur;

  if (cur.length === 1) {
    data[k] = int10(cur[0]);
    return data[k] as number;
  }

  const [left, op, right] = cur;

  return eval(`(${solve(left)}) ${op} (${solve(right)})`);
};

const p1 = solve('root');
console.log('p1', p1);

let max = 1000000000000000000000;
let min = 0;

const [left, _, right] = data['root'] as string[];

const rResult = solve(right);

while (true) {
  const i = Math.floor((max + min) / 2);

  (data['humn'] as number) = i;

  const lResult = solve(left);

  if (lResult === rResult) {
    console.log('p2', i);
    break;
  }
  if (lResult > rResult) {
    min = i + 1;
  }
  if (lResult < rResult) {
    max = i + 1;
  }

  if (min >= max) break;
}

timer.stop();
