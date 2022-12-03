import { timer, getSplittedDataFromFile, intersect, sum, charCode } from '../utilities.ts';

timer.start();

const prio = (v: string) => (charCode(v) - charCode('a') + 59) % 58;

const data = sum(
  getSplittedDataFromFile(3).map((r) =>
    prio([...intersect([...r.substring(0, r.length / 2)], [...r.substring(r.length / 2)])].pop()!)
  )
);
console.log(data);

timer.stop();
