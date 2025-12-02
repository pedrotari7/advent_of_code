import { timer, getSplittedDataFromFile, sum, divisors } from '../utilities.ts';

timer.start();

const data = getSplittedDataFromFile(2, ',').map(l => l.split('-').map(Number));

const p1 = new Set<number>();
const p2 = new Set<number>();

for (const [a, b] of data) {
  for (let i = a; i <= b; i++) {
    const num = i.toString();

    if (num.slice(0, num.length / 2) === num.slice(num.length / 2)) {
      p1.add(i);
    }

    const lengths = divisors(num.length).slice(0, -1);

    for (const divisor of lengths) {
      const numbers: string[] = [];
      for (let j = 0; j < num.length; j += divisor) {
        numbers.push(num.slice(j, j + divisor));
      }

      if (numbers.every(n => n === numbers[0])) {
        p2.add(i);
        break;
      }
    }
  }
}

console.log('p1', sum(Array.from(p1)));
console.log('p2', sum(Array.from(p2)));

timer.stop();
