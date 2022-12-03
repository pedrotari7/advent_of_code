import { timer, getSplittedDataFromFile, intersect, charCode } from '../utilities.ts';

timer.start();

const prio = (v: string) => (charCode(v) - charCode('a') + 59) % 58;

const data = getSplittedDataFromFile(3);

let c = 0;
for (let i = 0; i < data.length; i += 3) {
  c += prio([...intersect(...data.slice(i, i + 3).map((s) => [...s]))].pop()!);
}

console.log(c);
timer.stop();
