import { getSplittedDataFromFile, sum, charCount, timer } from '../utilities.ts';

timer.start();

const data = getSplittedDataFromFile(5, '\n');

const has3vowels = (str: string) => sum('aeiou'.split('').map(c => charCount(str, c))) > 2;

const noBadStrings = (str: string) => ['ab', 'cd', 'pq', 'xy'].every(s => !str.includes(s));

const noDoubles = (str: string) => str.split('').some((s, i, arr) => (i + 1 < arr.length ? s === arr[i + 1] : false));

const isNice = (s: string) => has3vowels(s) && noBadStrings(s) && noDoubles(s);

console.log('p2', sum(data.map(s => +isNice(s))));

const oneGap = (str: string) => str.split('').some((s, i, arr) => (i + 2 < arr.length ? s === arr[i + 2] : false));

const repeats = (str: string) =>
  str
    .split('')
    .some((s, i, arr) =>
      i + 3 < arr.length ? str.lastIndexOf(s + arr[i + 1]) - str.indexOf(s + arr[i + 1]) > 1 : false
    );

const isNice2 = (s: string) => oneGap(s) && repeats(s);

console.log('p2', sum(data.map(s => +isNice2(s))));

timer.stop();
