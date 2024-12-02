import { timer, getIntMatrixFromFile } from '../utilities.ts';

timer.start();

const data = getIntMatrixFromFile(2, ' ');

const isSafe = (report: number[]) => {
  let asc = undefined;

  for (let i = 0; i < report.length - 1; i++) {
    const curr = report[i];
    const next = report[i + 1];

    if (asc === undefined) {
      asc = curr < next;
    } else if ((asc && curr >= next) || (!asc && curr <= next)) {
      return false;
    }
    const diff = Math.abs(curr - next);
    if (diff < 1 || diff > 3) {
      return false;
    }
  }
  return true;
};

const p1 = data.reduce((acc, report) => acc + +isSafe(report), 0);
console.log('p1', p1);

const p2 = data.reduce((acc, report) => {
  if (isSafe(report)) {
    return acc + 1;
  }

  for (let i = 0; i < report.length; i++) {
    const test = [...report];
    test.splice(i, 1);
    if (isSafe(test)) {
      return acc + 1;
    }
  }
  return acc;
}, 0);

console.log('p2', p2);

timer.stop();
