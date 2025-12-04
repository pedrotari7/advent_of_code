import { timer, getIntMatrixFromFile, int10 } from '../utilities.ts';

timer.start();

const banks = getIntMatrixFromFile(3);

const run = (n: number) => {
  let result = 0;
  for (const bank of banks) {
    const nums: number[] = [];
    let start = 0;
    for (let i = 0; i < n; i++) {
      let maxIdx = start;
      let maxVal = bank[start];

      for (let j = start + 1; j <= bank.length - (n - i); j++) {
        if (bank[j] > maxVal) {
          maxVal = bank[j];
          maxIdx = j;
        }
      }
      nums.push(maxVal);
      start = maxIdx + 1;
    }

    result += int10(nums.join(''));
  }

  return result;
};

console.log('p1', run(2));
console.log('p2', run(12));

timer.stop();
