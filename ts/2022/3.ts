import { timer, getSplittedDataFromFile, intersect, sum, charCode } from '../utilities.ts';

timer.start();

const prio = (v: string) => (charCode(v) - charCode('a') + 59) % 58;

const data = getSplittedDataFromFile(3);

const p1 = sum(
  data.map(r => prio([...intersect([...r.substring(0, r.length / 2)], [...r.substring(r.length / 2)])].pop()!))
);

let p2 = 0;
for (let i = 0; i < data.length; i += 3) {
  p2 += prio([...intersect(...data.slice(i, i + 3).map(s => [...s]))].pop()!);
}

console.log('p1', p1);
console.log('p2', p2);

timer.stop();
