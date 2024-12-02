import { getSplittedDataFromFile, sum, str2num, timer } from '../utilities.ts';

timer.start();

const data = getSplittedDataFromFile(2);

const surfaceArea = ([l, w, h]: number[]) => 2 * l * w + 2 * w * h + 2 * h * l + Math.min(l * w, w * h, h * l);

console.log('p1', sum(data.map(p => surfaceArea(str2num(p.split('x'))))));

const ribbonLength = ([l, w, h]: number[]) => l * w * h + Math.min(2 * l + 2 * w, 2 * w + 2 * h, 2 * h + 2 * l);

console.log('p2', sum(data.map(p => ribbonLength(str2num(p.split('x'))))));

timer.stop();
