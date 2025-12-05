import { timer, getSplittedDataFromFile, Intervals } from '../utilities.ts';

timer.start();

const data = getSplittedDataFromFile(5, '\n\n');

const ranges = new Intervals(data[0].split('\n').map(x => x.split('-').map(Number))).merge();
const ids = data[1].split('\n').map(Number);

const p1 = ids.filter(id => ranges.includes(id)).length;

console.log('p1', p1);
console.log('p2', ranges.size);

timer.stop();
