import { timer, getSplittedDataFromFile, int10 } from '../utilities.ts';

timer.start();

const data = getSplittedDataFromFile(7).map(e =>
  e
    .split(':')
    .map(e => e.split(' ').filter(Boolean).map(int10))
    .flat()
);

let p1 = 0;

const isPossible = (target: number, values: number[], allow = false): boolean => {
  if (values[0] > target) return false;
  return values.length === 1
    ? values[0] === target
    : isPossible(target, [values[0] + values[1], ...values.slice(2)], allow) ||
        isPossible(target, [values[0] * values[1], ...values.slice(2)], allow) ||
        (allow && isPossible(target, [int10(`${values[0]}${values[1]}`), ...values.slice(2)], allow));
};

const data2 = [];

for (const [target, ...values] of data) {
  if (isPossible(target, values)) {
    p1 += target;
  } else {
    data2.push([target, ...values]);
  }
}
console.log('p1', p1);

let p2 = 0;
for (const [target, ...values] of data2) {
  if (isPossible(target, values, true)) {
    p2 += target;
  }
}
console.log('p2', p1 + p2);

timer.stop();
