import { getDataFromFile, charCount, timer } from '../utilities.ts';

timer.start();

const data = getDataFromFile(1);

console.log('p1', charCount(data, '(') - charCount(data, ')'));

let currentFloor = 0;
let i = 0;

while (currentFloor >= 0) {
  currentFloor += data[i] === '(' ? 1 : -1;
  i += 1;
}

console.log('p2', i);

timer.stop();
