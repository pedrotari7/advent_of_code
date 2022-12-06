import { timer, getSplittedDataFromFile, hasNoRepeats } from '../utilities.ts';

timer.start();

const data = getSplittedDataFromFile(6, '');

let p1Found = false;
for (let i = 0; i < data.length; i++) {
  if (!p1Found && hasNoRepeats(data.slice(i, i + 4))) {
    console.log('p1', i + 4);
    p1Found = true;
  }

  if (hasNoRepeats(data.slice(i, i + 14))) {
    console.log('p2', i + 14);
    break;
  }
}

timer.stop();
