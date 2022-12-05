import { timer, getSplittedDataFromFile, sum, int10 } from '../utilities.ts';

timer.start();

const calories = getSplittedDataFromFile(1, '\n\n')
  .map(s => sum(s.split('\n').map(int10)))
  .sort();

console.log('p1', calories.slice(-1).pop());
console.log('p2', sum(calories.slice(-3)));

timer.stop();
